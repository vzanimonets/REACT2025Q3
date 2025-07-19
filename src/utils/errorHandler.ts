import type { ErrorObject } from '../types';
import { ERROR_MESSAGES } from './constants';

export function createErrorObject(err: unknown): ErrorObject {
  if (
    err instanceof Error &&
    err.message &&
    err.message.includes('SWAPI request failed:')
  ) {
    const match = err.message.match(/(\d{3})/);
    const code = match ? parseInt(match[1], 10) : undefined;
    return { text: err.message, errorCode: code };
  }

  return {
    text:
      err instanceof Error
        ? err.message || ERROR_MESSAGES.UNKNOWN_ERROR
        : ERROR_MESSAGES.UNKNOWN_ERROR,
  };
}
