import React from 'react';
import { Route, Redirect, IndexRoute } from 'react-router';

// Here we define all our material-ui ReactComponents.
import Master from './components/master';
import AtmosphericElectricHourPage from './components/pages/AtmosphericElectric/hour-page';
import AtmosphericElectricDatePage from './components/pages/AtmosphericElectric/date-page';
import AtmosphericElectricNowPage from './components/pages/AtmosphericElectric/now-page';
import AtmosphericElectricMonthPage from './components/pages/AtmosphericElectric/month-page';


/**
 * Routes: https://github.com/rackt/react-router/blob/master/docs/api/components/Route.md
 *
 * Routes are used to declare your view hierarchy.
 *
 * Say you go to http://material-ui.com/#/components/paper
 * The react router will search for a route named 'paper' and will recursively render its
 * handler and its parent handler like so: Paper > Components > Master
 */
const AppRoutes = (
<Route path = '/' component = {Master} >

    { /* Show the dashboard at / */ }
    <IndexRoute component={AtmosphericElectricNowPage} />
    <Redirect from='atmospheric-electric' to='/atmospheric-electric/now' />
    <Route path = 'atmospheric-electric' >
    <Route path='now' component={AtmosphericElectricNowPage} />
    <Route path='hour' component={AtmosphericElectricHourPage} />
    <Route path='hour/:datetime' component={AtmosphericElectricHourPage} />
    <Route path='date' component = {AtmosphericElectricDatePage}/>
    <Route path='month' component = {AtmosphericElectricMonthPage}/>
    </Route> 
    <Redirect from = '*' to = '/atmospheric-electric/now' />
    </Route>
);

export default AppRoutes;
