'use strict';

// Load modules

const Hoek = require('hoek');
const Joi = require('joi');


// Declare internals

const internals = {};


module.exports.register = function (server, options, next) {

    // Input Validation
    // const input = Joi.validate(options, internals.schema);
    // Hoek.assert(!input.error, input.error && input.error.annotate());

    server.ext('onPreHandler', (request, reply) => {

        // Set a static correlationId (dynamic if available)
        const correlationId = request.headers.correlationId || 'static-correlationId';

        request.plugins.test = ...

        return reply.continue();
    });

    server.route({
        method: 'GET',
        path: '/getUpstreamFoobar',
        config: {
            tags: ['api'],
            description: 'Upstream plugin',
            handler: (request, reply) => {

                // Self evident
                console.log({ request: Object.keys(request) });

                // server.decorate() - Extendion of framework interfaces with custom methods where:
                console.log({ decoration: request.foo });

                // app - application-specific state. Provides a safe place to store application data without potential conflicts with the framework. Should not be used by plugins which should use plugins[name].
                console.log({ app: request.app });

                // An object containing the values exposed by each plugin registered where each key is a plugin name and the values are the exposed properties by each plugin using server.expose(). Plugins may set the value of the server.plugins[name] object directly or via the server.expose() method.
                console.log({ exposure: request.server.plugins });

                // plugins - plugin-specific state. Provides a place to store and pass request-level plugin data. The plugins is an object where each key is a plugin name and the value is the state.
                console.log({ plugins: request.plugins });

                return reply({ status: 'ok' }});
            }
        }
    });

    return next();
};

// module.exports.register.attributes = { pkg: require('../package.json') };
module.exports.register.attributes = {
    name: 'test',
    version: '1.0.0',
};
