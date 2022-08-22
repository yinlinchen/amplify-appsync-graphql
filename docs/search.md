## Streams data from DynamoDB to Elasticsearch and exposes search capabilities.

Use `@searchable`, the `@searchable` directive handles streaming the data of an `@model` object type to Amazon Elasticsearch Service and configures search resolvers that search that information.

* Add `@searchable` to the `@model`
```
type Collection 
  @model
  @searchable
  @key(
    name: "Identifier"
    fields: ["identifier"]
    queryField: "collectionByIdentifier"
  ) {
  collection_category: String!
  date: String
  description: String
  id: ID!
  identifier: String!
  parent_collection: [String!]
  title: String!
  visibility: Boolean!
  items: [Item] @connection(name: "CollectionItems")
}

type Item 
  @model
  @searchable
  @key(name: "Identifier", fields: ["identifier"], queryField: "itemByIdentifier") {
  id: ID!
  identifier: String!
  item_category: String!
  date: String
  description: String
  parent_collection: [String!]
  title: String!
  visibility: Boolean!
  collection: Collection @connection(name: "CollectionItems")
}
```
* Amplify push

```
Current Environment: dev

| Category | Resource name  | Operation | Provider plugin   |
| -------- | -------------- | --------- | ----------------- |
| Api      | amplifyappsync | Update    | awscloudformation |
? Are you sure you want to continue? Yes

The following types do not have '@auth' enabled. Consider using @auth with @model
	 - Collection
	 - Item
Learn more about @auth here: https://docs.amplify.aws/cli/graphql-transformer/auth

GraphQL schema compiled successfully.

Edit your schema at /Projects/amplify-appsync-graphql/amplify/backend/api/amplifyappsync/schema.graphql or place .graphql files in a directory at /Projects/amplify-appsync-graphql/amplify/backend/api/amplifyappsync/schema
? Do you want to update code for your updated GraphQL API Yes
? Do you want to generate GraphQL statements (queries, mutations and subscription) based on your schema types?
This will overwrite your current graphql queries, mutations and subscriptions Yes
```
* Search records
There is a search`<Type>` in the Quey tyep. E.g. `searchItems`.

* Query example
```
query DemoQuery {
  searchItems(filter: {item_category: { match: "demo"}}) {
    items {
      identifier
      item_category
      title
    }
  }
}
```