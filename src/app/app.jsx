import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router'
import AppRoutes from './app-routes';
import injectTapEventPlugin from 'react-tap-event-plugin';


//Helpers for debugging
window.React = React;
window.Perf = require('react-addons-perf');

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();
//console.log("hello world");

/**
 * Render the main app component. You can read more about the react-router here:
 * https://github.com/rackt/react-router/blob/master/docs/guides/overview.md
 */
ReactDOM.render(
    <Router
    history={hashHistory} routes={AppRoutes}
    onUpdate={() => window.scrollTo(0, 0)}
    />
    , document.getElementById('app'));
