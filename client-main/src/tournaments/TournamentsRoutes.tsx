import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TournamentDetailsScreen from './TournamentDetailsScreen';

export function TournamentsRoutes() {
  return (
    <Switch>
      {/* <Route path="/tournaments" exact={true} component={TeamListScreen} /> */}
      {/* <Route path="/tournaments/create" exact={true} component={CreateTournamentScreen} /> */}
      <Route path="/tournaments/:urlSlug" component={TournamentDetailsScreen} />
    </Switch>
  );
}

export default TournamentsRoutes;
