'use strict';

import * as _ from 'lodash';
import * as cors from './cors';

function createResponse(code, headers, body) {
    return {
        statusCode: code,
        headers: _.assign(
            {},
            cors.getHeaders(headers),
            headers
        ),
        body: JSON.stringify(body),
    }
}

export const ok = (body, headers = {}) => {
    return createResponse(200, headers, body);
};

export const badRequest = (body, headers = {}) => {
    return createResponse(400, headers, body);
};

export const forbidden = (body, headers = {}) => {
    return createResponse(401, headers, body);
};

export const internalServerError = (body, headers = {}) => {
    return createResponse(500, headers, body);
};