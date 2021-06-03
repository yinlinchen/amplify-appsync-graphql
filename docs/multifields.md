## Search result from multiple fields
To support querying multiple record fields in a single query.

### Update schema.graphql

* Update `Query` type
    ```
    type Query {
        fulltextCollections(
        allFields: String!
        limit: Int
        nextToken: String
        ): SearchableCollectionConnection
    }
    ```
* Add custom fuzzy query type
    ```
    type SearchableCollectionConnection {
        items: [Collection]
        nextToken: String
        total: Int
    } 
    ```

### Create custom resolver template for multiple fields query

* Query.fulltextCollections.req.vtl
```
#set( $indexPath = "/collection/doc/_search" )
{
    "version": "2018-05-29",
    "operation": "GET",
    "path": "$indexPath",
    "params": {
        "body": {
        	"query": {
                   "multi_match" : {
                        "query" : $util.toJson($ctx.args.allFields),
                        "fields": ["title", "description", "identifier"]
                    }
            }
        }
    }
}
```

* 
```
#set( $es_items = [] )
#foreach( $entry in $context.result.hits.hits )
  #if( !$foreach.hasNext )
    #set( $nextToken = $entry.sort.get(0) )
  #end
  $util.qr($es_items.add($entry.get("_source")))
#end
$util.toJson({
  "items": $es_items,
  "total": $ctx.result.hits.total,
  "nextToken": $nextToken
})
```

### Add new resolvers resource in custom stack
```
 "QueryFulltextCollectionsResolver": {
    "Type": "AWS::AppSync::Resolver",
    "Properties": {
    "ApiId": {
        "Ref": "AppSyncApiId"
    },
    "DataSourceName": "ElasticSearchDomain",
    "TypeName": "Query",
    "FieldName": "fulltextCollections",
    "RequestMappingTemplateS3Location": {
        "Fn::Sub": [
        "s3://${S3DeploymentBucket}/${S3DeploymentRootKey}/resolvers/Query.fulltextCollections.req.vtl",
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
        "s3://${S3DeploymentBucket}/${S3DeploymentRootKey}/resolvers/Query.fulltextCollections.res.vtl",
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
