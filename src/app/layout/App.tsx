import React from 'react';
import { NavBar } from '../../features/nav/NavBar';
import { Route, Switch } from 'react-router-dom';
import { Reminders } from '../../features/reminders/Reminders';

function App() {

  return (
    <Route
      render={() => (
        <>
          <NavBar />
          <div style={{ marginTop: '4.5em' }} className="container">
            <Switch>
              <Route path="/" component={Reminders} />
              <Route component={Reminders} />
            </Switch>
          </div>
        </>
      )}
    />
  );
}

export default App;
