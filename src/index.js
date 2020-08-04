/* Webpack */
import { hot } from 'react-hot-loader/root';

/* React */
import React from "react";
import { render as RouterDomRender } from "react-dom";

/* Redux */
import { createStore } from "redux";
import { Provider as StoreProvider } from "react-redux";
import rootReducer from "./reducers";

/* Material-UI */
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";

/* Notistack */
import { SnackbarProvider } from 'notistack';

/* Common Component */
import { CircularSuspense } from "./components/Suspense";

/* App Component */
const App = React.lazy(() => import("./App"));

/* Create Redux Store */
const store = createStore( rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() );

/* Renderer */
function render(Component){
  const root = document.getElementById("root");
  
  Component = module.hot ? hot( Component ) : Component;
  
  RouterDomRender(
    <CircularSuspense>
      <StoreProvider store={ store }>
        <ThemeProvider theme={ theme }>
          <SnackbarProvider 
            maxSnack={3} 
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}>
            <Component/>
          </SnackbarProvider>
        </ThemeProvider>
      </StoreProvider>
    </CircularSuspense>
    , root
  );
}

render( App );