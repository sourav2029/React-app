import React, {Component} from 'react';
import routes from './configs/routes';
import { withRouter, BrowserRouter, Route } from 'react-router-dom'
import './configs/routes'
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import {HttpLink} from "apollo-link-http";
import {InMemoryCache} from "apollo-cache-inmemory";

// jQuery libraries
import jquery from 'jquery';
import metismenu from 'metismenu';
import bootstrap from 'bootstrap';
import selectize from 'selectize';
import daterangepicker from 'bootstrap-daterangepicker'
import slickcarousel from 'slick-carousel'

import datatablesbs from 'datatables.net-bs'
import datatablesbuttonsbs from 'datatables.net-buttons-bs'
import datatablesresponsivebs from 'datatables.net-responsive-bs'

datatablesbuttonsbs(window, $);
datatablesresponsivebs(window, $);
datatablesbs(window, $);

require('datatables.net-buttons/js/buttons.html5.js')(window, $);
require('datatables.net-buttons/js/buttons.print.js')(window, $);

import './../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './../../node_modules/font-awesome/css/font-awesome.min.css'

import './../../node_modules/selectize/dist/css/selectize.bootstrap3.css'
import './../../node_modules/bootstrap-daterangepicker/daterangepicker.css'
import './../../node_modules/slick-carousel/slick/slick.css'
import './../../node_modules/slick-carousel/slick/slick-theme.css'

import './../../node_modules/datatables.net-buttons-bs/css/buttons.bootstrap.css'
import './../../node_modules/datatables.net-responsive-bs/css/responsive.bootstrap.css'
import './../../node_modules/datatables.net-bs/css/dataTables.bootstrap.css'

import './../../public/styles/style.css'
import '../../public/styles/animate/animate.css'

const link = new HttpLink({
    uri : Meteor.absoluteUrl('graphql')
});

const cache = new InMemoryCache();

const client = new ApolloClient({
    link:link,
    cache
});




export default class App extends Component {
    render() {
        return (
            <ApolloProvider client= {client}>
                <BrowserRouter >
                    {routes}
                </BrowserRouter>
            </ApolloProvider>
        )
    }
}