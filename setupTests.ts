import '@testing-library/jest-dom';
import dotenv from 'dotenv';
import { TextEncoder, TextDecoder as UtilTextDecoder } from 'util';
import fetch, { Response as NodeResponse, Headers as NodeHeaders, Request as NodeRequest } from 'node-fetch';
dotenv.config({ path: '.env.test' });

jest.mock('./src/env', () => ({
  API_KEY: process.env.VITE_RESAS_API_KEY
}));

declare global {
  interface Global {
    TextEncoder?: typeof TextEncoder;
    TextDecoder?: typeof UtilTextDecoder;
    fetch?: typeof fetch;
    Response?: typeof NodeResponse;
    Headers?: typeof NodeHeaders;
    Request?: typeof NodeRequest;
  }
}

const globalThisGlobal = globalThis as unknown as Global;

if (typeof globalThisGlobal.TextEncoder === 'undefined') {
  globalThisGlobal.TextEncoder = TextEncoder;
}
if (typeof globalThisGlobal.TextDecoder === 'undefined') {
  globalThisGlobal.TextDecoder = UtilTextDecoder;
}

if (typeof globalThisGlobal.fetch === 'undefined') {
  globalThisGlobal.fetch = fetch;
  globalThisGlobal.Response = NodeResponse;
  globalThisGlobal.Headers = NodeHeaders;
  globalThisGlobal.Request = NodeRequest;
}
