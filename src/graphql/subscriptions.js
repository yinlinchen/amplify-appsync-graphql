/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCollection = /* GraphQL */ `
  subscription OnCreateCollection {
    onCreateCollection {
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
export const onUpdateCollection = /* GraphQL */ `
  subscription OnUpdateCollection {
    onUpdateCollection {
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
export const onDeleteCollection = /* GraphQL */ `
  subscription OnDeleteCollection {
    onDeleteCollection {
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
export const onCreateItem = /* GraphQL */ `
  subscription OnCreateItem {
    onCreateItem {
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
export const onUpdateItem = /* GraphQL */ `
  subscription OnUpdateItem {
    onUpdateItem {
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
export const onDeleteItem = /* GraphQL */ `
  subscription OnDeleteItem {
    onDeleteItem {
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
