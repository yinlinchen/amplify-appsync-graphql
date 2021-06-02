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
* [Basic models](docs/basic.md)

## Docs
* [Resolver Mapping Template Reference](https://docs.aws.amazon.com/appsync/latest/devguide/resolver-mapping-template-reference.html)