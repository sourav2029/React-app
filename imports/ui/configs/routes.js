import React from 'react';
import Loginview from '../views/Login';
import AdomainView from '../views/AdomainTable';
import MainView from '../component/layouts/Main';

import { Route , Switch} from 'react-router-dom'

export default (
    <Switch>
        <MainView>
            <Route path="/login" component={Loginview}> </Route>
            <Route path="/adomain" component={AdomainView}></Route>
            {/*<Route path="api/login" component={Loginview}/>*/}
        </MainView>
    </Switch>

);