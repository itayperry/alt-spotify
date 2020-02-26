import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import ReceiveToken from './components/auth/ReceiveToken';
import Login from './components/auth/Login';
import Home from './components/Home';
import { AccessTokenProvider } from './store/AccessTokenContext';
import { PlayerSourceProvider } from './store/PlayerSourceContext';

function App() {
  return (
    <div className='App'>
      <div id='header'>
        <AccessTokenProvider>
          <BrowserRouter>
            <Switch>
              {/* {redirectHandler} */}
              {/* <Redirect exact from='/' to='/login' />} */}
              <Redirect exact from='/' to='/login' />}
              <Route exact path='/login' component={Login} />
              <Route exact path='/receive-token' component={ReceiveToken} />
              <PlayerSourceProvider>
                <Route path='/home' component={Home} />
              </PlayerSourceProvider>
            </Switch>
          </BrowserRouter>
        </AccessTokenProvider>
      </div>
    </div>
  );
}

export default App;

// const [contextToken] = useContext(AccessTokenContext);
// const redirectHandler = !contextToken ? (
//   <Redirect exact from='/' to='/login' />
// ) : (
//   <Redirect exact from='/' to='/home' />
// );
