import React from 'react';
import { Switch, Route } from 'react-router-dom';
import WalletScreen from './WalletScreen';

export function WalletRoutes() {
  return (
    <Switch>
      <Route path="/wallet" exact={true} component={WalletScreen} />
    </Switch>
  );
}

export default WalletRoutes;
