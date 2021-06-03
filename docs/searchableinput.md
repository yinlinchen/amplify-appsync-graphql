## Custom Searchable Input
When you enable `@searchable`, there are `SearchableYourModelFilterInput`, `SearchableYourModelSortInput` and other Inputs are automatically generated inside your GraphQL schema. These are invisible in your Amplify code base, but you can see these in the AWS AppSync console -> Your API -> Schema. Below are two examples.

```
input SearchableItemFilterInput {
	id: SearchableIDFilterInput
	identifier: SearchableStringFilterInput
	item_category: SearchableStringFilterInput
	date: SearchableStringFilterInput
	description: SearchableStringFilterInput
	parent_collection: SearchableStringFilterInput
	title: SearchableStringFilterInput
	visibility: SearchableBooleanFilterInput
	and: [SearchableItemFilterInput]
	or: [SearchableItemFilterInput]
	not: SearchableItemFilterInput
}
```

```
input SearchableCollectionSortInput {
	field: SearchableCollectionSortableFields
	direction: SearchableSortDirection
}
```

You can modify a copy of these `Inputs` and make a new one for your custom model by following the same workflow.

### Update schema.graphql

```
input SearchableObjectFilterInput {
  id: SearchableIDFilterInput
  title: SearchableStringFilterInput
  identifier: SearchableStringFilterInput
  description: SearchableStringFilterInput
  date: SearchableStringFilterInput
  visibility: SearchableBooleanFilterInput
  parent_collection: SearchableStringFilterInput
  and: [SearchableObjectFilterInput]
  or: [SearchableObjectFilterInput]
  not: SearchableObjectFilterInput
}

input SearchableObjectSortInput {
  field: SearchableObjectSortableFields
  direction: SearchableSortDirection
}

enum SearchableObjectSortableFields {
  id
  title
  identifier
  description
  date
}

input SearchableIDFilterInput {
	ne: ID
	gt: ID
	lt: ID
	gte: ID
	lte: ID
	eq: ID
	match: ID
	matchPhrase: ID
	matchPhrasePrefix: ID
	multiMatch: ID
	exists: Boolean
	wildcard: ID
	regexp: ID
	range: [ID]
}

input SearchableStringFilterInput {
	ne: String
	gt: String
	lt: String
	gte: String
	lte: String
	eq: String
	match: String
	matchPhrase: String
	matchPhrasePrefix: String
	multiMatch: String
	exists: Boolean
	wildcard: String
	regexp: String
	range: [String]
}

input SearchableBooleanFilterInput {
	eq: Boolean
	ne: Boolean
}

enum SearchableSortDirection {
	asc
	desc
}

```

Once you have these new `Inputs`, you can add them into your `Query` type. `SearchableObjectSortInput` for sort and `SearchableObjectFilterInput` for filter.

```
searchObjects(
    sort: SearchableObjectSortInput
    filter: SearchableObjectFilterInput
    keyword: String!
    limit: Int
    nextToken: String
  ): SearchableObjectConnection
```

### Update custom resolver template for interface type query

You can check the automatically generated mapping template in the AppSync to get below code and make changes. 

* Query.searchObjects.req.vtl

```
#set( $nonKeywordFields = ["visibility"] )
#if( $util.isNullOrEmpty($context.args.sort) )
  #set( $sortDirection = "desc" )
  #set( $sortField = "id" )
#else
  #set( $sortDirection = $util.defaultIfNull($context.args.sort.direction, "desc") )
  #set( $sortField = $util.defaultIfNull($context.args.sort.field, "id") )
#end
#if( $nonKeywordFields.contains($sortField) )
  #set( $sortField0 = $util.toJson($sortField) )
#else
  #set( $sortField0 = $util.toJson("${sortField}.keyword") )
#end
```

* Query.searchObjects.res.vtl

See [Query.searchObjects.res.vtl](https://github.com/yinlinchen/amplify-appsync-graphql/blob/master/amplify/backend/api/amplifyappsync/resolvers/Query.searchObjects.res.vtl)

### Add new resolvers resource in custom stack

See [CustomResources.json](https://github.com/yinlinchen/amplify-appsync-graphql/blob/master/amplify/backend/api/amplifyappsync/stacks/CustomResources.json#L141)