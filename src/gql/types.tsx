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
  /** Deletes zero or more records from the `accounts` collection */
  deleteFromaccountsCollection: AccountsDeleteResponse;
  /** Deletes zero or more records from the `answer` collection */
  deleteFromanswerCollection: AnswerDeleteResponse;
  /** Deletes zero or more records from the `books` collection */
  deleteFrombooksCollection: BooksDeleteResponse;
  /** Deletes zero or more records from the `chapters` collection */
  deleteFromchaptersCollection: ChaptersDeleteResponse;
  /** Deletes zero or more records from the `question_images` collection */
  deleteFromquestion_imagesCollection: Question_ImagesDeleteResponse;
  /** Deletes zero or more records from the `questions` collection */
  deleteFromquestionsCollection: QuestionsDeleteResponse;
  /** Deletes zero or more records from the `sessions` collection */
  deleteFromsessionsCollection: SessionsDeleteResponse;
  /** Deletes zero or more records from the `user_books_assignation` collection */
  deleteFromuser_books_assignationCollection: User_Books_AssignationDeleteResponse;
  /** Deletes zero or more records from the `users` collection */
  deleteFromusersCollection: UsersDeleteResponse;
  /** Deletes zero or more records from the `verification_tokens` collection */
  deleteFromverification_tokensCollection: Verification_TokensDeleteResponse;
  /** Adds one or more `accounts` records to the collection */
  insertIntoaccountsCollection?: Maybe<AccountsInsertResponse>;
  /** Adds one or more `answer` records to the collection */
  insertIntoanswerCollection?: Maybe<AnswerInsertResponse>;
  /** Adds one or more `books` records to the collection */
  insertIntobooksCollection?: Maybe<BooksInsertResponse>;
  /** Adds one or more `chapters` records to the collection */
  insertIntochaptersCollection?: Maybe<ChaptersInsertResponse>;
  /** Adds one or more `question_images` records to the collection */
  insertIntoquestion_imagesCollection?: Maybe<Question_ImagesInsertResponse>;
  /** Adds one or more `questions` records to the collection */
  insertIntoquestionsCollection?: Maybe<QuestionsInsertResponse>;
  /** Adds one or more `sessions` records to the collection */
  insertIntosessionsCollection?: Maybe<SessionsInsertResponse>;
  /** Adds one or more `user_books_assignation` records to the collection */
  insertIntouser_books_assignationCollection?: Maybe<User_Books_AssignationInsertResponse>;
  /** Adds one or more `users` records to the collection */
  insertIntousersCollection?: Maybe<UsersInsertResponse>;
  /** Adds one or more `verification_tokens` records to the collection */
  insertIntoverification_tokensCollection?: Maybe<Verification_TokensInsertResponse>;
  /** Updates zero or more records in the `accounts` collection */
  updateaccountsCollection: AccountsUpdateResponse;
  /** Updates zero or more records in the `answer` collection */
  updateanswerCollection: AnswerUpdateResponse;
  /** Updates zero or more records in the `books` collection */
  updatebooksCollection: BooksUpdateResponse;
  /** Updates zero or more records in the `chapters` collection */
  updatechaptersCollection: ChaptersUpdateResponse;
  /** Updates zero or more records in the `question_images` collection */
  updatequestion_imagesCollection: Question_ImagesUpdateResponse;
  /** Updates zero or more records in the `questions` collection */
  updatequestionsCollection: QuestionsUpdateResponse;
  /** Updates zero or more records in the `sessions` collection */
  updatesessionsCollection: SessionsUpdateResponse;
  /** Updates zero or more records in the `user_books_assignation` collection */
  updateuser_books_assignationCollection: User_Books_AssignationUpdateResponse;
  /** Updates zero or more records in the `users` collection */
  updateusersCollection: UsersUpdateResponse;
  /** Updates zero or more records in the `verification_tokens` collection */
  updateverification_tokensCollection: Verification_TokensUpdateResponse;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromaccountsCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<AccountsFilter>;
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
export type MutationDeleteFromquestion_ImagesCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<Question_ImagesFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromquestionsCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<QuestionsFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromsessionsCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<SessionsFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromuser_Books_AssignationCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<User_Books_AssignationFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromusersCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<UsersFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromverification_TokensCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<Verification_TokensFilter>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoaccountsCollectionArgs = {
  objects: Array<AccountsInsertInput>;
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
export type MutationInsertIntoquestion_ImagesCollectionArgs = {
  objects: Array<Question_ImagesInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoquestionsCollectionArgs = {
  objects: Array<QuestionsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntosessionsCollectionArgs = {
  objects: Array<SessionsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntouser_Books_AssignationCollectionArgs = {
  objects: Array<User_Books_AssignationInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntousersCollectionArgs = {
  objects: Array<UsersInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoverification_TokensCollectionArgs = {
  objects: Array<Verification_TokensInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationUpdateaccountsCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<AccountsFilter>;
  set: AccountsUpdateInput;
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
export type MutationUpdatequestion_ImagesCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<Question_ImagesFilter>;
  set: Question_ImagesUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatequestionsCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<QuestionsFilter>;
  set: QuestionsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatesessionsCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<SessionsFilter>;
  set: SessionsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateuser_Books_AssignationCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<User_Books_AssignationFilter>;
  set: User_Books_AssignationUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateusersCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<UsersFilter>;
  set: UsersUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateverification_TokensCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<Verification_TokensFilter>;
  set: Verification_TokensUpdateInput;
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
  /** A pagable collection of type `accounts` */
  accountsCollection?: Maybe<AccountsConnection>;
  /** A pagable collection of type `answer` */
  answerCollection?: Maybe<AnswerConnection>;
  /** A pagable collection of type `books` */
  booksCollection?: Maybe<BooksConnection>;
  /** A pagable collection of type `chapters` */
  chaptersCollection?: Maybe<ChaptersConnection>;
  /** Retrieve a record by its `ID` */
  node?: Maybe<Node>;
  /** A pagable collection of type `question_images` */
  question_imagesCollection?: Maybe<Question_ImagesConnection>;
  /** A pagable collection of type `questions` */
  questionsCollection?: Maybe<QuestionsConnection>;
  /** A pagable collection of type `sessions` */
  sessionsCollection?: Maybe<SessionsConnection>;
  /** A pagable collection of type `user_books_assignation` */
  user_books_assignationCollection?: Maybe<User_Books_AssignationConnection>;
  /** A pagable collection of type `users` */
  usersCollection?: Maybe<UsersConnection>;
  /** A pagable collection of type `verification_tokens` */
  verification_tokensCollection?: Maybe<Verification_TokensConnection>;
};


/** The root type for querying data */
export type QueryAccountsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<AccountsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<AccountsOrderBy>>;
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
export type QueryQuestion_ImagesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<Question_ImagesFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<Question_ImagesOrderBy>>;
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
export type QuerySessionsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<SessionsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<SessionsOrderBy>>;
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


/** The root type for querying data */
export type QueryUsersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<UsersFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
};


/** The root type for querying data */
export type QueryVerification_TokensCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<Verification_TokensFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<Verification_TokensOrderBy>>;
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

export type Accounts = Node & {
  __typename?: 'accounts';
  access_token?: Maybe<Scalars['String']>;
  expires_at?: Maybe<Scalars['BigInt']>;
  id: Scalars['UUID'];
  id_token?: Maybe<Scalars['String']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID'];
  oauth_token?: Maybe<Scalars['String']>;
  oauth_token_secret?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  providerAccountId: Scalars['String'];
  refresh_token?: Maybe<Scalars['String']>;
  scope?: Maybe<Scalars['String']>;
  session_state?: Maybe<Scalars['String']>;
  token_type?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  user?: Maybe<Users>;
  userId?: Maybe<Scalars['UUID']>;
};

export type AccountsConnection = {
  __typename?: 'accountsConnection';
  edges: Array<AccountsEdge>;
  pageInfo: PageInfo;
};

export type AccountsDeleteResponse = {
  __typename?: 'accountsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Accounts>;
};

export type AccountsEdge = {
  __typename?: 'accountsEdge';
  cursor: Scalars['String'];
  node: Accounts;
};

export type AccountsFilter = {
  access_token?: InputMaybe<StringFilter>;
  expires_at?: InputMaybe<BigIntFilter>;
  id?: InputMaybe<UuidFilter>;
  id_token?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  oauth_token?: InputMaybe<StringFilter>;
  oauth_token_secret?: InputMaybe<StringFilter>;
  provider?: InputMaybe<StringFilter>;
  providerAccountId?: InputMaybe<StringFilter>;
  refresh_token?: InputMaybe<StringFilter>;
  scope?: InputMaybe<StringFilter>;
  session_state?: InputMaybe<StringFilter>;
  token_type?: InputMaybe<StringFilter>;
  type?: InputMaybe<StringFilter>;
  userId?: InputMaybe<UuidFilter>;
};

export type AccountsInsertInput = {
  access_token?: InputMaybe<Scalars['String']>;
  expires_at?: InputMaybe<Scalars['BigInt']>;
  id?: InputMaybe<Scalars['UUID']>;
  id_token?: InputMaybe<Scalars['String']>;
  oauth_token?: InputMaybe<Scalars['String']>;
  oauth_token_secret?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  providerAccountId?: InputMaybe<Scalars['String']>;
  refresh_token?: InputMaybe<Scalars['String']>;
  scope?: InputMaybe<Scalars['String']>;
  session_state?: InputMaybe<Scalars['String']>;
  token_type?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['UUID']>;
};

export type AccountsInsertResponse = {
  __typename?: 'accountsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Accounts>;
};

export type AccountsOrderBy = {
  access_token?: InputMaybe<OrderByDirection>;
  expires_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  id_token?: InputMaybe<OrderByDirection>;
  oauth_token?: InputMaybe<OrderByDirection>;
  oauth_token_secret?: InputMaybe<OrderByDirection>;
  provider?: InputMaybe<OrderByDirection>;
  providerAccountId?: InputMaybe<OrderByDirection>;
  refresh_token?: InputMaybe<OrderByDirection>;
  scope?: InputMaybe<OrderByDirection>;
  session_state?: InputMaybe<OrderByDirection>;
  token_type?: InputMaybe<OrderByDirection>;
  type?: InputMaybe<OrderByDirection>;
  userId?: InputMaybe<OrderByDirection>;
};

export type AccountsUpdateInput = {
  access_token?: InputMaybe<Scalars['String']>;
  expires_at?: InputMaybe<Scalars['BigInt']>;
  id?: InputMaybe<Scalars['UUID']>;
  id_token?: InputMaybe<Scalars['String']>;
  oauth_token?: InputMaybe<Scalars['String']>;
  oauth_token_secret?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  providerAccountId?: InputMaybe<Scalars['String']>;
  refresh_token?: InputMaybe<Scalars['String']>;
  scope?: InputMaybe<Scalars['String']>;
  session_state?: InputMaybe<Scalars['String']>;
  token_type?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['UUID']>;
};

export type AccountsUpdateResponse = {
  __typename?: 'accountsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Accounts>;
};

export type Answer = Node & {
  __typename?: 'answer';
  created_at?: Maybe<Scalars['Datetime']>;
  id: Scalars['UUID'];
  image?: Maybe<Scalars['String']>;
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
  image?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  question?: InputMaybe<UuidFilter>;
};

export type AnswerInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  image?: InputMaybe<Scalars['String']>;
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
  image?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  question?: InputMaybe<OrderByDirection>;
};

export type AnswerUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  image?: InputMaybe<Scalars['String']>;
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

export type Question_Images = Node & {
  __typename?: 'question_images';
  created_at?: Maybe<Scalars['Datetime']>;
  id: Scalars['UUID'];
  image?: Maybe<Scalars['String']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID'];
  question?: Maybe<Scalars['UUID']>;
  questions?: Maybe<Questions>;
};

export type Question_ImagesConnection = {
  __typename?: 'question_imagesConnection';
  edges: Array<Question_ImagesEdge>;
  pageInfo: PageInfo;
};

export type Question_ImagesDeleteResponse = {
  __typename?: 'question_imagesDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Question_Images>;
};

export type Question_ImagesEdge = {
  __typename?: 'question_imagesEdge';
  cursor: Scalars['String'];
  node: Question_Images;
};

export type Question_ImagesFilter = {
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  image?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  question?: InputMaybe<UuidFilter>;
};

export type Question_ImagesInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  image?: InputMaybe<Scalars['String']>;
  question?: InputMaybe<Scalars['UUID']>;
};

export type Question_ImagesInsertResponse = {
  __typename?: 'question_imagesInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Question_Images>;
};

export type Question_ImagesOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  image?: InputMaybe<OrderByDirection>;
  question?: InputMaybe<OrderByDirection>;
};

export type Question_ImagesUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  image?: InputMaybe<Scalars['String']>;
  question?: InputMaybe<Scalars['UUID']>;
};

export type Question_ImagesUpdateResponse = {
  __typename?: 'question_imagesUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Question_Images>;
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
  question_imagesCollection?: Maybe<Question_ImagesConnection>;
};


export type QuestionsAnswerCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<AnswerFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<AnswerOrderBy>>;
};


export type QuestionsQuestion_ImagesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<Question_ImagesFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<Question_ImagesOrderBy>>;
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

export type Sessions = Node & {
  __typename?: 'sessions';
  expires: Scalars['Datetime'];
  id: Scalars['UUID'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID'];
  sessionToken: Scalars['String'];
  user?: Maybe<Users>;
  userId?: Maybe<Scalars['UUID']>;
};

export type SessionsConnection = {
  __typename?: 'sessionsConnection';
  edges: Array<SessionsEdge>;
  pageInfo: PageInfo;
};

export type SessionsDeleteResponse = {
  __typename?: 'sessionsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Sessions>;
};

export type SessionsEdge = {
  __typename?: 'sessionsEdge';
  cursor: Scalars['String'];
  node: Sessions;
};

export type SessionsFilter = {
  expires?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  sessionToken?: InputMaybe<StringFilter>;
  userId?: InputMaybe<UuidFilter>;
};

export type SessionsInsertInput = {
  expires?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  sessionToken?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['UUID']>;
};

export type SessionsInsertResponse = {
  __typename?: 'sessionsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Sessions>;
};

export type SessionsOrderBy = {
  expires?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  sessionToken?: InputMaybe<OrderByDirection>;
  userId?: InputMaybe<OrderByDirection>;
};

export type SessionsUpdateInput = {
  expires?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  sessionToken?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['UUID']>;
};

export type SessionsUpdateResponse = {
  __typename?: 'sessionsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Sessions>;
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
  users?: Maybe<Users>;
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

export type Users = Node & {
  __typename?: 'users';
  accountsCollection?: Maybe<AccountsConnection>;
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['Datetime']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  image?: Maybe<Scalars['String']>;
  isAdmin?: Maybe<Scalars['Boolean']>;
  isEnabled?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID'];
  sessionsCollection?: Maybe<SessionsConnection>;
  user_books_assignationCollection?: Maybe<User_Books_AssignationConnection>;
};


export type UsersAccountsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<AccountsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<AccountsOrderBy>>;
};


export type UsersSessionsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<SessionsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<SessionsOrderBy>>;
};


export type UsersUser_Books_AssignationCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<User_Books_AssignationFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<User_Books_AssignationOrderBy>>;
};

export type UsersConnection = {
  __typename?: 'usersConnection';
  edges: Array<UsersEdge>;
  pageInfo: PageInfo;
};

export type UsersDeleteResponse = {
  __typename?: 'usersDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Users>;
};

export type UsersEdge = {
  __typename?: 'usersEdge';
  cursor: Scalars['String'];
  node: Users;
};

export type UsersFilter = {
  email?: InputMaybe<StringFilter>;
  emailVerified?: InputMaybe<DatetimeFilter>;
  firstName?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  image?: InputMaybe<StringFilter>;
  isAdmin?: InputMaybe<BooleanFilter>;
  isEnabled?: InputMaybe<BooleanFilter>;
  lastName?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
};

export type UsersInsertInput = {
  email?: InputMaybe<Scalars['String']>;
  emailVerified?: InputMaybe<Scalars['Datetime']>;
  firstName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  image?: InputMaybe<Scalars['String']>;
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  isEnabled?: InputMaybe<Scalars['Boolean']>;
  lastName?: InputMaybe<Scalars['String']>;
};

export type UsersInsertResponse = {
  __typename?: 'usersInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Users>;
};

export type UsersOrderBy = {
  email?: InputMaybe<OrderByDirection>;
  emailVerified?: InputMaybe<OrderByDirection>;
  firstName?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  image?: InputMaybe<OrderByDirection>;
  isAdmin?: InputMaybe<OrderByDirection>;
  isEnabled?: InputMaybe<OrderByDirection>;
  lastName?: InputMaybe<OrderByDirection>;
};

export type UsersUpdateInput = {
  email?: InputMaybe<Scalars['String']>;
  emailVerified?: InputMaybe<Scalars['Datetime']>;
  firstName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  image?: InputMaybe<Scalars['String']>;
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  isEnabled?: InputMaybe<Scalars['Boolean']>;
  lastName?: InputMaybe<Scalars['String']>;
};

export type UsersUpdateResponse = {
  __typename?: 'usersUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Users>;
};

export type Verification_Tokens = Node & {
  __typename?: 'verification_tokens';
  expires: Scalars['Datetime'];
  identifier?: Maybe<Scalars['String']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID'];
  token: Scalars['String'];
};

export type Verification_TokensConnection = {
  __typename?: 'verification_tokensConnection';
  edges: Array<Verification_TokensEdge>;
  pageInfo: PageInfo;
};

export type Verification_TokensDeleteResponse = {
  __typename?: 'verification_tokensDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Verification_Tokens>;
};

export type Verification_TokensEdge = {
  __typename?: 'verification_tokensEdge';
  cursor: Scalars['String'];
  node: Verification_Tokens;
};

export type Verification_TokensFilter = {
  expires?: InputMaybe<DatetimeFilter>;
  identifier?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  token?: InputMaybe<StringFilter>;
};

export type Verification_TokensInsertInput = {
  expires?: InputMaybe<Scalars['Datetime']>;
  identifier?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
};

export type Verification_TokensInsertResponse = {
  __typename?: 'verification_tokensInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Verification_Tokens>;
};

export type Verification_TokensOrderBy = {
  expires?: InputMaybe<OrderByDirection>;
  identifier?: InputMaybe<OrderByDirection>;
  token?: InputMaybe<OrderByDirection>;
};

export type Verification_TokensUpdateInput = {
  expires?: InputMaybe<Scalars['Datetime']>;
  identifier?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
};

export type Verification_TokensUpdateResponse = {
  __typename?: 'verification_tokensUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Verification_Tokens>;
};

export type GetAllForAdminQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllForAdminQuery = { __typename?: 'Query', booksCollection?: { __typename?: 'booksConnection', edges: Array<{ __typename?: 'booksEdge', node: { __typename?: 'books', nodeId: string, id: any, color?: string | null, name?: string | null, chaptersCollection?: { __typename?: 'chaptersConnection', edges: Array<{ __typename?: 'chaptersEdge', node: { __typename?: 'chapters', nodeId: string, id: any, name?: string | null } }> } | null, user_books_assignationCollection?: { __typename?: 'user_books_assignationConnection', edges: Array<{ __typename?: 'user_books_assignationEdge', node: { __typename?: 'user_books_assignation', nodeId: string, id: any, user?: any | null, book?: any | null } }> } | null } }> } | null, questionsCollection?: { __typename?: 'questionsConnection', edges: Array<{ __typename?: 'questionsEdge', node: { __typename?: 'questions', nodeId: string, id: any, name?: string | null, description?: string | null, books?: { __typename?: 'books', nodeId: string, id: any, name?: string | null } | null, chapters?: { __typename?: 'chapters', nodeId: string, id: any, name?: string | null } | null, answerCollection?: { __typename?: 'answerConnection', edges: Array<{ __typename?: 'answerEdge', cursor: string, node: { __typename?: 'answer', nodeId: string, id: any, name?: string | null, image?: string | null } }> } | null, question_imagesCollection?: { __typename?: 'question_imagesConnection', edges: Array<{ __typename?: 'question_imagesEdge', node: { __typename?: 'question_images', nodeId: string, id: any, image?: string | null } }> } | null } }> } | null };

export type ChaptersInBookFragment = { __typename?: 'chaptersConnection', edges: Array<{ __typename?: 'chaptersEdge', node: { __typename?: 'chapters', nodeId: string, id: any, name?: string | null } }> };

export type AssignationsInBookFragment = { __typename?: 'user_books_assignationConnection', edges: Array<{ __typename?: 'user_books_assignationEdge', node: { __typename?: 'user_books_assignation', nodeId: string, id: any, user?: any | null, book?: any | null } }> };

export type AnswersInQuestionFragment = { __typename?: 'answerConnection', edges: Array<{ __typename?: 'answerEdge', cursor: string, node: { __typename?: 'answer', nodeId: string, id: any, name?: string | null, image?: string | null } }> };

export type ImagesOfQuestionFragment = { __typename?: 'question_imagesConnection', edges: Array<{ __typename?: 'question_imagesEdge', node: { __typename?: 'question_images', nodeId: string, id: any, image?: string | null } }> };

export type GetAssignedBooksByUserIdQueryVariables = Exact<{
  userId: Scalars['UUID'];
}>;


export type GetAssignedBooksByUserIdQuery = { __typename?: 'Query', user_books_assignationCollection?: { __typename?: 'user_books_assignationConnection', edges: Array<{ __typename?: 'user_books_assignationEdge', node: { __typename?: 'user_books_assignation', nodeId: string, id: any, books?: { __typename?: 'books', nodeId: string, id: any, name?: string | null } | null } }> } | null, booksCollection?: { __typename?: 'booksConnection', edges: Array<{ __typename?: 'booksEdge', node: { __typename?: 'books', nodeId: string, id: any, name?: string | null } }> } | null };

export type CreateNewBooksMutationVariables = Exact<{
  booksInput: Array<BooksInsertInput> | BooksInsertInput;
}>;


export type CreateNewBooksMutation = { __typename?: 'Mutation', insertIntobooksCollection?: { __typename?: 'booksInsertResponse', records: Array<{ __typename?: 'books', nodeId: string, id: any, name?: string | null, color?: string | null }> } | null };

export type CreateNewChaptersMutationVariables = Exact<{
  chaptersInput: Array<ChaptersInsertInput> | ChaptersInsertInput;
}>;


export type CreateNewChaptersMutation = { __typename?: 'Mutation', insertIntochaptersCollection?: { __typename?: 'chaptersInsertResponse', records: Array<{ __typename?: 'chapters', nodeId: string, id: any, name?: string | null, book?: any | null, parent?: any | null }> } | null };

export type CreateNewQuestionMutationVariables = Exact<{
  newQuestion: Array<QuestionsInsertInput> | QuestionsInsertInput;
}>;


export type CreateNewQuestionMutation = { __typename?: 'Mutation', insertIntoquestionsCollection?: { __typename?: 'questionsInsertResponse', records: Array<{ __typename?: 'questions', nodeId: string, id: any, name?: string | null, description?: string | null }> } | null };

export type LinkQuestionsAnswersMutationVariables = Exact<{
  questionImages: Array<Question_ImagesInsertInput> | Question_ImagesInsertInput;
  answerImages: Array<AnswerInsertInput> | AnswerInsertInput;
}>;


export type LinkQuestionsAnswersMutation = { __typename?: 'Mutation', insertIntoquestion_imagesCollection?: { __typename?: 'question_imagesInsertResponse', records: Array<{ __typename?: 'question_images', nodeId: string, id: any, image?: string | null }> } | null, insertIntoanswerCollection?: { __typename?: 'answerInsertResponse', records: Array<{ __typename?: 'answer', nodeId: string, id: any, image?: string | null }> } | null };

export type RemoveChaptersMutationVariables = Exact<{
  chapterIds: Array<Scalars['UUID']> | Scalars['UUID'];
}>;


export type RemoveChaptersMutation = { __typename?: 'Mutation', deleteFromchaptersCollection: { __typename?: 'chaptersDeleteResponse', records: Array<{ __typename?: 'chapters', id: any, nodeId: string, name?: string | null, book?: any | null }> } };

export type UpdateExistingBookMutationVariables = Exact<{
  bookId: Scalars['UUID'];
  updatedBook: BooksUpdateInput;
}>;


export type UpdateExistingBookMutation = { __typename?: 'Mutation', updatebooksCollection: { __typename?: 'booksUpdateResponse', records: Array<{ __typename?: 'books', nodeId: string, id: any, name?: string | null, color?: string | null, chaptersCollection?: { __typename?: 'chaptersConnection', edges: Array<{ __typename?: 'chaptersEdge', node: { __typename?: 'chapters', nodeId: string, id: any, name?: string | null, book?: any | null, parent?: any | null } }> } | null }> } };

export type UpdateExistingQuestionMutationVariables = Exact<{
  questionID: Scalars['UUID'];
  question: QuestionsUpdateInput;
}>;


export type UpdateExistingQuestionMutation = { __typename?: 'Mutation', updatequestionsCollection: { __typename?: 'questionsUpdateResponse', records: Array<{ __typename?: 'questions', id: any, nodeId: string, name?: string | null, description?: string | null, chapters?: { __typename?: 'chapters', id: any, nodeId: string, name?: string | null } | null, books?: { __typename?: 'books', id: any, nodeId: string, name?: string | null } | null }> } };

export type GetAnswersForQuestionQueryVariables = Exact<{
  questionId: Scalars['UUID'];
}>;


export type GetAnswersForQuestionQuery = { __typename?: 'Query', answerCollection?: { __typename?: 'answerConnection', edges: Array<{ __typename?: 'answerEdge', cursor: string, node: { __typename?: 'answer', nodeId: string, id: any, name?: string | null, image?: string | null } }> } | null };

export type GetQuestionsForChaptersQueryVariables = Exact<{
  chapterIds: Array<Scalars['UUID']> | Scalars['UUID'];
}>;


export type GetQuestionsForChaptersQuery = { __typename?: 'Query', questionsCollection?: { __typename?: 'questionsConnection', edges: Array<{ __typename?: 'questionsEdge', node: { __typename?: 'questions', nodeId: string, id: any, name?: string | null, description?: string | null, question_imagesCollection?: { __typename?: 'question_imagesConnection', edges: Array<{ __typename?: 'question_imagesEdge', node: { __typename?: 'question_images', nodeId: string, id: any, image?: string | null } }> } | null } }> } | null };

export type GetAssignedBooksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAssignedBooksQuery = { __typename?: 'Query', booksCollection?: { __typename?: 'booksConnection', edges: Array<{ __typename?: 'booksEdge', node: { __typename?: 'books', id: any, nodeId: string, name?: string | null, chaptersCollection?: { __typename?: 'chaptersConnection', edges: Array<{ __typename?: 'chaptersEdge', node: { __typename?: 'chapters', nodeId: string, id: any, name?: string | null } }> } | null } }> } | null };

export const ChaptersInBookFragmentDoc = gql`
    fragment chaptersInBook on chaptersConnection {
  edges {
    node {
      nodeId
      id
      name
    }
  }
}
    `;
export const AssignationsInBookFragmentDoc = gql`
    fragment assignationsInBook on user_books_assignationConnection {
  edges {
    node {
      nodeId
      id
      user
      book
    }
  }
}
    `;
export const AnswersInQuestionFragmentDoc = gql`
    fragment answersInQuestion on answerConnection {
  edges {
    cursor
    node {
      nodeId
      id
      name
      image
    }
  }
}
    `;
export const ImagesOfQuestionFragmentDoc = gql`
    fragment imagesOfQuestion on question_imagesConnection {
  edges {
    node {
      nodeId
      id
      image
    }
  }
}
    `;
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
          ...chaptersInBook
        }
        user_books_assignationCollection {
          ...assignationsInBook
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
        answerCollection {
          ...answersInQuestion
        }
        question_imagesCollection {
          ...imagesOfQuestion
        }
      }
    }
  }
}
    ${ChaptersInBookFragmentDoc}
${AssignationsInBookFragmentDoc}
${AnswersInQuestionFragmentDoc}
${ImagesOfQuestionFragmentDoc}`;

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
export const CreateNewBooksDocument = gql`
    mutation CreateNewBooks($booksInput: [booksInsertInput!]!) {
  insertIntobooksCollection(objects: $booksInput) {
    records {
      nodeId
      id
      name
      color
    }
  }
}
    `;
export type CreateNewBooksMutationFn = Apollo.MutationFunction<CreateNewBooksMutation, CreateNewBooksMutationVariables>;

/**
 * __useCreateNewBooksMutation__
 *
 * To run a mutation, you first call `useCreateNewBooksMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewBooksMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewBooksMutation, { data, loading, error }] = useCreateNewBooksMutation({
 *   variables: {
 *      booksInput: // value for 'booksInput'
 *   },
 * });
 */
export function useCreateNewBooksMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewBooksMutation, CreateNewBooksMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewBooksMutation, CreateNewBooksMutationVariables>(CreateNewBooksDocument, options);
      }
export type CreateNewBooksMutationHookResult = ReturnType<typeof useCreateNewBooksMutation>;
export type CreateNewBooksMutationResult = Apollo.MutationResult<CreateNewBooksMutation>;
export type CreateNewBooksMutationOptions = Apollo.BaseMutationOptions<CreateNewBooksMutation, CreateNewBooksMutationVariables>;
export const CreateNewChaptersDocument = gql`
    mutation CreateNewChapters($chaptersInput: [chaptersInsertInput!]!) {
  insertIntochaptersCollection(objects: $chaptersInput) {
    records {
      nodeId
      id
      name
      book
      parent
    }
  }
}
    `;
export type CreateNewChaptersMutationFn = Apollo.MutationFunction<CreateNewChaptersMutation, CreateNewChaptersMutationVariables>;

/**
 * __useCreateNewChaptersMutation__
 *
 * To run a mutation, you first call `useCreateNewChaptersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewChaptersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewChaptersMutation, { data, loading, error }] = useCreateNewChaptersMutation({
 *   variables: {
 *      chaptersInput: // value for 'chaptersInput'
 *   },
 * });
 */
export function useCreateNewChaptersMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewChaptersMutation, CreateNewChaptersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewChaptersMutation, CreateNewChaptersMutationVariables>(CreateNewChaptersDocument, options);
      }
export type CreateNewChaptersMutationHookResult = ReturnType<typeof useCreateNewChaptersMutation>;
export type CreateNewChaptersMutationResult = Apollo.MutationResult<CreateNewChaptersMutation>;
export type CreateNewChaptersMutationOptions = Apollo.BaseMutationOptions<CreateNewChaptersMutation, CreateNewChaptersMutationVariables>;
export const CreateNewQuestionDocument = gql`
    mutation CreateNewQuestion($newQuestion: [questionsInsertInput!]!) {
  insertIntoquestionsCollection(objects: $newQuestion) {
    records {
      nodeId
      id
      name
      description
    }
  }
}
    `;
export type CreateNewQuestionMutationFn = Apollo.MutationFunction<CreateNewQuestionMutation, CreateNewQuestionMutationVariables>;

/**
 * __useCreateNewQuestionMutation__
 *
 * To run a mutation, you first call `useCreateNewQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewQuestionMutation, { data, loading, error }] = useCreateNewQuestionMutation({
 *   variables: {
 *      newQuestion: // value for 'newQuestion'
 *   },
 * });
 */
export function useCreateNewQuestionMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewQuestionMutation, CreateNewQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewQuestionMutation, CreateNewQuestionMutationVariables>(CreateNewQuestionDocument, options);
      }
export type CreateNewQuestionMutationHookResult = ReturnType<typeof useCreateNewQuestionMutation>;
export type CreateNewQuestionMutationResult = Apollo.MutationResult<CreateNewQuestionMutation>;
export type CreateNewQuestionMutationOptions = Apollo.BaseMutationOptions<CreateNewQuestionMutation, CreateNewQuestionMutationVariables>;
export const LinkQuestionsAnswersDocument = gql`
    mutation LinkQuestionsAnswers($questionImages: [question_imagesInsertInput!]!, $answerImages: [answerInsertInput!]!) {
  insertIntoquestion_imagesCollection(objects: $questionImages) {
    records {
      nodeId
      id
      image
    }
  }
  insertIntoanswerCollection(objects: $answerImages) {
    records {
      nodeId
      id
      image
    }
  }
}
    `;
export type LinkQuestionsAnswersMutationFn = Apollo.MutationFunction<LinkQuestionsAnswersMutation, LinkQuestionsAnswersMutationVariables>;

/**
 * __useLinkQuestionsAnswersMutation__
 *
 * To run a mutation, you first call `useLinkQuestionsAnswersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLinkQuestionsAnswersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [linkQuestionsAnswersMutation, { data, loading, error }] = useLinkQuestionsAnswersMutation({
 *   variables: {
 *      questionImages: // value for 'questionImages'
 *      answerImages: // value for 'answerImages'
 *   },
 * });
 */
export function useLinkQuestionsAnswersMutation(baseOptions?: Apollo.MutationHookOptions<LinkQuestionsAnswersMutation, LinkQuestionsAnswersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LinkQuestionsAnswersMutation, LinkQuestionsAnswersMutationVariables>(LinkQuestionsAnswersDocument, options);
      }
export type LinkQuestionsAnswersMutationHookResult = ReturnType<typeof useLinkQuestionsAnswersMutation>;
export type LinkQuestionsAnswersMutationResult = Apollo.MutationResult<LinkQuestionsAnswersMutation>;
export type LinkQuestionsAnswersMutationOptions = Apollo.BaseMutationOptions<LinkQuestionsAnswersMutation, LinkQuestionsAnswersMutationVariables>;
export const RemoveChaptersDocument = gql`
    mutation RemoveChapters($chapterIds: [UUID!]!) {
  deleteFromchaptersCollection(filter: {id: {in: $chapterIds}}, atMost: 1000) {
    records {
      id
      nodeId
      name
      book
    }
  }
}
    `;
export type RemoveChaptersMutationFn = Apollo.MutationFunction<RemoveChaptersMutation, RemoveChaptersMutationVariables>;

/**
 * __useRemoveChaptersMutation__
 *
 * To run a mutation, you first call `useRemoveChaptersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveChaptersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeChaptersMutation, { data, loading, error }] = useRemoveChaptersMutation({
 *   variables: {
 *      chapterIds: // value for 'chapterIds'
 *   },
 * });
 */
export function useRemoveChaptersMutation(baseOptions?: Apollo.MutationHookOptions<RemoveChaptersMutation, RemoveChaptersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveChaptersMutation, RemoveChaptersMutationVariables>(RemoveChaptersDocument, options);
      }
export type RemoveChaptersMutationHookResult = ReturnType<typeof useRemoveChaptersMutation>;
export type RemoveChaptersMutationResult = Apollo.MutationResult<RemoveChaptersMutation>;
export type RemoveChaptersMutationOptions = Apollo.BaseMutationOptions<RemoveChaptersMutation, RemoveChaptersMutationVariables>;
export const UpdateExistingBookDocument = gql`
    mutation UpdateExistingBook($bookId: UUID!, $updatedBook: booksUpdateInput!) {
  updatebooksCollection(set: $updatedBook, filter: {id: {eq: $bookId}}) {
    records {
      nodeId
      id
      name
      color
      chaptersCollection {
        edges {
          node {
            nodeId
            id
            name
            book
            parent
          }
        }
      }
    }
  }
}
    `;
export type UpdateExistingBookMutationFn = Apollo.MutationFunction<UpdateExistingBookMutation, UpdateExistingBookMutationVariables>;

/**
 * __useUpdateExistingBookMutation__
 *
 * To run a mutation, you first call `useUpdateExistingBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateExistingBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateExistingBookMutation, { data, loading, error }] = useUpdateExistingBookMutation({
 *   variables: {
 *      bookId: // value for 'bookId'
 *      updatedBook: // value for 'updatedBook'
 *   },
 * });
 */
export function useUpdateExistingBookMutation(baseOptions?: Apollo.MutationHookOptions<UpdateExistingBookMutation, UpdateExistingBookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateExistingBookMutation, UpdateExistingBookMutationVariables>(UpdateExistingBookDocument, options);
      }
export type UpdateExistingBookMutationHookResult = ReturnType<typeof useUpdateExistingBookMutation>;
export type UpdateExistingBookMutationResult = Apollo.MutationResult<UpdateExistingBookMutation>;
export type UpdateExistingBookMutationOptions = Apollo.BaseMutationOptions<UpdateExistingBookMutation, UpdateExistingBookMutationVariables>;
export const UpdateExistingQuestionDocument = gql`
    mutation UpdateExistingQuestion($questionID: UUID!, $question: questionsUpdateInput!) {
  updatequestionsCollection(filter: {id: {eq: $questionID}}, set: $question) {
    records {
      id
      nodeId
      name
      description
      chapters {
        id
        nodeId
        name
      }
      books {
        id
        nodeId
        name
      }
    }
  }
}
    `;
export type UpdateExistingQuestionMutationFn = Apollo.MutationFunction<UpdateExistingQuestionMutation, UpdateExistingQuestionMutationVariables>;

/**
 * __useUpdateExistingQuestionMutation__
 *
 * To run a mutation, you first call `useUpdateExistingQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateExistingQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateExistingQuestionMutation, { data, loading, error }] = useUpdateExistingQuestionMutation({
 *   variables: {
 *      questionID: // value for 'questionID'
 *      question: // value for 'question'
 *   },
 * });
 */
export function useUpdateExistingQuestionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateExistingQuestionMutation, UpdateExistingQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateExistingQuestionMutation, UpdateExistingQuestionMutationVariables>(UpdateExistingQuestionDocument, options);
      }
export type UpdateExistingQuestionMutationHookResult = ReturnType<typeof useUpdateExistingQuestionMutation>;
export type UpdateExistingQuestionMutationResult = Apollo.MutationResult<UpdateExistingQuestionMutation>;
export type UpdateExistingQuestionMutationOptions = Apollo.BaseMutationOptions<UpdateExistingQuestionMutation, UpdateExistingQuestionMutationVariables>;
export const GetAnswersForQuestionDocument = gql`
    query GetAnswersForQuestion($questionId: UUID!) {
  answerCollection(filter: {question: {eq: $questionId}}) {
    ...answersInQuestion
  }
}
    ${AnswersInQuestionFragmentDoc}`;

/**
 * __useGetAnswersForQuestionQuery__
 *
 * To run a query within a React component, call `useGetAnswersForQuestionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAnswersForQuestionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAnswersForQuestionQuery({
 *   variables: {
 *      questionId: // value for 'questionId'
 *   },
 * });
 */
export function useGetAnswersForQuestionQuery(baseOptions: Apollo.QueryHookOptions<GetAnswersForQuestionQuery, GetAnswersForQuestionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAnswersForQuestionQuery, GetAnswersForQuestionQueryVariables>(GetAnswersForQuestionDocument, options);
      }
export function useGetAnswersForQuestionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAnswersForQuestionQuery, GetAnswersForQuestionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAnswersForQuestionQuery, GetAnswersForQuestionQueryVariables>(GetAnswersForQuestionDocument, options);
        }
export type GetAnswersForQuestionQueryHookResult = ReturnType<typeof useGetAnswersForQuestionQuery>;
export type GetAnswersForQuestionLazyQueryHookResult = ReturnType<typeof useGetAnswersForQuestionLazyQuery>;
export type GetAnswersForQuestionQueryResult = Apollo.QueryResult<GetAnswersForQuestionQuery, GetAnswersForQuestionQueryVariables>;
export const GetQuestionsForChaptersDocument = gql`
    query GetQuestionsForChapters($chapterIds: [UUID!]!) {
  questionsCollection(filter: {chapter: {in: $chapterIds}}) {
    edges {
      node {
        nodeId
        id
        name
        description
        question_imagesCollection {
          ...imagesOfQuestion
        }
      }
    }
  }
}
    ${ImagesOfQuestionFragmentDoc}`;

/**
 * __useGetQuestionsForChaptersQuery__
 *
 * To run a query within a React component, call `useGetQuestionsForChaptersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuestionsForChaptersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuestionsForChaptersQuery({
 *   variables: {
 *      chapterIds: // value for 'chapterIds'
 *   },
 * });
 */
export function useGetQuestionsForChaptersQuery(baseOptions: Apollo.QueryHookOptions<GetQuestionsForChaptersQuery, GetQuestionsForChaptersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuestionsForChaptersQuery, GetQuestionsForChaptersQueryVariables>(GetQuestionsForChaptersDocument, options);
      }
export function useGetQuestionsForChaptersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuestionsForChaptersQuery, GetQuestionsForChaptersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuestionsForChaptersQuery, GetQuestionsForChaptersQueryVariables>(GetQuestionsForChaptersDocument, options);
        }
export type GetQuestionsForChaptersQueryHookResult = ReturnType<typeof useGetQuestionsForChaptersQuery>;
export type GetQuestionsForChaptersLazyQueryHookResult = ReturnType<typeof useGetQuestionsForChaptersLazyQuery>;
export type GetQuestionsForChaptersQueryResult = Apollo.QueryResult<GetQuestionsForChaptersQuery, GetQuestionsForChaptersQueryVariables>;
export const GetAssignedBooksDocument = gql`
    query GetAssignedBooks {
  booksCollection {
    edges {
      node {
        id
        nodeId
        name
        chaptersCollection {
          ...chaptersInBook
        }
      }
    }
  }
}
    ${ChaptersInBookFragmentDoc}`;

/**
 * __useGetAssignedBooksQuery__
 *
 * To run a query within a React component, call `useGetAssignedBooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAssignedBooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAssignedBooksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAssignedBooksQuery(baseOptions?: Apollo.QueryHookOptions<GetAssignedBooksQuery, GetAssignedBooksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAssignedBooksQuery, GetAssignedBooksQueryVariables>(GetAssignedBooksDocument, options);
      }
export function useGetAssignedBooksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAssignedBooksQuery, GetAssignedBooksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAssignedBooksQuery, GetAssignedBooksQueryVariables>(GetAssignedBooksDocument, options);
        }
export type GetAssignedBooksQueryHookResult = ReturnType<typeof useGetAssignedBooksQuery>;
export type GetAssignedBooksLazyQueryHookResult = ReturnType<typeof useGetAssignedBooksLazyQuery>;
export type GetAssignedBooksQueryResult = Apollo.QueryResult<GetAssignedBooksQuery, GetAssignedBooksQueryVariables>;