import React, { useContext, useEffect } from 'react';
import { NavBar } from '../../features/nav/NavBar';
import { Route, useLocation, Switch } from 'react-router-dom';
import { HomePage } from '../../features/home/HomePage';
import { Reminders } from '../../features/reminders/Reminders';

function App() {
  const location = useLocation();

  return (
    <>
      <Route exact path="/" component={HomePage} />
      <Route
        path="/(.+)"
        render={() => (
          <>
            <NavBar />
            <div style={{ marginTop: '7em' }} className="container">
              <Switch>
                <Route exact path="/reminders" component={Reminders} />
                <Route component={Reminders} />
              </Switch>
            </div>
          </>
        )}
      />
    </>
  );
}

export default App;
