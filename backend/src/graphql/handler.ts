'use strict';

import 'source-map-support/register';

import { graphql } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';

import * as JSONType from 'graphql-type-json';
import { GraphQLDateTime as DateTime } from 'graphql-iso-date';

import * as httpResponse from '../libs/http-response';

import * as queries from './queries';
import * as mutations from './mutations';

const typeDefs = `
    scalar JSON
    scalar DateTime

    type Query {
        hello: String!
    }
    
    type Mutation {
        createUser(user: UserInput!): User!
    }

    type User {
        userId: String!
        username: String!
        email: String!
        auth0UserIds: [String!]!
    }

    input UserInput {
        username: String!
        email: String!
        auth0UserId: String!
    }
`;

const query = {}

const resolvers = {
    JSON: JSONType,
    DateTime: DateTime,
    Query: {
        hello: queries.hello,
    },
    Mutation: {
        createUser: mutations.createUser,
    }
};

module.exports.handler = async (event, context, callback) => {
    const requestBody = JSON.parse(event.body);
    
    console.log(requestBody);

    try {
        const executableSchema = makeExecutableSchema({
            typeDefs,
            resolvers
        });

        const response = await graphql(
            executableSchema,
            requestBody.query,
            null,
            context,
            requestBody.variables,
        );

        console.log(response);

        callback(null, httpResponse.ok(response));
    } catch (err) {
        console.error(err);
        console.error(err.stack);
        
        callback(httpResponse.internalServerError(err));
    }
};