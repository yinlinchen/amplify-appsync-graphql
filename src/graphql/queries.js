/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const fuzzySearch = /* GraphQL */ `
  query FuzzySearch($keyword: String!, $limit: Int, $nextToken: String) {
    fuzzySearch(keyword: $keyword, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      total
    }
  }
`;
export const unionSearch = /* GraphQL */ `
  query UnionSearch($query: String!) {
    unionSearch(query: $query) {
      items {
        ... on Collection {
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
        ... on Item {
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
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }
      nextToken
      total
    }
  }
`;
export const searchObjects = /* GraphQL */ `
  query SearchObjects(
    $sort: SearchableObjectSortInput
    $filter: SearchableObjectFilterInput
    $keyword: String!
    $limit: Int
    $nextToken: String
  ) {
    searchObjects(
      sort: $sort
      filter: $filter
      keyword: $keyword
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        identifier
        date
        description
        title
        visibility
        parent_collection
        ... on Collection {
          collection_category
          items {
            nextToken
          }
          createdAt
          updatedAt
        }
        ... on Item {
          item_category
          collection {
            collection_category
            date
            description
            id
            identifier
            parent_collection
            title
            visibility
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }
      nextToken
      total
    }
  }
`;
export const andorSearch = /* GraphQL */ `
  query AndorSearch($category: String!, $limit: Int, $nextToken: String) {
    andorSearch(category: $category, limit: $limit, nextToken: $nextToken) {
      items {
        id
        identifier
        date
        description
        title
        visibility
        parent_collection
        ... on Collection {
          collection_category
          items {
            nextToken
          }
          createdAt
          updatedAt
        }
        ... on Item {
          item_category
          collection {
            collection_category
            date
            description
            id
            identifier
            parent_collection
            title
            visibility
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }
      nextToken
      total
    }
  }
`;
export const fulltextCollections = /* GraphQL */ `
  query FulltextCollections(
    $allFields: String!
    $limit: Int
    $nextToken: String
  ) {
    fulltextCollections(
      allFields: $allFields
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      total
    }
  }
`;
export const getCollection = /* GraphQL */ `
  query GetCollection($id: ID!) {
    getCollection(id: $id) {
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
export const listCollections = /* GraphQL */ `
  query ListCollections(
    $filter: ModelCollectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCollections(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getItem = /* GraphQL */ `
  query GetItem($id: ID!) {
    getItem(id: $id) {
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
export const listItems = /* GraphQL */ `
  query ListItems(
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const collectionByIdentifier = /* GraphQL */ `
  query CollectionByIdentifier(
    $identifier: String
    $sortDirection: ModelSortDirection
    $filter: ModelCollectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    collectionByIdentifier(
      identifier: $identifier
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const itemByIdentifier = /* GraphQL */ `
  query ItemByIdentifier(
    $identifier: String
    $sortDirection: ModelSortDirection
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    itemByIdentifier(
      identifier: $identifier
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchCollections = /* GraphQL */ `
  query SearchCollections(
    $filter: SearchableCollectionFilterInput
    $sort: SearchableCollectionSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchCollections(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
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
      nextToken
      total
    }
  }
`;
export const searchItems = /* GraphQL */ `
  query SearchItems(
    $filter: SearchableItemFilterInput
    $sort: SearchableItemSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchItems(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
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
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
