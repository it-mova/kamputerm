'use strict';
import { loginConfig } from './auth/config/LoginConfig';
import { mongoConnection } from './core/model/MongoSetup';
import { definitionRouterConfig } from './definition/route/DefinitionRoute';
import { app } from './core/view/Express';
import express from 'express';

loginConfig.configure();
mongoConnection.connect();
definitionRouterConfig.configure();

app.use('/assets', express.static(__dirname + '/public'));
app.all('*', function(req, res) {
    res.sendfile(__dirname + '/public/index.html');
});