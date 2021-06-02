## Enable Fuzzy Query

### Update schema.graphql

* Update `Query` type
    ```
    type Query {
        fuzzySearch(
            keyword: String!
            limit: Int
            nextToken: String
        ): FuzzyObjectConnection
    }
    ```
* Add custom fuzzy query type
    ```
    type FuzzyObjectConnection {
    items: [Collection]
    nextToken: String
    total: Int
    } 
    ```
### Create custom resolver template for fuzzy query

* Query.fuzzySearch.req.vtl 
    ```
    #set( $indexPath = "/collection/doc/_search" )
    {
        "version": "2017-02-28",
        "operation": "GET",
        "path": "$indexPath.toLowerCase()",
        "params": {
            "body": {
                "query": {
                    "match" : {
                        "title" : {
                            "query" : $util.toJson($ctx.args.keyword),
                            "fuzziness": "AUTO"
                        }
                    }
                }
            }
        }
    } 
    ```

* Query.fuzzySearch.res.vtl
    ```
    #set( $items = [] )
    #foreach( $entry in $context.result.hits.hits )
        #if( !$foreach.hasNext )
            #set( $nextToken = "$entry.sort.get(0)" )
        #end
        $util.qr($items.add($entry.get("_source")))
    #end
    $util.toJson({
        "items": $items,
        "total": $ctx.result.hits.total,
        "nextToken": $nextToken
    }) 
    ```

### Add new resolvers resource in custom stack
    ```
    "QueryFuzzySearchResolver": {
        "Type": "AWS::AppSync::Resolver",
        "Properties": {
            "ApiId": {
                "Ref": "AppSyncApiId"
            },
            "DataSourceName": "ElasticSearchDomain",
            "TypeName": "Query",
            "FieldName": "fuzzySearch",
            "RequestMappingTemplateS3Location": {
                "Fn::Sub": [
                    "s3://${S3DeploymentBucket}/${S3DeploymentRootKey}/resolvers/Query.fuzzySearch.req.vtl",
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
                    "s3://${S3DeploymentBucket}/${S3DeploymentRootKey}/resolvers/Query.fuzzySearch.res.vtl",
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