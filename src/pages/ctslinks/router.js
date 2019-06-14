import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../pages/ctslinks/home';
import PowerSearch from '../pages/ctslinks/powersearch';



const Router = () => 
    <Switch>
        <Route exact path="/home" component={HomePage} />  
        <Route exact path="/powersearch" component={PowerSearch} />       
    </Switch>


export default Router;