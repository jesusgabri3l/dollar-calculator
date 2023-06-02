import '@testing-library/jest-dom';

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll } from 'vitest';

import mockResponse from './mockApi.json';

export const restHandlers = [
  rest.get('http://data.fixer.io/api/latest', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockResponse));
  }),
];

const server = setupServer(...restHandlers);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());
