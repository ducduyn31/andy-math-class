import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigFloat: any;
  BigInt: any;
  Cursor: any;
  Date: any;
  Datetime: any;
  JSON: any;
  Opaque: any;
  Time: any;
  UUID: any;
};

/** Boolean expression comparing fields on type "BigFloat" */
export type BigFloatFilter = {
  eq?: InputMaybe<Scalars['BigFloat']>;
  gt?: InputMaybe<Scalars['BigFloat']>;
  gte?: InputMaybe<Scalars['BigFloat']>;
  in?: InputMaybe<Array<Scalars['BigFloat']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['BigFloat']>;
  lte?: InputMaybe<Scalars['BigFloat']>;
  neq?: InputMaybe<Scalars['BigFloat']>;
};

/** Boolean expression comparing fields on type "BigInt" */
export type BigIntFilter = {
  eq?: InputMaybe<Scalars['BigInt']>;
  gt?: InputMaybe<Scalars['BigInt']>;
  gte?: InputMaybe<Scalars['BigInt']>;
  in?: InputMaybe<Array<Scalars['BigInt']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['BigInt']>;
  lte?: InputMaybe<Scalars['BigInt']>;
  neq?: InputMaybe<Scalars['BigInt']>;
};

/** Boolean expression comparing fields on type "Boolean" */
export type BooleanFilter = {
  eq?: InputMaybe<Scalars['Boolean']>;
  is?: InputMaybe<FilterIs>;
};

/** Boolean expression comparing fields on type "Date" */
export type DateFilter = {
  eq?: InputMaybe<Scalars['Date']>;
  gt?: InputMaybe<Scalars['Date']>;
  gte?: InputMaybe<Scalars['Date']>;
  in?: InputMaybe<Array<Scalars['Date']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Date']>;
  lte?: InputMaybe<Scalars['Date']>;
  neq?: InputMaybe<Scalars['Date']>;
};

/** Boolean expression comparing fields on type "Datetime" */
export type DatetimeFilter = {
  eq?: InputMaybe<Scalars['Datetime']>;
  gt?: InputMaybe<Scalars['Datetime']>;
  gte?: InputMaybe<Scalars['Datetime']>;
  in?: InputMaybe<Array<Scalars['Datetime']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Datetime']>;
  lte?: InputMaybe<Scalars['Datetime']>;
  neq?: InputMaybe<Scalars['Datetime']>;
};

export enum FilterIs {
  NotNull = 'NOT_NULL',
  Null = 'NULL'
}

/** Boolean expression comparing fields on type "Float" */
export type FloatFilter = {
  eq?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  neq?: InputMaybe<Scalars['Float']>;
};

/** Boolean expression comparing fields on type "ID" */
export type IdFilter = {
  eq?: InputMaybe<Scalars['ID']>;
};

/** Boolean expression comparing fields on type "Int" */
export type IntFilter = {
  eq?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  neq?: InputMaybe<Scalars['Int']>;
};

/** The root type for creating and mutating data */
export type Mutation = {
  __typename?: 'Mutation';
  /** Deletes zero or more records from the `answer` collection */
  deleteFromanswerCollection: AnswerDeleteResponse;
  /** Deletes zero or more records from the `books` collection */
  deleteFrombooksCollection: BooksDeleteResponse;
  /** Deletes zero or more records from the `chapters` collection */
  deleteFromchaptersCollection: ChaptersDeleteResponse;
  /** Deletes zero or more records from the `questions` collection */
  deleteFromquestionsCollection: QuestionsDeleteResponse;
  /** Deletes zero or more records from the `user_books_assignation` collection */
  deleteFromuser_books_assignationCollection: User_Books_AssignationDeleteResponse;
  /** Adds one or more `answer` records to the collection */
  insertIntoanswerCollection?: Maybe<AnswerInsertResponse>;
  /** Adds one or more `books` records to the collection */
  insertIntobooksCollection?: Maybe<BooksInsertResponse>;
  /** Adds one or more `chapters` records to the collection */
  insertIntochaptersCollection?: Maybe<ChaptersInsertResponse>;
  /** Adds one or more `questions` records to the collection */
  insertIntoquestionsCollection?: Maybe<QuestionsInsertResponse>;
  /** Adds one or more `user_books_assignation` records to the collection */
  insertIntouser_books_assignationCollection?: Maybe<User_Books_AssignationInsertResponse>;
  /** Updates zero or more records in the `answer` collection */
  updateanswerCollection: AnswerUpdateResponse;
  /** Updates zero or more records in the `books` collection */
  updatebooksCollection: BooksUpdateResponse;
  /** Updates zero or more records in the `chapters` collection */
  updatechaptersCollection: ChaptersUpdateResponse;
  /** Updates zero or more records in the `questions` collection */
  updatequestionsCollection: QuestionsUpdateResponse;
  /** Updates zero or more records in the `user_books_assignation` collection */
  updateuser_books_assignationCollection: User_Books_AssignationUpdateResponse;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromanswerCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<AnswerFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFrombooksCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<BooksFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromchaptersCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<ChaptersFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromquestionsCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<QuestionsFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromuser_Books_AssignationCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<User_Books_AssignationFilter>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoanswerCollectionArgs = {
  objects: Array<AnswerInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntobooksCollectionArgs = {
  objects: Array<BooksInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntochaptersCollectionArgs = {
  objects: Array<ChaptersInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoquestionsCollectionArgs = {
  objects: Array<QuestionsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntouser_Books_AssignationCollectionArgs = {
  objects: Array<User_Books_AssignationInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationUpdateanswerCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<AnswerFilter>;
  set: AnswerUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatebooksCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<BooksFilter>;
  set: BooksUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatechaptersCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<ChaptersFilter>;
  set: ChaptersUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatequestionsCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<QuestionsFilter>;
  set: QuestionsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateuser_Books_AssignationCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<User_Books_AssignationFilter>;
  set: User_Books_AssignationUpdateInput;
};

export type Node = {
  /** Retrieves a record by `ID` */
  nodeId: Scalars['ID'];
};

/** Boolean expression comparing fields on type "Opaque" */
export type OpaqueFilter = {
  eq?: InputMaybe<Scalars['Opaque']>;
  is?: InputMaybe<FilterIs>;
};

/** Defines a per-field sorting order */
export enum OrderByDirection {
  /** Ascending order, nulls first */
  AscNullsFirst = 'AscNullsFirst',
  /** Ascending order, nulls last */
  AscNullsLast = 'AscNullsLast',
  /** Descending order, nulls first */
  DescNullsFirst = 'DescNullsFirst',
  /** Descending order, nulls last */
  DescNullsLast = 'DescNullsLast'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

/** The root type for querying data */
export type Query = {
  __typename?: 'Query';
  /** A pagable collection of type `answer` */
  answerCollection?: Maybe<AnswerConnection>;
  /** A pagable collection of type `books` */
  booksCollection?: Maybe<BooksConnection>;
  /** A pagable collection of type `chapters` */
  chaptersCollection?: Maybe<ChaptersConnection>;
  /** Retrieve a record by its `ID` */
  node?: Maybe<Node>;
  /** A pagable collection of type `questions` */
  questionsCollection?: Maybe<QuestionsConnection>;
  /** A pagable collection of type `user_books_assignation` */
  user_books_assignationCollection?: Maybe<User_Books_AssignationConnection>;
};


/** The root type for querying data */
export type QueryAnswerCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<AnswerFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<AnswerOrderBy>>;
};


/** The root type for querying data */
export type QueryBooksCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<BooksFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<BooksOrderBy>>;
};


/** The root type for querying data */
export type QueryChaptersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<ChaptersFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ChaptersOrderBy>>;
};


/** The root type for querying data */
export type QueryNodeArgs = {
  nodeId: Scalars['ID'];
};


/** The root type for querying data */
export type QueryQuestionsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<QuestionsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<QuestionsOrderBy>>;
};


/** The root type for querying data */
export type QueryUser_Books_AssignationCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<User_Books_AssignationFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<User_Books_AssignationOrderBy>>;
};

/** Boolean expression comparing fields on type "String" */
export type StringFilter = {
  eq?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  ilike?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  is?: InputMaybe<FilterIs>;
  like?: InputMaybe<Scalars['String']>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  neq?: InputMaybe<Scalars['String']>;
  startsWith?: InputMaybe<Scalars['String']>;
};

/** Boolean expression comparing fields on type "Time" */
export type TimeFilter = {
  eq?: InputMaybe<Scalars['Time']>;
  gt?: InputMaybe<Scalars['Time']>;
  gte?: InputMaybe<Scalars['Time']>;
  in?: InputMaybe<Array<Scalars['Time']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Time']>;
  lte?: InputMaybe<Scalars['Time']>;
  neq?: InputMaybe<Scalars['Time']>;
};

/** Boolean expression comparing fields on type "UUID" */
export type UuidFilter = {
  eq?: InputMaybe<Scalars['UUID']>;
  in?: InputMaybe<Array<Scalars['UUID']>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Scalars['UUID']>;
};

export type Answer = Node & {
  __typename?: 'answer';
  created_at?: Maybe<Scalars['Datetime']>;
  id: Scalars['UUID'];
  name?: Maybe<Scalars['String']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID'];
  question?: Maybe<Scalars['UUID']>;
  questions?: Maybe<Questions>;
};

export type AnswerConnection = {
  __typename?: 'answerConnection';
  edges: Array<AnswerEdge>;
  pageInfo: PageInfo;
};

export type AnswerDeleteResponse = {
  __typename?: 'answerDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Answer>;
};

export type AnswerEdge = {
  __typename?: 'answerEdge';
  cursor: Scalars['String'];
  node: Answer;
};

export type AnswerFilter = {
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  question?: InputMaybe<UuidFilter>;
};

export type AnswerInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  name?: InputMaybe<Scalars['String']>;
  question?: InputMaybe<Scalars['UUID']>;
};

export type AnswerInsertResponse = {
  __typename?: 'answerInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Answer>;
};

export type AnswerOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  question?: InputMaybe<OrderByDirection>;
};

export type AnswerUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  name?: InputMaybe<Scalars['String']>;
  question?: InputMaybe<Scalars['UUID']>;
};

export type AnswerUpdateResponse = {
  __typename?: 'answerUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Answer>;
};

export type Books = Node & {
  __typename?: 'books';
  chaptersCollection?: Maybe<ChaptersConnection>;
  color?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['Datetime']>;
  id: Scalars['UUID'];
  name?: Maybe<Scalars['String']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID'];
  questionsCollection?: Maybe<QuestionsConnection>;
  user_books_assignationCollection?: Maybe<User_Books_AssignationConnection>;
};


export type BooksChaptersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<ChaptersFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ChaptersOrderBy>>;
};


export type BooksQuestionsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<QuestionsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<QuestionsOrderBy>>;
};


export type BooksUser_Books_AssignationCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<User_Books_AssignationFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<User_Books_AssignationOrderBy>>;
};

export type BooksConnection = {
  __typename?: 'booksConnection';
  edges: Array<BooksEdge>;
  pageInfo: PageInfo;
};

export type BooksDeleteResponse = {
  __typename?: 'booksDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Books>;
};

export type BooksEdge = {
  __typename?: 'booksEdge';
  cursor: Scalars['String'];
  node: Books;
};

export type BooksFilter = {
  color?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
};

export type BooksInsertInput = {
  color?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  name?: InputMaybe<Scalars['String']>;
};

export type BooksInsertResponse = {
  __typename?: 'booksInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Books>;
};

export type BooksOrderBy = {
  color?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
};

export type BooksUpdateInput = {
  color?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  name?: InputMaybe<Scalars['String']>;
};

export type BooksUpdateResponse = {
  __typename?: 'booksUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Books>;
};

export type Chapters = Node & {
  __typename?: 'chapters';
  book?: Maybe<Scalars['UUID']>;
  books?: Maybe<Books>;
  chapters?: Maybe<Chapters>;
  chaptersCollection?: Maybe<ChaptersConnection>;
  created_at?: Maybe<Scalars['Datetime']>;
  id: Scalars['UUID'];
  name?: Maybe<Scalars['String']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID'];
  parent?: Maybe<Scalars['UUID']>;
  questionsCollection?: Maybe<QuestionsConnection>;
};


export type ChaptersChaptersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<ChaptersFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ChaptersOrderBy>>;
};


export type ChaptersQuestionsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<QuestionsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<QuestionsOrderBy>>;
};

export type ChaptersConnection = {
  __typename?: 'chaptersConnection';
  edges: Array<ChaptersEdge>;
  pageInfo: PageInfo;
};

export type ChaptersDeleteResponse = {
  __typename?: 'chaptersDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Chapters>;
};

export type ChaptersEdge = {
  __typename?: 'chaptersEdge';
  cursor: Scalars['String'];
  node: Chapters;
};

export type ChaptersFilter = {
  book?: InputMaybe<UuidFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  parent?: InputMaybe<UuidFilter>;
};

export type ChaptersInsertInput = {
  book?: InputMaybe<Scalars['UUID']>;
  created_at?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  name?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<Scalars['UUID']>;
};

export type ChaptersInsertResponse = {
  __typename?: 'chaptersInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Chapters>;
};

export type ChaptersOrderBy = {
  book?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  parent?: InputMaybe<OrderByDirection>;
};

export type ChaptersUpdateInput = {
  book?: InputMaybe<Scalars['UUID']>;
  created_at?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  name?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<Scalars['UUID']>;
};

export type ChaptersUpdateResponse = {
  __typename?: 'chaptersUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Chapters>;
};

export type Questions = Node & {
  __typename?: 'questions';
  answerCollection?: Maybe<AnswerConnection>;
  book?: Maybe<Scalars['UUID']>;
  books?: Maybe<Books>;
  chapter?: Maybe<Scalars['UUID']>;
  chapters?: Maybe<Chapters>;
  created_at?: Maybe<Scalars['Datetime']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  name?: Maybe<Scalars['String']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID'];
};


export type QuestionsAnswerCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<AnswerFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<AnswerOrderBy>>;
};

export type QuestionsConnection = {
  __typename?: 'questionsConnection';
  edges: Array<QuestionsEdge>;
  pageInfo: PageInfo;
};

export type QuestionsDeleteResponse = {
  __typename?: 'questionsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Questions>;
};

export type QuestionsEdge = {
  __typename?: 'questionsEdge';
  cursor: Scalars['String'];
  node: Questions;
};

export type QuestionsFilter = {
  book?: InputMaybe<UuidFilter>;
  chapter?: InputMaybe<UuidFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
};

export type QuestionsInsertInput = {
  book?: InputMaybe<Scalars['UUID']>;
  chapter?: InputMaybe<Scalars['UUID']>;
  created_at?: InputMaybe<Scalars['Datetime']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  name?: InputMaybe<Scalars['String']>;
};

export type QuestionsInsertResponse = {
  __typename?: 'questionsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Questions>;
};

export type QuestionsOrderBy = {
  book?: InputMaybe<OrderByDirection>;
  chapter?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  description?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
};

export type QuestionsUpdateInput = {
  book?: InputMaybe<Scalars['UUID']>;
  chapter?: InputMaybe<Scalars['UUID']>;
  created_at?: InputMaybe<Scalars['Datetime']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  name?: InputMaybe<Scalars['String']>;
};

export type QuestionsUpdateResponse = {
  __typename?: 'questionsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Questions>;
};

export type User_Books_Assignation = Node & {
  __typename?: 'user_books_assignation';
  book?: Maybe<Scalars['UUID']>;
  books?: Maybe<Books>;
  created_at?: Maybe<Scalars['Datetime']>;
  id: Scalars['UUID'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID'];
  user?: Maybe<Scalars['UUID']>;
};

export type User_Books_AssignationConnection = {
  __typename?: 'user_books_assignationConnection';
  edges: Array<User_Books_AssignationEdge>;
  pageInfo: PageInfo;
};

export type User_Books_AssignationDeleteResponse = {
  __typename?: 'user_books_assignationDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<User_Books_Assignation>;
};

export type User_Books_AssignationEdge = {
  __typename?: 'user_books_assignationEdge';
  cursor: Scalars['String'];
  node: User_Books_Assignation;
};

export type User_Books_AssignationFilter = {
  book?: InputMaybe<UuidFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  user?: InputMaybe<UuidFilter>;
};

export type User_Books_AssignationInsertInput = {
  book?: InputMaybe<Scalars['UUID']>;
  created_at?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  user?: InputMaybe<Scalars['UUID']>;
};

export type User_Books_AssignationInsertResponse = {
  __typename?: 'user_books_assignationInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<User_Books_Assignation>;
};

export type User_Books_AssignationOrderBy = {
  book?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  user?: InputMaybe<OrderByDirection>;
};

export type User_Books_AssignationUpdateInput = {
  book?: InputMaybe<Scalars['UUID']>;
  created_at?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  user?: InputMaybe<Scalars['UUID']>;
};

export type User_Books_AssignationUpdateResponse = {
  __typename?: 'user_books_assignationUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<User_Books_Assignation>;
};

export type GetAllForAdminQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllForAdminQuery = { __typename?: 'Query', booksCollection?: { __typename?: 'booksConnection', edges: Array<{ __typename?: 'booksEdge', node: { __typename?: 'books', nodeId: string, id: any, color?: string | null, name?: string | null, chaptersCollection?: { __typename?: 'chaptersConnection', edges: Array<{ __typename?: 'chaptersEdge', node: { __typename?: 'chapters', nodeId: string, id: any, name?: string | null } }> } | null } }> } | null, questionsCollection?: { __typename?: 'questionsConnection', edges: Array<{ __typename?: 'questionsEdge', node: { __typename?: 'questions', nodeId: string, id: any, name?: string | null, description?: string | null, books?: { __typename?: 'books', nodeId: string, id: any, name?: string | null } | null, chapters?: { __typename?: 'chapters', nodeId: string, id: any, name?: string | null } | null } }> } | null };

export type GetAssignedBooksByUserIdQueryVariables = Exact<{
  userId: Scalars['UUID'];
}>;


export type GetAssignedBooksByUserIdQuery = { __typename?: 'Query', user_books_assignationCollection?: { __typename?: 'user_books_assignationConnection', edges: Array<{ __typename?: 'user_books_assignationEdge', node: { __typename?: 'user_books_assignation', nodeId: string, id: any, books?: { __typename?: 'books', nodeId: string, id: any, name?: string | null } | null } }> } | null, booksCollection?: { __typename?: 'booksConnection', edges: Array<{ __typename?: 'booksEdge', node: { __typename?: 'books', nodeId: string, id: any, name?: string | null } }> } | null };


export const GetAllForAdminDocument = gql`
    query GetAllForAdmin {
  booksCollection {
    edges {
      node {
        nodeId
        id
        color
        name
        chaptersCollection {
          edges {
            node {
              nodeId
              id
              name
            }
          }
        }
      }
    }
  }
  questionsCollection {
    edges {
      node {
        nodeId
        id
        name
        description
        books {
          nodeId
          id
          name
        }
        chapters {
          nodeId
          id
          name
        }
      }
    }
  }
}
    `;

/**
 * __useGetAllForAdminQuery__
 *
 * To run a query within a React component, call `useGetAllForAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllForAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllForAdminQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllForAdminQuery(baseOptions?: Apollo.QueryHookOptions<GetAllForAdminQuery, GetAllForAdminQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllForAdminQuery, GetAllForAdminQueryVariables>(GetAllForAdminDocument, options);
      }
export function useGetAllForAdminLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllForAdminQuery, GetAllForAdminQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllForAdminQuery, GetAllForAdminQueryVariables>(GetAllForAdminDocument, options);
        }
export type GetAllForAdminQueryHookResult = ReturnType<typeof useGetAllForAdminQuery>;
export type GetAllForAdminLazyQueryHookResult = ReturnType<typeof useGetAllForAdminLazyQuery>;
export type GetAllForAdminQueryResult = Apollo.QueryResult<GetAllForAdminQuery, GetAllForAdminQueryVariables>;
export const GetAssignedBooksByUserIdDocument = gql`
    query GetAssignedBooksByUserId($userId: UUID!) {
  user_books_assignationCollection(filter: {user: {eq: $userId}}) {
    edges {
      node {
        nodeId
        id
        books {
          nodeId
          id
          name
        }
      }
    }
  }
  booksCollection {
    edges {
      node {
        nodeId
        id
        name
      }
    }
  }
}
    `;

/**
 * __useGetAssignedBooksByUserIdQuery__
 *
 * To run a query within a React component, call `useGetAssignedBooksByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAssignedBooksByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAssignedBooksByUserIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetAssignedBooksByUserIdQuery(baseOptions: Apollo.QueryHookOptions<GetAssignedBooksByUserIdQuery, GetAssignedBooksByUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAssignedBooksByUserIdQuery, GetAssignedBooksByUserIdQueryVariables>(GetAssignedBooksByUserIdDocument, options);
      }
export function useGetAssignedBooksByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAssignedBooksByUserIdQuery, GetAssignedBooksByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAssignedBooksByUserIdQuery, GetAssignedBooksByUserIdQueryVariables>(GetAssignedBooksByUserIdDocument, options);
        }
export type GetAssignedBooksByUserIdQueryHookResult = ReturnType<typeof useGetAssignedBooksByUserIdQuery>;
export type GetAssignedBooksByUserIdLazyQueryHookResult = ReturnType<typeof useGetAssignedBooksByUserIdLazyQuery>;
export type GetAssignedBooksByUserIdQueryResult = Apollo.QueryResult<GetAssignedBooksByUserIdQuery, GetAssignedBooksByUserIdQueryVariables>;