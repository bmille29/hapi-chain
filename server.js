'use strict';

// Load modules
const Hoek = require('hoek');
const plugin = require('./plugin');     // Ex: upstream plugin


// Declare internals
const internals = {};


const server = new Hapi.Server();
server.connection({ port: 0 });
server.register(plugin, (err) => {

     if (err) {
         console.log('Failed loading plugin');
     }
 });

 server.inject('/getUpstreamFoobar', (res) => {

     // expect(Object.keys(res.request.headers)).to.part.contain(['correlationId'])
     console.log({ reqHeaders: res.request.headers });
     console.log({ result: res.result });
 });
