import express from 'express';
import { WebApp } from 'meteor/webapp'
import sslCertficate from "get-ssl-certificate";
import constants from "../imports/ui/configs/constants";
import bodyParser from 'body-parser';
import  "../imports/api/graphql"
import {Meteor} from "meteor/meteor";

const app = express();
app.use(bodyParser.json());

app.post('/api/login',function (req, res, next) {
    if('jwt' in  req.body){
        const jwt = req.body.jwt;
        verifyJwt(jwt);
    }
    const jwt = req.body.jwt;
    res.send("go figure");
})


function verifyJwt(jwt) {
    sslCertficate.get(constants.ssoFQDN).then(function (certificate) {
        console.log(certificate);
    })
}
app.get('/lbstatus', (req, res) => {res.sendStatus(200);});

app.post('/api/form', function(req,res,next){
    console.log(req.body);
    res.send("done");
})

app.all('/api/', async(req, res, next) => {
    res.send({
             statusCode: 405,
             message: 'HTTP Method not allowed.',
         });
});



WebApp.connectHandlers.use(Meteor.bindEnvironment(app));
