import React, { Fragment } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
// import Landing from './components/layout/Landing' /* Not using a landing as of now */
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import './App.css';

const App = () => (
<Router>
  <Fragment>
      <Navbar/>
      {/* <Router exact path = '/' component = {Landing} /> */}
      <section className="container">
        <Switch>
          <Route exact path ="/signup" component={Signup} />
          <Route exact path ="/login" component={Login} />
        </Switch>
      </section>
  </Fragment>
</Router>
);

export default App;
