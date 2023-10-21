import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PlayerDetailsScreen from './PlayerDetailsScreen';
import PlayerListScreen from './PlayerListScreen';

export function PlayersRoutes() {
  return (
    <Switch>
      <Route path="/players" exact={true} component={PlayerListScreen} />
      <Route path="/players/:username" component={PlayerDetailsScreen} />
    </Switch>
  );
}

export default PlayersRoutes;
