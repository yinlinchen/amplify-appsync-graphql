## And / Or operations

* The Utility helper $util.transform.toElasticSearchQueryDSL defaults by AND operation.
* The OR operation can be achieved by using the `should` clause and `minimum_should_match` parameter.

The `bool` query allows you to combine any number of queries into a single query by specifying a query clause that indicates which parts `must`, `should`, or `must_not` match the data in your Elasticsearch index:

* If you specify that part of a `bool` query `must` match, only results matching that query (or queries) are returned.
* Specifying that a part of a query `should` match means that a specified number of the clauses must match for a document to be returned.
* If no `must` clauses are specified, at least one `should` clause has to match for the document to be returned.
* Finally, the `must_not` clause causes matching documents to be excluded from the result set.

`must`: To combine multiple clauses, use a binary and (query1 AND query2 AND query3).
`must_not`: Combines multiple clauses with a binary not.
`should`: Combines multiple clauses with a binary or (query 1 OR query2 OR query3). `minimum_should_match` parameter number of them should match (defaults to 1 if must is not present and 0 if must is present);


### Update schema.graphql

* Update `Query` type
    ```
    type Query {
        andorSearch(
            category: String!
            limit: Int
            nextToken: String
        ): AndOrSearchObjectConnection
    }
    ```

* Add custom type - SearchableObject
    ```
    type AndOrSearchObjectConnection {
        items: [Object]
        nextToken: String
        total: Int
    }
    ```

### Create custom resolver template for AndOrSearch query

* Query.andorSearch.req.vtl
    ```
    #set( $indexPath = "/*/doc/_search" )
    {
    "version": "2018-05-29",
    "operation":"GET",
    "path":"$indexPath",
    "params": {
            "body": {
                #if( $context.args.nextToken ) "search_after": [$util.toJson($context.args.nextToken)], #end
                "size": #if( $context.args.limit ) $context.args.limit #else 10 #end,
                "query": {
                    "bool": {
                        "should": [
                            {
                                "bool": {
                                    "must": {
                                        "match": {
                                            "collection_category": "$context.arguments.category"
                                        }
                                    },
                                    "must_not": {
                                        "exists": {
                                            "field": "parent_collection"
                                        }
                                    }
                                }
                            },
                            {
                                "bool": {
                                    "must": {
                                        "match": {
                                            "item_category": "$context.arguments.category"
                                        }
                                    }
                                }
                            }
                        ],
                        "minimum_should_match": 1
                    }
                }
            }
        }
    }
    ```

* Query.andorSearch.res.vtl
    ```
    #set( $es_items = [] )
    #foreach( $entry in $context.result.hits.hits )
    #if( !$foreach.hasNext )
        #set( $nextToken = $entry.sort.get(0) )
    #end
    #foreach ( $mapEntry in $entry.entrySet() )
        #if( $mapEntry.key == "_source" )
        #if( $mapEntry.value.get("collection_category") )
            $util.qr( $mapEntry.value.put("__typename", "Collection") )
        #else
            $util.qr( $mapEntry.value.put("__typename", "Item") )
        #end
        #end
    #end
    $util.qr( $es_items.add($entry.get("_source")) )
    #end

    $util.toJson({
    "items": $es_items,
    "total": $ctx.result.hits.total,
    "nextToken": $nextToken
    })
    ```

### Add new resolvers resource in custom stack
    ```
    "QueryAndorSearchResolver": {
        "Type": "AWS::AppSync::Resolver",
        "Properties": {
            "ApiId": {
            "Ref": "AppSyncApiId"
            },
            "DataSourceName": "ElasticSearchDomain",
            "TypeName": "Query",
            "FieldName": "andorSearch",
            "RequestMappingTemplateS3Location": {
            "Fn::Sub": [
                "s3://${S3DeploymentBucket}/${S3DeploymentRootKey}/resolvers/Query.andorSearch.req.vtl",
                {
                "S3DeploymentBucket": {
                    "Ref": "S3DeploymentBucket"
                },
                "S3DeploymentRootKey": {
                    "Ref": "S3DeploymentRootKey"
                }
                }
            ]
            },
            "ResponseMappingTemplateS3Location": {
            "Fn::Sub": [
                "s3://${S3DeploymentBucket}/${S3DeploymentRootKey}/resolvers/Query.andorSearch.res.vtl",
                {
                "S3DeploymentBucket": {
                    "Ref": "S3DeploymentBucket"
                },
                "S3DeploymentRootKey": {
                    "Ref": "S3DeploymentRootKey"
                }
                }
            ]
            }
        }
        }
    ```