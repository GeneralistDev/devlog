'use strict';

import * as mutation from './mutation-createUser';

const mockPut = jest.fn(() => {
    return Promise.resolve('testresult');
});

function mockDocumentClient() {
    this.put = jest.fn(() => {
        return { promise: () => Promise.resolve('testresult') }
    });
    return this;
}

jest.mock('aws-sdk', () => {
    return {
        DynamoDB: {
            DocumentClient: mockDocumentClient
        }
    }
});

jest.mock('uuid/v4', () => () => 'uuid');

describe('mutation-createUser.ts', () => {
    beforeEach(() => {
        mockPut.mockClear();
    });

    it('should create a user', () => {
        const args = {
            username: 'username',
            auth0UserId: 'auth0|test',
            email: 'username@thing.com',
        };

        return mutation.default(null, args)
            .then((result) => {
                expect(result).toBe('uuid');
            });
    });
})