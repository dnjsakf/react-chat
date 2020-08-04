/* React */
import React from 'react';

/* Router */
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

/* Custom Components */
import ErrorBoundary from '@components/ErrorBoundary';
import NotFound from '@components/NotFound';

/* Layout Components */
import RouteWithLayout from '@layouts/RouteWithLayout';

const MainLayout = React.lazy(()=>import('@layouts/Main'));

/* Route Components */
const Home = React.lazy(()=>import('@routes/Home'));

/* Main Component */
const App = props => {
  /* Props */
  const {
    ...rest
  } = props;
  
  /* Renderer */
  return (
    <ErrorBoundary>
      <Router>
        <Switch>
          <Redirect
            exact
            from="/"
            to="/home"
          />
          <RouteWithLayout
            path="/home"
            layout={ MainLayout }
            component={ Home }
          />
          <RouteWithLayout
            path="/notfound"
            layout={ MainLayout }
            component={ NotFound }
          />
          <Redirect to="/notfound" />
        </Switch>
      </Router>
    </ErrorBoundary>
  );
}

/* Main Component Settings */
App.defaultProps = { };

/* Exports */
export default App;