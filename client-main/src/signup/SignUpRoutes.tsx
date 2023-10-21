import React from 'react';
import { Route } from 'react-router-dom';
import SignUpScreen from './SignUpScreen';
import SignUpSuccessScreen from './SignUpSuccessScreen';
import EmailVerificationScreen from './EmailVerificationScreen';
import EmailVerificationResendScreen from './EmailVerificationResendScreen';
import BetaSignupScreen from 'betasignup/BetaSignupScreen';

export function SignUpRoutes() {
  return (
    <>
      <Route path="/create-account" exact={true} component={SignUpScreen} />
      <Route
        path="/signup/success"
        exact={true}
        component={SignUpSuccessScreen}
      />
      <Route
        path="/signup/verify/resend"
        exact={true}
        component={EmailVerificationResendScreen}
      />
      <Route
        path="/signup/verify/:emailVerificationToken"
        exact={true}
        component={EmailVerificationScreen}
      />
      <Route path="/signup" exact={true} component={BetaSignupScreen} />
    </>
  );
}

export default SignUpRoutes;
