## Create an Amplify React application
* Create a new React application
    ```
	create-react-app amplify-appsync-graphql
	```
	Or use npx (npm 5.2 & later)
	```
	npx create-react-app amplify-appsync-graphql
	```

* Push codes to your GitHub (Optional)
	```
	cd amplify-appsync-graphql
	git remote add origin git@github.com:<github username>/amplify-appsync-graphql.git
	git add .
	git commit -m "Initial commit"
	git push origin master
	```

* Initializing Amplify project
    ```
	amplify init
	```
    ```
    ? Enter a name for the project amplifyappsync
    The following configuration will be applied:

    Project information
    | Name: amplifyappsync
    | Environment: dev
    | Default editor: Visual Studio Code
    | App type: javascript
    | Javascript framework: react
    | Source Directory Path: src
    | Distribution Directory Path: build
    | Build Command: npm run-script build
    | Start Command: npm run-script start

    ? Initialize the project with the above configuration? (Y/n) 
    ```

## AWS AppSync and GraphQL
* Adding a GraphQL API
	```
	amplify add api
    ```
    ```
    ? Please select from one of the below mentioned services: GraphQL
    ? Provide API name: amplifyappsync
    ? Choose the default authorization type for the API API key
    ? Enter a description for the API key: appsync examples
    ? After how many days from now the API key should expire (1-365): 365
    ? Do you want to configure advanced settings for the GraphQL API No, I am done.
    ? Do you have an annotated GraphQL schema? No
    ? Choose a schema template: One-to-many relationship (e.g., “Blogs” with “Posts” and “Comments”)

    The following types do not have '@auth' enabled. Consider using @auth with @model
        - Blog
        - Post
        - Comment
    Learn more about @auth here: https://docs.amplify.aws/cli/graphql-transformer/auth


    GraphQL schema compiled successfully.

    Edit your schema at /Users/ylchen/Projects/amplify-appsync-graphql/amplify/backend/api/amplifyappsync/schema.graphql or place .graphql files in a directory at /Users/ylchen/Projects/amplify-appsync-graphql/amplify/backend/api/amplifyappsync/schema
    ? Do you want to edit the schema now? Yes
    ? Choose your default editor: Visual Studio Code
    ```

    ```
    amplify status
    ```
    ```
    Current Environment: dev

    | Category | Resource name  | Operation | Provider plugin   |
    | -------- | -------------- | --------- | ----------------- |
    | Api      | amplifyappsync | Create    | awscloudformation |
    ```

    ```
    amplify push
    ```

    ```
    Current Environment: dev

    | Category | Resource name  | Operation | Provider plugin   |
    | -------- | -------------- | --------- | ----------------- |
    | Api      | amplifyappsync | Create    | awscloudformation |
    ? Are you sure you want to continue? Yes

    The following types do not have '@auth' enabled. Consider using @auth with @model
        - Collection
        - Item

    ? Do you want to generate code for your newly created GraphQL API Yes
    ? Choose the code generation language target javascript
    ? Enter the file name pattern of graphql queries, mutations and subscriptions src/graphql/**/*.js
    ? Do you want to generate/update all possible GraphQL operations - queries, mutations and subscriptions Yes
    ? Enter maximum statement depth [increase from default if your schema is deeply nested] 2
    ```

## Demo dataset
* Add records into to DynamoDB table
    * [Collection table](collection.json)
    * [Item table](item.json)

## Perform query in the AppSync console
* Open AppSync Console
	```
	amplify console api

	Please select from one of the below mentioned services GraphQL
	```
* Queries
```
query DemoQuery {
  listItems {
    items {
      id
      description
      title
      item_category
    }
  }
  getCollection(id: "0ec03786-1452-4b70-9541-b7fc0c103d67") {
    id
    identifier
    title
  }
  collectionByIdentifier(identifier: "Ms1995_007_Piomelli") {
    items {
      title
      identifier
    }
  }
}
```