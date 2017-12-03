'use strict';

import * as AWS from 'aws-sdk';
import * as uuid from 'uuid/v4';

const docClient = new AWS.DynamoDB.DocumentClient();

console.log(docClient);

export default async ($, args) => {
    console.log('args', args);

    const userId = uuid();

    const user = {
        user_id: userId,
        username: args.username,
        auth0_user_id: args.auth0UserId,
        email: args.email,
    };

    const params: any = {
        TableName: process.env['USERS_TABLE'],
        Item: user,
    }

    const result = await docClient.put(params).promise();

    console.log(result);
    
    return userId;
};