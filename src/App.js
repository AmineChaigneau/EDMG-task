import { Suspense } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Langue from './Langue'
import Acceuil from './Acceuil'
import Layout from './Component/Layout'
import SuccessSnackbar from './Component/notification'
import { routes } from './routes.js'
import FullScreen from './utils/fullScreen';
import MobileView from './utils/mobileview';

function App() {

  return (
    <MobileView>
      <Router>
        <SuccessSnackbar />
        <Suspense fallback={<div></div>}>
          <Switch>
            <Route path='/' exact>
              <Langue />
            </Route>
            <Route path='/Acceuil' exact>
              <Acceuil />
            </Route>
            <FullScreen>
              {routes.map((route, index) => {
                const Component = route.component;

                return (
                  <PrivateRoute
                    key={index}
                    path={route.path}
                    title={route.title}
                    exact
                  >
                    <Component />
                  </PrivateRoute>
                )
              })}
            </FullScreen>
          </Switch>
        </Suspense>
      </Router>
    </MobileView>
  );
}

function PrivateRoute({ title, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() =>
        <Layout title={title}>
          {children}
        </Layout>
      }
    />
  );
}

export default App;
