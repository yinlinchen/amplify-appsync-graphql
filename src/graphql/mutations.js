/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCollection = /* GraphQL */ `
  mutation CreateCollection(
    $input: CreateCollectionInput!
    $condition: ModelCollectionConditionInput
  ) {
    createCollection(input: $input, condition: $condition) {
      collection_category
      date
      description
      id
      identifier
      parent_collection
      title
      visibility
      items {
        items {
          id
          identifier
          item_category
          date
          description
          parent_collection
          title
          visibility
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateCollection = /* GraphQL */ `
  mutation UpdateCollection(
    $input: UpdateCollectionInput!
    $condition: ModelCollectionConditionInput
  ) {
    updateCollection(input: $input, condition: $condition) {
      collection_category
      date
      description
      id
      identifier
      parent_collection
      title
      visibility
      items {
        items {
          id
          identifier
          item_category
          date
          description
          parent_collection
          title
          visibility
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteCollection = /* GraphQL */ `
  mutation DeleteCollection(
    $input: DeleteCollectionInput!
    $condition: ModelCollectionConditionInput
  ) {
    deleteCollection(input: $input, condition: $condition) {
      collection_category
      date
      description
      id
      identifier
      parent_collection
      title
      visibility
      items {
        items {
          id
          identifier
          item_category
          date
          description
          parent_collection
          title
          visibility
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createItem = /* GraphQL */ `
  mutation CreateItem(
    $input: CreateItemInput!
    $condition: ModelItemConditionInput
  ) {
    createItem(input: $input, condition: $condition) {
      id
      identifier
      item_category
      date
      description
      parent_collection
      title
      visibility
      collection {
        collection_category
        date
        description
        id
        identifier
        parent_collection
        title
        visibility
        items {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateItem = /* GraphQL */ `
  mutation UpdateItem(
    $input: UpdateItemInput!
    $condition: ModelItemConditionInput
  ) {
    updateItem(input: $input, condition: $condition) {
      id
      identifier
      item_category
      date
      description
      parent_collection
      title
      visibility
      collection {
        collection_category
        date
        description
        id
        identifier
        parent_collection
        title
        visibility
        items {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteItem = /* GraphQL */ `
  mutation DeleteItem(
    $input: DeleteItemInput!
    $condition: ModelItemConditionInput
  ) {
    deleteItem(input: $input, condition: $condition) {
      id
      identifier
      item_category
      date
      description
      parent_collection
      title
      visibility
      collection {
        collection_category
        date
        description
        id
        identifier
        parent_collection
        title
        visibility
        items {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
