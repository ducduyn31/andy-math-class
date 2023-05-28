import * as Operations from './types';
import { NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router'
import { QueryHookOptions, useQuery } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type React from 'react';
import type { NormalizedCacheObject } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  /** Deletes zero or more records from the `chapters_select_state` collection */
  deleteFromchapters_select_stateCollection: Chapters_Select_StateDeleteResponse;
  /** Deletes zero or more records from the `filter_states` collection */
  deleteFromfilter_statesCollection: Filter_StatesDeleteResponse;
  /** Deletes zero or more records from the `question_images` collection */
  deleteFromquestion_imagesCollection: Question_ImagesDeleteResponse;
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
  /** Adds one or more `chapters_select_state` records to the collection */
  insertIntochapters_select_stateCollection?: Maybe<Chapters_Select_StateInsertResponse>;
  /** Adds one or more `filter_states` records to the collection */
  insertIntofilter_statesCollection?: Maybe<Filter_StatesInsertResponse>;
  /** Adds one or more `question_images` records to the collection */
  insertIntoquestion_imagesCollection?: Maybe<Question_ImagesInsertResponse>;
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
  /** Updates zero or more records in the `chapters_select_state` collection */
  updatechapters_select_stateCollection: Chapters_Select_StateUpdateResponse;
  /** Updates zero or more records in the `filter_states` collection */
  updatefilter_statesCollection: Filter_StatesUpdateResponse;
  /** Updates zero or more records in the `question_images` collection */
  updatequestion_imagesCollection: Question_ImagesUpdateResponse;
  /** Updates zero or more records in the `questions` collection */
  updatequestionsCollection: QuestionsUpdateResponse;
  /** Updates zero or more records in the `user_books_assignation` collection */
  updateuser_books_assignationCollection: User_Books_AssignationUpdateResponse;
  /** Updates zero or more records in the `users` collection */
  updateusersCollection: UsersUpdateResponse;
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
export type MutationDeleteFromchapters_Select_StateCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<Chapters_Select_StateFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromfilter_StatesCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<Filter_StatesFilter>;
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
export type MutationInsertIntochapters_Select_StateCollectionArgs = {
  objects: Array<Chapters_Select_StateInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntofilter_StatesCollectionArgs = {
  objects: Array<Filter_StatesInsertInput>;
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
export type MutationUpdatechapters_Select_StateCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<Chapters_Select_StateFilter>;
  set: Chapters_Select_StateUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatefilter_StatesCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<Filter_StatesFilter>;
  set: Filter_StatesUpdateInput;
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
  /** A pagable collection of type `chapters_select_state` */
  chapters_select_stateCollection?: Maybe<Chapters_Select_StateConnection>;
  /** A pagable collection of type `filter_states` */
  filter_statesCollection?: Maybe<Filter_StatesConnection>;
  /** Retrieve a record by its `ID` */
  node?: Maybe<Node>;
  /** A pagable collection of type `question_images` */
  question_imagesCollection?: Maybe<Question_ImagesConnection>;
  /** A pagable collection of type `questions` */
  questionsCollection?: Maybe<QuestionsConnection>;
  /** A pagable collection of type `user_books_assignation` */
  user_books_assignationCollection?: Maybe<User_Books_AssignationConnection>;
  /** A pagable collection of type `users` */
  usersCollection?: Maybe<UsersConnection>;
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
export type QueryChapters_Select_StateCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<Chapters_Select_StateFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<Chapters_Select_StateOrderBy>>;
};


/** The root type for querying data */
export type QueryFilter_StatesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<Filter_StatesFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<Filter_StatesOrderBy>>;
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
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID'];
  order?: Maybe<Scalars['Int']>;
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
  order?: InputMaybe<IntFilter>;
  question?: InputMaybe<UuidFilter>;
};

export type AnswerInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  image?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['Int']>;
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
  order?: InputMaybe<OrderByDirection>;
  question?: InputMaybe<OrderByDirection>;
};

export type AnswerUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  image?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['Int']>;
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

export type Chapters_Select_State = Node & {
  __typename?: 'chapters_select_state';
  created_at?: Maybe<Scalars['Datetime']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID'];
  state?: Maybe<Scalars['JSON']>;
  users?: Maybe<Users>;
};

export type Chapters_Select_StateConnection = {
  __typename?: 'chapters_select_stateConnection';
  edges: Array<Chapters_Select_StateEdge>;
  pageInfo: PageInfo;
};

export type Chapters_Select_StateDeleteResponse = {
  __typename?: 'chapters_select_stateDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Chapters_Select_State>;
};

export type Chapters_Select_StateEdge = {
  __typename?: 'chapters_select_stateEdge';
  cursor: Scalars['String'];
  node: Chapters_Select_State;
};

export type Chapters_Select_StateFilter = {
  created_at?: InputMaybe<DatetimeFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
};

export type Chapters_Select_StateInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  state?: InputMaybe<Scalars['JSON']>;
};

export type Chapters_Select_StateInsertResponse = {
  __typename?: 'chapters_select_stateInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Chapters_Select_State>;
};

export type Chapters_Select_StateOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  email?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
};

export type Chapters_Select_StateUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  state?: InputMaybe<Scalars['JSON']>;
};

export type Chapters_Select_StateUpdateResponse = {
  __typename?: 'chapters_select_stateUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Chapters_Select_State>;
};

export type Filter_States = Node & {
  __typename?: 'filter_states';
  category?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['Datetime']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID'];
  state?: Maybe<Scalars['JSON']>;
  users?: Maybe<Users>;
};

export type Filter_StatesConnection = {
  __typename?: 'filter_statesConnection';
  edges: Array<Filter_StatesEdge>;
  pageInfo: PageInfo;
};

export type Filter_StatesDeleteResponse = {
  __typename?: 'filter_statesDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Filter_States>;
};

export type Filter_StatesEdge = {
  __typename?: 'filter_statesEdge';
  cursor: Scalars['String'];
  node: Filter_States;
};

export type Filter_StatesFilter = {
  category?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
};

export type Filter_StatesInsertInput = {
  category?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['Datetime']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  state?: InputMaybe<Scalars['JSON']>;
};

export type Filter_StatesInsertResponse = {
  __typename?: 'filter_statesInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Filter_States>;
};

export type Filter_StatesOrderBy = {
  category?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  email?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
};

export type Filter_StatesUpdateInput = {
  category?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['Datetime']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  state?: InputMaybe<Scalars['JSON']>;
};

export type Filter_StatesUpdateResponse = {
  __typename?: 'filter_statesUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Filter_States>;
};

export type Question_Images = Node & {
  __typename?: 'question_images';
  created_at?: Maybe<Scalars['Datetime']>;
  id: Scalars['UUID'];
  image?: Maybe<Scalars['String']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID'];
  order?: Maybe<Scalars['Int']>;
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
  order?: InputMaybe<IntFilter>;
  question?: InputMaybe<UuidFilter>;
};

export type Question_ImagesInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  image?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['Int']>;
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
  order?: InputMaybe<OrderByDirection>;
  question?: InputMaybe<OrderByDirection>;
};

export type Question_ImagesUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  image?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['Int']>;
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
  chapters_select_stateCollection?: Maybe<Chapters_Select_StateConnection>;
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['Datetime']>;
  filter_statesCollection?: Maybe<Filter_StatesConnection>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  image?: Maybe<Scalars['String']>;
  isAdmin?: Maybe<Scalars['Boolean']>;
  isEnabled?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID'];
  user_books_assignationCollection?: Maybe<User_Books_AssignationConnection>;
};


export type UsersChapters_Select_StateCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<Chapters_Select_StateFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<Chapters_Select_StateOrderBy>>;
};


export type UsersFilter_StatesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<Filter_StatesFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<Filter_StatesOrderBy>>;
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

export type GetAllForAdminQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllForAdminQuery = { __typename?: 'Query', booksCollection?: { __typename?: 'booksConnection', edges: Array<{ __typename?: 'booksEdge', node: { __typename?: 'books', nodeId: string, id: any, color?: string | null, name?: string | null, chaptersCollection?: { __typename?: 'chaptersConnection', edges: Array<{ __typename?: 'chaptersEdge', node: { __typename?: 'chapters', nodeId: string, id: any, name?: string | null, parent?: any | null } }> } | null, user_books_assignationCollection?: { __typename?: 'user_books_assignationConnection', edges: Array<{ __typename?: 'user_books_assignationEdge', node: { __typename?: 'user_books_assignation', nodeId: string, id: any, user?: any | null, book?: any | null } }> } | null } }> } | null, questionsCollection?: { __typename?: 'questionsConnection', edges: Array<{ __typename?: 'questionsEdge', node: { __typename?: 'questions', nodeId: string, id: any, name?: string | null, description?: string | null, books?: { __typename?: 'books', nodeId: string, id: any, name?: string | null } | null, chapters?: { __typename?: 'chapters', nodeId: string, id: any, name?: string | null } | null, answerCollection?: { __typename?: 'answerConnection', edges: Array<{ __typename?: 'answerEdge', node: { __typename?: 'answer', nodeId: string, id: any, name?: string | null, image?: string | null, order?: number | null } }> } | null, question_imagesCollection?: { __typename?: 'question_imagesConnection', edges: Array<{ __typename?: 'question_imagesEdge', node: { __typename?: 'question_images', nodeId: string, id: any, image?: string | null, order?: number | null } }> } | null } }> } | null, usersCollection?: { __typename?: 'usersConnection', edges: Array<{ __typename?: 'usersEdge', node: { __typename?: 'users', nodeId: string, id: any, firstName?: string | null, email?: string | null, lastName?: string | null, isAdmin?: boolean | null, isEnabled?: boolean | null, user_books_assignationCollection?: { __typename?: 'user_books_assignationConnection', edges: Array<{ __typename?: 'user_books_assignationEdge', node: { __typename?: 'user_books_assignation', nodeId: string, id: any, book?: any | null } }> } | null } }> } | null };

export type ChaptersInBookFragment = { __typename?: 'chaptersConnection', edges: Array<{ __typename?: 'chaptersEdge', node: { __typename?: 'chapters', nodeId: string, id: any, name?: string | null, parent?: any | null } }> };

export type AssignationsInBookFragment = { __typename?: 'user_books_assignationConnection', edges: Array<{ __typename?: 'user_books_assignationEdge', node: { __typename?: 'user_books_assignation', nodeId: string, id: any, user?: any | null, book?: any | null } }> };

export type AnswersInQuestionFragment = { __typename?: 'answerConnection', edges: Array<{ __typename?: 'answerEdge', node: { __typename?: 'answer', nodeId: string, id: any, name?: string | null, image?: string | null, order?: number | null } }> };

export type ImagesOfQuestionFragment = { __typename?: 'question_imagesConnection', edges: Array<{ __typename?: 'question_imagesEdge', node: { __typename?: 'question_images', nodeId: string, id: any, image?: string | null, order?: number | null } }> };

export type AssignationsOfUserFragment = { __typename?: 'user_books_assignationConnection', edges: Array<{ __typename?: 'user_books_assignationEdge', node: { __typename?: 'user_books_assignation', nodeId: string, id: any, book?: any | null } }> };

export type GetAssignedBooksByUserIdQueryVariables = Exact<{
  userId: Scalars['UUID'];
}>;


export type GetAssignedBooksByUserIdQuery = { __typename?: 'Query', user_books_assignationCollection?: { __typename?: 'user_books_assignationConnection', edges: Array<{ __typename?: 'user_books_assignationEdge', node: { __typename?: 'user_books_assignation', nodeId: string, id: any, books?: { __typename?: 'books', nodeId: string, id: any, name?: string | null } | null } }> } | null, booksCollection?: { __typename?: 'booksConnection', edges: Array<{ __typename?: 'booksEdge', node: { __typename?: 'books', nodeId: string, id: any, name?: string | null } }> } | null };

export type GetLastFilterQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type GetLastFilterQuery = { __typename?: 'Query', userResponse?: { __typename?: 'usersConnection', edges: Array<{ __typename?: 'usersEdge', node: { __typename?: 'users', nodeId: string, filter_statesCollection?: { __typename?: 'filter_statesConnection', edges: Array<{ __typename?: 'filter_statesEdge', node: { __typename?: 'filter_states', nodeId: string, state?: any | null, email?: string | null } }> } | null } }> } | null, bookResponse?: { __typename?: 'usersConnection', edges: Array<{ __typename?: 'usersEdge', node: { __typename?: 'users', nodeId: string, filter_statesCollection?: { __typename?: 'filter_statesConnection', edges: Array<{ __typename?: 'filter_statesEdge', node: { __typename?: 'filter_states', nodeId: string, state?: any | null, email?: string | null } }> } | null } }> } | null, questionResponse?: { __typename?: 'usersConnection', edges: Array<{ __typename?: 'usersEdge', node: { __typename?: 'users', nodeId: string, filter_statesCollection?: { __typename?: 'filter_statesConnection', edges: Array<{ __typename?: 'filter_statesEdge', node: { __typename?: 'filter_states', nodeId: string, state?: any | null, email?: string | null } }> } | null } }> } | null };

export type FilterStateOfUserFragment = { __typename?: 'filter_statesConnection', edges: Array<{ __typename?: 'filter_statesEdge', node: { __typename?: 'filter_states', nodeId: string, state?: any | null, email?: string | null } }> };

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

export type LinkAnswerImagesMutationVariables = Exact<{
  answerImages: Array<AnswerInsertInput> | AnswerInsertInput;
}>;


export type LinkAnswerImagesMutation = { __typename?: 'Mutation', insertIntoanswerCollection?: { __typename?: 'answerInsertResponse', records: Array<{ __typename?: 'answer', nodeId: string, id: any, image?: string | null, question?: any | null, order?: number | null }> } | null };

export type LinkQuestionsImagesMutationVariables = Exact<{
  questionImages: Array<Question_ImagesInsertInput> | Question_ImagesInsertInput;
}>;


export type LinkQuestionsImagesMutation = { __typename?: 'Mutation', insertIntoquestion_imagesCollection?: { __typename?: 'question_imagesInsertResponse', records: Array<{ __typename?: 'question_images', nodeId: string, id: any, image?: string | null, question?: any | null, order?: number | null }> } | null };

export type RemoveAllAssignationsMutationVariables = Exact<{
  userId: Scalars['UUID'];
}>;


export type RemoveAllAssignationsMutation = { __typename?: 'Mutation', deleteFromuser_books_assignationCollection: { __typename?: 'user_books_assignationDeleteResponse', records: Array<{ __typename?: 'user_books_assignation', id: any, nodeId: string }> } };

export type RemoveAnswersFromQuestionMutationVariables = Exact<{
  imagePaths: Array<Scalars['String']> | Scalars['String'];
  questionId: Scalars['UUID'];
}>;


export type RemoveAnswersFromQuestionMutation = { __typename?: 'Mutation', deleteFromanswerCollection: { __typename?: 'answerDeleteResponse', records: Array<{ __typename?: 'answer', id: any, nodeId: string, question?: any | null }> } };

export type RemoveBookMutationVariables = Exact<{
  bookId: Scalars['UUID'];
}>;


export type RemoveBookMutation = { __typename?: 'Mutation', deleteFrombooksCollection: { __typename?: 'booksDeleteResponse', records: Array<{ __typename?: 'books', id: any, chaptersCollection?: { __typename?: 'chaptersConnection', edges: Array<{ __typename?: 'chaptersEdge', node: { __typename?: 'chapters', id: any, nodeId: string } }> } | null, user_books_assignationCollection?: { __typename?: 'user_books_assignationConnection', edges: Array<{ __typename?: 'user_books_assignationEdge', node: { __typename?: 'user_books_assignation', id: any, nodeId: string } }> } | null }> } };

export type RemoveChaptersMutationVariables = Exact<{
  chapterIds: Array<Scalars['UUID']> | Scalars['UUID'];
}>;


export type RemoveChaptersMutation = { __typename?: 'Mutation', deleteFromchaptersCollection: { __typename?: 'chaptersDeleteResponse', records: Array<{ __typename?: 'chapters', id: any, nodeId: string, name?: string | null, book?: any | null }> } };

export type RemoveImagesFromQuestionMutationVariables = Exact<{
  imagePaths: Array<Scalars['String']> | Scalars['String'];
  questionId: Scalars['UUID'];
}>;


export type RemoveImagesFromQuestionMutation = { __typename?: 'Mutation', deleteFromquestion_imagesCollection: { __typename?: 'question_imagesDeleteResponse', records: Array<{ __typename?: 'question_images', id: any, nodeId: string, question?: any | null }> } };

export type RemoveQuestionMutationVariables = Exact<{
  questionId: Scalars['UUID'];
}>;


export type RemoveQuestionMutation = { __typename?: 'Mutation', deleteFromquestionsCollection: { __typename?: 'questionsDeleteResponse', records: Array<{ __typename?: 'questions', id: any, nodeId: string, answerCollection?: { __typename?: 'answerConnection', edges: Array<{ __typename?: 'answerEdge', node: { __typename?: 'answer', nodeId: string, id: any, name?: string | null, image?: string | null, order?: number | null } }> } | null, question_imagesCollection?: { __typename?: 'question_imagesConnection', edges: Array<{ __typename?: 'question_imagesEdge', node: { __typename?: 'question_images', nodeId: string, id: any, image?: string | null, order?: number | null } }> } | null }> } };

export type ReplaceBooksAssignationMutationVariables = Exact<{
  userId: Scalars['UUID'];
  assignations: Array<User_Books_AssignationInsertInput> | User_Books_AssignationInsertInput;
}>;


export type ReplaceBooksAssignationMutation = { __typename?: 'Mutation', deleteFromuser_books_assignationCollection: { __typename?: 'user_books_assignationDeleteResponse', records: Array<{ __typename?: 'user_books_assignation', id: any }> }, insertIntouser_books_assignationCollection?: { __typename?: 'user_books_assignationInsertResponse', records: Array<{ __typename?: 'user_books_assignation', id: any, users?: { __typename?: 'users', id: any, user_books_assignationCollection?: { __typename?: 'user_books_assignationConnection', edges: Array<{ __typename?: 'user_books_assignationEdge', node: { __typename?: 'user_books_assignation', nodeId: string, id: any, book?: any | null } }> } | null } | null }> } | null };

export type UpdateExistingBookMutationVariables = Exact<{
  bookId: Scalars['UUID'];
  updatedBook: BooksUpdateInput;
}>;


export type UpdateExistingBookMutation = { __typename?: 'Mutation', updatebooksCollection: { __typename?: 'booksUpdateResponse', records: Array<{ __typename?: 'books', nodeId: string, id: any, name?: string | null, color?: string | null, chaptersCollection?: { __typename?: 'chaptersConnection', edges: Array<{ __typename?: 'chaptersEdge', node: { __typename?: 'chapters', nodeId: string, id: any, name?: string | null, book?: any | null, parent?: any | null } }> } | null }> } };

export type UpdateLastFilterMutationVariables = Exact<{
  email: Scalars['String'];
  filter: Scalars['JSON'];
  category: Scalars['String'];
}>;


export type UpdateLastFilterMutation = { __typename?: 'Mutation', insertIntofilter_statesCollection?: { __typename?: 'filter_statesInsertResponse', affectedCount: number } | null };

export type UpdateExistingQuestionMutationVariables = Exact<{
  questionID: Scalars['UUID'];
  question: QuestionsUpdateInput;
}>;


export type UpdateExistingQuestionMutation = { __typename?: 'Mutation', updatequestionsCollection: { __typename?: 'questionsUpdateResponse', records: Array<{ __typename?: 'questions', id: any, nodeId: string, name?: string | null, description?: string | null, chapters?: { __typename?: 'chapters', id: any, nodeId: string, name?: string | null } | null, books?: { __typename?: 'books', id: any, nodeId: string, name?: string | null } | null }> } };

export type UpdateUserMutationVariables = Exact<{
  userId: Scalars['UUID'];
  updatedUser: UsersUpdateInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateusersCollection: { __typename?: 'usersUpdateResponse', records: Array<{ __typename?: 'users', id: any, nodeId: string, email?: string | null, firstName?: string | null, lastName?: string | null, isAdmin?: boolean | null, isEnabled?: boolean | null }> } };

export type GetAnswersForQuestionQueryVariables = Exact<{
  questionId: Scalars['UUID'];
}>;


export type GetAnswersForQuestionQuery = { __typename?: 'Query', answerCollection?: { __typename?: 'answerConnection', edges: Array<{ __typename?: 'answerEdge', node: { __typename?: 'answer', nodeId: string, id: any, name?: string | null, image?: string | null, order?: number | null } }> } | null };

export type GetQuestionsForChaptersQueryVariables = Exact<{
  chapterIds: Array<Scalars['UUID']> | Scalars['UUID'];
}>;


export type GetQuestionsForChaptersQuery = { __typename?: 'Query', questionsCollection?: { __typename?: 'questionsConnection', edges: Array<{ __typename?: 'questionsEdge', node: { __typename?: 'questions', nodeId: string, id: any, name?: string | null, description?: string | null, question_imagesCollection?: { __typename?: 'question_imagesConnection', edges: Array<{ __typename?: 'question_imagesEdge', node: { __typename?: 'question_images', nodeId: string, id: any, image?: string | null, order?: number | null } }> } | null } }> } | null };

export type GetAssignedBooksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAssignedBooksQuery = { __typename?: 'Query', booksCollection?: { __typename?: 'booksConnection', edges: Array<{ __typename?: 'booksEdge', node: { __typename?: 'books', id: any, nodeId: string, name?: string | null, chaptersCollection?: { __typename?: 'chaptersConnection', edges: Array<{ __typename?: 'chaptersEdge', node: { __typename?: 'chapters', nodeId: string, id: any, name?: string | null, parent?: any | null } }> } | null } }> } | null };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', usersCollection?: { __typename?: 'usersConnection', edges: Array<{ __typename?: 'usersEdge', node: { __typename?: 'users', nodeId: string, id: any, firstName?: string | null, email?: string | null, lastName?: string | null, isEnabled?: boolean | null } }> } | null };

export type LoadLastSelectedChaptersQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type LoadLastSelectedChaptersQuery = { __typename?: 'Query', chapters_select_stateCollection?: { __typename?: 'chapters_select_stateConnection', edges: Array<{ __typename?: 'chapters_select_stateEdge', node: { __typename?: 'chapters_select_state', nodeId: string, state?: any | null } }> } | null };

export type SaveSelectedChaptersMutationVariables = Exact<{
  selectedChapters: Chapters_Select_StateInsertInput;
}>;


export type SaveSelectedChaptersMutation = { __typename?: 'Mutation', insertIntochapters_select_stateCollection?: { __typename?: 'chapters_select_stateInsertResponse', affectedCount: number } | null };

export type SignUpMutationVariables = Exact<{
  email: Scalars['String'];
  newUser: UsersUpdateInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', updateusersCollection: { __typename?: 'usersUpdateResponse', records: Array<{ __typename?: 'users', id: any, firstName?: string | null, lastName?: string | null, email?: string | null, isEnabled?: boolean | null, isAdmin?: boolean | null }> } };

export async function getServerPageGetAllForAdmin
    (options: Omit<Apollo.QueryOptions<GetAllForAdminQueryVariables>, 'query'>, apolloClient: Apollo.ApolloClient<NormalizedCacheObject> ){
        
        
        const data = await apolloClient.query<GetAllForAdminQuery>({ ...options, query: Operations.GetAllForAdminDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export type PageGetAllForAdminComp = React.FC<{data?: GetAllForAdminQuery, error?: Apollo.ApolloError}>;
export const withPageGetAllForAdmin = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<GetAllForAdminQuery, GetAllForAdminQueryVariables>) => (WrappedComponent:PageGetAllForAdminComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.GetAllForAdminDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrGetAllForAdmin = {
      getServerPage: getServerPageGetAllForAdmin,
      withPage: withPageGetAllForAdmin,
      
    }
export async function getServerPageGetAssignedBooksByUserId
    (options: Omit<Apollo.QueryOptions<GetAssignedBooksByUserIdQueryVariables>, 'query'>, apolloClient: Apollo.ApolloClient<NormalizedCacheObject> ){
        
        
        const data = await apolloClient.query<GetAssignedBooksByUserIdQuery>({ ...options, query: Operations.GetAssignedBooksByUserIdDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export type PageGetAssignedBooksByUserIdComp = React.FC<{data?: GetAssignedBooksByUserIdQuery, error?: Apollo.ApolloError}>;
export const withPageGetAssignedBooksByUserId = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<GetAssignedBooksByUserIdQuery, GetAssignedBooksByUserIdQueryVariables>) => (WrappedComponent:PageGetAssignedBooksByUserIdComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.GetAssignedBooksByUserIdDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrGetAssignedBooksByUserId = {
      getServerPage: getServerPageGetAssignedBooksByUserId,
      withPage: withPageGetAssignedBooksByUserId,
      
    }
export async function getServerPageGetLastFilter
    (options: Omit<Apollo.QueryOptions<GetLastFilterQueryVariables>, 'query'>, apolloClient: Apollo.ApolloClient<NormalizedCacheObject> ){
        
        
        const data = await apolloClient.query<GetLastFilterQuery>({ ...options, query: Operations.GetLastFilterDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export type PageGetLastFilterComp = React.FC<{data?: GetLastFilterQuery, error?: Apollo.ApolloError}>;
export const withPageGetLastFilter = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<GetLastFilterQuery, GetLastFilterQueryVariables>) => (WrappedComponent:PageGetLastFilterComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.GetLastFilterDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrGetLastFilter = {
      getServerPage: getServerPageGetLastFilter,
      withPage: withPageGetLastFilter,
      
    }
















export async function getServerPageGetAnswersForQuestion
    (options: Omit<Apollo.QueryOptions<GetAnswersForQuestionQueryVariables>, 'query'>, apolloClient: Apollo.ApolloClient<NormalizedCacheObject> ){
        
        
        const data = await apolloClient.query<GetAnswersForQuestionQuery>({ ...options, query: Operations.GetAnswersForQuestionDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export type PageGetAnswersForQuestionComp = React.FC<{data?: GetAnswersForQuestionQuery, error?: Apollo.ApolloError}>;
export const withPageGetAnswersForQuestion = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<GetAnswersForQuestionQuery, GetAnswersForQuestionQueryVariables>) => (WrappedComponent:PageGetAnswersForQuestionComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.GetAnswersForQuestionDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrGetAnswersForQuestion = {
      getServerPage: getServerPageGetAnswersForQuestion,
      withPage: withPageGetAnswersForQuestion,
      
    }
export async function getServerPageGetQuestionsForChapters
    (options: Omit<Apollo.QueryOptions<GetQuestionsForChaptersQueryVariables>, 'query'>, apolloClient: Apollo.ApolloClient<NormalizedCacheObject> ){
        
        
        const data = await apolloClient.query<GetQuestionsForChaptersQuery>({ ...options, query: Operations.GetQuestionsForChaptersDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export type PageGetQuestionsForChaptersComp = React.FC<{data?: GetQuestionsForChaptersQuery, error?: Apollo.ApolloError}>;
export const withPageGetQuestionsForChapters = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<GetQuestionsForChaptersQuery, GetQuestionsForChaptersQueryVariables>) => (WrappedComponent:PageGetQuestionsForChaptersComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.GetQuestionsForChaptersDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrGetQuestionsForChapters = {
      getServerPage: getServerPageGetQuestionsForChapters,
      withPage: withPageGetQuestionsForChapters,
      
    }
export async function getServerPageGetAssignedBooks
    (options: Omit<Apollo.QueryOptions<GetAssignedBooksQueryVariables>, 'query'>, apolloClient: Apollo.ApolloClient<NormalizedCacheObject> ){
        
        
        const data = await apolloClient.query<GetAssignedBooksQuery>({ ...options, query: Operations.GetAssignedBooksDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export type PageGetAssignedBooksComp = React.FC<{data?: GetAssignedBooksQuery, error?: Apollo.ApolloError}>;
export const withPageGetAssignedBooks = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<GetAssignedBooksQuery, GetAssignedBooksQueryVariables>) => (WrappedComponent:PageGetAssignedBooksComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.GetAssignedBooksDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrGetAssignedBooks = {
      getServerPage: getServerPageGetAssignedBooks,
      withPage: withPageGetAssignedBooks,
      
    }
export async function getServerPageGetUser
    (options: Omit<Apollo.QueryOptions<GetUserQueryVariables>, 'query'>, apolloClient: Apollo.ApolloClient<NormalizedCacheObject> ){
        
        
        const data = await apolloClient.query<GetUserQuery>({ ...options, query: Operations.GetUserDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export type PageGetUserComp = React.FC<{data?: GetUserQuery, error?: Apollo.ApolloError}>;
export const withPageGetUser = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<GetUserQuery, GetUserQueryVariables>) => (WrappedComponent:PageGetUserComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.GetUserDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrGetUser = {
      getServerPage: getServerPageGetUser,
      withPage: withPageGetUser,
      
    }
export async function getServerPageLoadLastSelectedChapters
    (options: Omit<Apollo.QueryOptions<LoadLastSelectedChaptersQueryVariables>, 'query'>, apolloClient: Apollo.ApolloClient<NormalizedCacheObject> ){
        
        
        const data = await apolloClient.query<LoadLastSelectedChaptersQuery>({ ...options, query: Operations.LoadLastSelectedChaptersDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export type PageLoadLastSelectedChaptersComp = React.FC<{data?: LoadLastSelectedChaptersQuery, error?: Apollo.ApolloError}>;
export const withPageLoadLastSelectedChapters = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<LoadLastSelectedChaptersQuery, LoadLastSelectedChaptersQueryVariables>) => (WrappedComponent:PageLoadLastSelectedChaptersComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.LoadLastSelectedChaptersDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrLoadLastSelectedChapters = {
      getServerPage: getServerPageLoadLastSelectedChapters,
      withPage: withPageLoadLastSelectedChapters,
      
    }

