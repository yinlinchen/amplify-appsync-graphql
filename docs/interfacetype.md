## Interface type usage
The GraphQL type system supports Interfaces. An interface exposes a certain set of fields that a type must include to implement the interface. 

### Update schema.graphql

* Add a new `Interface` type
    ```
    interface Object {
    id: ID!
    identifier: String!
    date: String
    description: String
    title: String!
    visibility: Boolean!
    parent_collection: [String!]
    }
    ```
* Update other types that implement the interface
    ```
    type Collection implements Object
    type Item implements Object
    ```

* Update `Query` type
    ```
    type Query {
        searchObjects(
            keyword: String!
            limit: Int
            nextToken: String
        ): SearchableObjectConnection
    }
    ```

* Add custom type - SearchableObject
    ```
    type SearchableObjectConnection {
    items: [Object]
    nextToken: String
    total: Int
    }
    ```

### Create custom resolver template for interface type query

* Query.searchObjects.req.vtl
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

* Query.searchObjects.res.vtl
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
    "QuerySearchObjectResolver": {
        "Type": "AWS::AppSync::Resolver",
        "Properties": {
        "ApiId": {
            "Ref": "AppSyncApiId"
        },
        "DataSourceName": "ElasticSearchDomain",
        "TypeName": "Query",
        "FieldName": "searchObjects",
        "RequestMappingTemplateS3Location": {
            "Fn::Sub": [
            "s3://${S3DeploymentBucket}/${S3DeploymentRootKey}/resolvers/Query.searchObjects.req.vtl",
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
            "s3://${S3DeploymentBucket}/${S3DeploymentRootKey}/resolvers/Query.searchObjects.res.vtl",
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