import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { connect } from 'react-redux';
import LoginForm from './components/Onboarding/LoginForm';
import Dashboard from './components/Dashboard';
import UserDashboard from './views/UserDashboard/UserDashboard';
import Marketplace from './views/Marketplace/Marketplace';
import Landing from './components/Landing/Landing-2';
import MainFaq from './components/FAQ/Main';
import LandingFaq from './components/FAQ/LandingFaq';
import Booking from './components/Booking/Booking';
import Feedback from './views/Feedback/Feedback';
import VideoChat from './components/Video/VideoChat';
import Chat from './components/Chat/ChatScreen';
import StartChat from './components/Chat/Chat';
import Settings from './views/Settings/Settings';
import GiveFeedback from './views/Feedback/GiveFeedback';
import SignUp from './components/Onboarding/SignupStepper';
import CoachForm from './components/Onboarding/CoachForm';

const globalTheme = createMuiTheme({
  typography: {
    fontFamily: ['Ubuntu', 'Abeezee'].join(','),
  },
});

function App(props) {
  const routes = (
    <Switch>
      <Route path={'/dashboard'} component={UserDashboard} />
      {props.user && props.user.role_id === 1 ? (
        <Route path={'/marketplace'} component={Marketplace} />
      ) : null}
      <Route path={'/appointment'} component={Booking} />
      <Route path={'/feedback'} component={Feedback} />
      <Route path={'/givefeedback'} component={GiveFeedback} />
      <Route path={'/interview'} component={VideoChat} />
      <Route path={'/Settings'} component={Settings} />
      <Route path={'/FAQ'} component={MainFaq} />
      {props.user && props.user.role_id === 1 ? (
        <Route path={'/start_chat'} component={StartChat} />
      ) : null}
      <Route path={'/chat'} component={Chat} />
      <Redirect to='/dashboard' />
    </Switch>
  );

  if (localStorage.getItem('token')) {
    return (
      <ThemeProvider theme={globalTheme}>
        <Dashboard routes={routes} />
      </ThemeProvider>
    );
  }

  return (
    <Switch>
      <Route exact path='/' component={Landing} />
      <Route path='/login/' component={LoginForm} />
      <Route path='/register' component={SignUp} />
      <Route path='/faq' component={LandingFaq} />
      <Route path='/coach' component={CoachForm} />
      <Redirect to='/' />
    </Switch>
  );
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
  };
};

export default connect(mapStateToProps)(App);
