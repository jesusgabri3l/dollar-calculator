import '@testing-library/jest-dom/vitest';

import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll } from 'vitest';

import mockResponse from './mockApi.json';

// msw 2 hace match por path: los query params se leen desde el resolver, no
// se declaran en la URL del handler.
export const handlers = [
  http.get('https://open.er-api.com/v6/latest/USD', () =>
    HttpResponse.json(mockResponse),
  ),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
