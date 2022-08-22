## Unions

The GraphQL type system also supports Unions. Unions are identical to interfaces, except that they don’t define a common set of fields. Unions are generally preferred over interfaces when the possible types do not share a logical hierarchy. 

Thus we can use [Interface](https://github.com/yinlinchen/amplify-appsync-graphql/blob/master/docs/interfacetype.md) or Union type

```
union UnionSearchResult = Collection | Item
```

### Update schema.graphql

* Add a new `Union` type

```
union UnionSearchResult = Collection | Item
```

* Update `Query` type

```
type Query {
    unionSearch(
        query: String!
    ): UnionSearchResultConnection
}
```

* Add custom type - UnionSearchResultConnection

```
type UnionSearchResultConnection {
	items: [UnionSearchResult]
	nextToken: String
	total: Int
}
```

### Create custom resolver template for Union type query

* Query.searchObjects.req.vtl

```
#set( $indexPath = "/*/doc/_search" )
{
    "version": "2018-05-29",
    "operation": "GET",
    "path": "$indexPath.toLowerCase()",
    "params": {
        "body": {
        	"query": {
                "match" : {
                    "title" : {
                        "query" : $util.toJson($ctx.args.query)
                    }
                }
            }
        }
    }
}
```

* Query.searchObjects.res.vtl

```
#set( $items = [] )
#foreach( $entry in $context.result.hits.hits )
  #if( !$foreach.hasNext )
    #set( $nextToken = "$entry.sort.get(0)" )
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
"QueryUnionSearchResolver": {
    "Type": "AWS::AppSync::Resolver",
    "Properties": {
    "ApiId": {
        "Ref": "AppSyncApiId"
    },
    "DataSourceName": "ElasticSearchDomain",
    "TypeName": "Query",
    "FieldName": "unionSearch",
    "RequestMappingTemplateS3Location": {
        "Fn::Sub": [
        "s3://${S3DeploymentBucket}/${S3DeploymentRootKey}/resolvers/Query.unionSearch.req.vtl",
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
        "s3://${S3DeploymentBucket}/${S3DeploymentRootKey}/resolvers/Query.unionSearch.res.vtl",
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

* Query example
```
query DemoQuery {
  searchObjects(keyword: "Ms1994") {
    items {
      id
      title
      date
    }
  }
}
```