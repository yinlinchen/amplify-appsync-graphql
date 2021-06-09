# Amplify Appsync GraphQL

## Prerequisite
* Install [Create React App](https://github.com/facebook/create-react-app#creating-an-app) CLI
	```
	npm install -g create-react-app
	```
* Install the AWS Amplify CLI
	```
	npm install -g @aws-amplify/cli
	```

## Custom resolvers workflow

* Step1: Add custom type to the schema
    * Add custom `Query`, `Mutation` or `Subscription` type to your schema.

* Step2: Create custom resolver template
    * Request and response template should be located in `<project-root>/amplify/backend/api/<api-name>/resolvers` folder.
    * Graphql Transformer follows `<TypeName>.<FieldName>.<req/res>.vlt` as convention to name the resolvers.
        * Request template: `Query.myCustomQuery.req.vtl`
        * Response template: `Query.myCustomQuery.res.vtl`

* Step3: Add resolvers resource by creating a custom stack
    *  By default, there is a file called `CustomResources.json` in `<project-root>/amplify/backend/api/<api-name>/stacks` directory of your API.
    * Example: [CustomResource.json](examples/CustomResource.json)

## Examples
1. [Basic models](docs/basic.md)
2. [Enable basic search](docs/search.md)
3. [Fuzzy search](docs/fuzzysearch.md)
4. [Query for Interface type](docs/interfacetype.md)
5. [Search with AND/OR operations](docs/andoroperation.md)
6. [Multi-fields search](docs/multifields.md) 
7. [Custom searchable input](docs/searchableinput.md)
7. [Query for Union type](docs/uniontype.md)
8. [geolocation search capabilities](https://docs.amplify.aws/cli/graphql-transformer/resolvers#add-a-custom-geolocation-search-resolver-that-targets-an-elasticsearch-domain-created-by-searchable)

## Launching the example app
[![amplifybutton](https://oneclick.amplifyapp.com/button.svg)](https://console.aws.amazon.com/amplify/home#/deploy?repo=https://github.com/yinlinchen/amplify-appsync-graphql)

## Docs
* [Resolver Mapping Template Reference](https://docs.aws.amazon.com/appsync/latest/devguide/resolver-mapping-template-reference.html)