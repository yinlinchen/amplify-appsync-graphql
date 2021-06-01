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

    