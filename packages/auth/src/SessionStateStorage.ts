import { SessionState } from './types';

export const DEFAULT_STORAGE_KEY = 'session_data';

export interface SessionStateStorage {
  save(sessionState: SessionState): void;
  load(): SessionState;
  clear(): void;
}

export class DefaultSessionStateStorage implements SessionStateStorage {
  constructor(private storageKey: string = DEFAULT_STORAGE_KEY) {}

  save(sessionState: SessionState) {
    window.localStorage.setItem(this.storageKey, JSON.stringify(sessionState));
  }

  load() {
    const data = window.localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : null;
  }

  clear() {
    window.localStorage.removeItem(this.storageKey);
  }
}

export default DefaultSessionStateStorage;
