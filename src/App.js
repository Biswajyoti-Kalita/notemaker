import 'bootstrap/dist/css/bootstrap.min.css';
import Loading from './components/Loading';
import Dashboard from './components/Dashboard'
import React, { useState, useEffect } from 'react';
import Login  from './components/Login';
import CreatePassword from './components/CreatePassword';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import AuthController from './components/AuthController';

function App() {

  let u = localStorage.getItem("userdata");
  let initUser;
  console.log("u is  ", u);
  if (u === null)
    initUser = {
      islogin: false,
      notes : [],
      password: ""
    }
  else
    initUser = JSON.parse(u);
  console.log(initUser);

  const [user, setUser] = useState(initUser);

  useEffect(() => {
    console.log("user data updated",user,user.notes);

    localStorage.setItem("userdata", JSON.stringify(user));
  }, [user])

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/login" render={(e) => {
            return (
              <>
                <Login user={user} updateUser={setUser} />
              </>
            )
          }}>
          </Route>
          <Route exact path="/createpassword" render={(e) => {
            return (
              <>
                <CreatePassword updateUser={setUser} />
              </>
            )
          }}>
          </Route>
          <Route exact path="/dashboard" render={(e) => {
            return (
              <>
                <AuthController updateUser={setUser} user={user} component={Dashboard}  />
              </>
            )
          }}>
          </Route>
          <Route path="/">
            <Loading user={user} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
