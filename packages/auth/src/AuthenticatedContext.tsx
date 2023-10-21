import { createContext } from 'react';

export const AuthenticatedContext = createContext<boolean>(false);

const { Provider, Consumer } = AuthenticatedContext;
export { Provider as AuthenticatedProvider };
export { Consumer as AuthenticatedConsumer };

export default AuthenticatedContext;
