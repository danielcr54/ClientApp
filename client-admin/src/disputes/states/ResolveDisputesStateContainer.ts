import { Container } from 'unstated';
import { ResolveDisputeState } from './types';
import { DisputeActionModel, FifaMatchDisputeActionType } from 'disputes/types';

export const DEFAULT_STATE = {
  homeActions: new Array<DisputeActionModel>(),
  awayActions: new Array<DisputeActionModel>()
};

export class ResolveDisputeStateContainer extends Container<ResolveDisputeState> {
  state = DEFAULT_STATE;

  addAction = (isHome: boolean, actionId: string, actionTitle: string, isEnforcementAction: boolean, matchId: string, actionType: FifaMatchDisputeActionType) => {
    const action = {id: actionId, title: actionTitle, isEnforcementAction, matchId, actionType}
    if(isHome) {
      this.state.homeActions.push(action);
      this.setState({ homeActions : this.state.homeActions });
    } else {
      this.state.awayActions.push(action);
      this.setState({ awayActions : this.state.awayActions });
    }
  }

  removeAction = (isHome: boolean, actionId: string, matchId: string) => {
    if(isHome) {
      this.setState({
        homeActions : this.state.homeActions.filter(value => value.id !== actionId && value.matchId === matchId)
      });
    } else {
      delete this.state.awayActions[actionId];
      this.setState({
        awayActions : this.state.awayActions.filter(value => value.id !== actionId)
      });
    }
  }

}

export default ResolveDisputeStateContainer;
