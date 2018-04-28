'use strict';

// Load modules

const Hoek = require('hoek');
const Joi = require('joi');
const Wreck = require('wreck');


// Declare internals

const internals = {};


internals.Upstream = class {

    constructor(options) {

        options = {};

        // Input Validation
        const input = Joi.validate(options, Joi.object());
        Hoek.assert(!input.error, input.error && input.error.annotate());

        this._label = 'root';
        this._inner = {};
        this._headers = {};
        this._settings = input.value;

        return this;
    }

    clone() {

        const obj = Object.create(Object.getPrototypeOf(this));

        obj._label = this._label;
        obj._inner = Hoek.clone(this._inner);
        obj._settings = Hoek.clone(this._settings);

        return this;
    }

    defaults(options) {

        // Input Validation
        const input = Joi.validate(options, Joi.object());
        Hoek.assert(!input.error, input.error && input.error.annotate());

        const obj = this.clone();

        // Apply desired changes
        obj._settings = Hoek.applyToDefaults(obj._settings, input.value);

        return this;
    }
};


internals.UpstreamFoobar = class extends internals.Upstream {

    constructor(options) {

        super();

        options = {};

        // Input Validation
        const input = Joi.validate(options, Joi.object());
        Hoek.assert(!input.error, input.error && input.error.annotate());

        this._path = '/upstream/order/{uuid}';
        this._headers = {};
        this._inner = {};
        this._settings = input.value;
        this._foobar = input.value;     // Might need additional, specific settings for this service (ex: database connection)

        return this;
    }

    clone() {

        const obj = super.clone();

        // Apply desired changes specific to UpstreamFoobar sub-service (route)
        obj._foobar = Hoek.clone(this._foobar);

        return this;
    }

    defaults(options) {

        // Input Validation
        const input = Joi.validate(options, Joi.object());
        Hoek.assert(!input.error, input.error && input.error.annotate());

        const obj = super.defaults(input.value);

        // Apply desired changes specific to UpstreamFoobar sub-service (route)
        obj._settings = Hoek.applyToDefaults(obj._settings, input.value);

        return this;
    }

    // post(options, callback) {}

    // put(options, callback) {}

    // delete(options, callback) {
    //
    //     internals.wreck.call(this, 'DELETE', options, (err, response, payload) => {     // Easy to create a curry function for this.
    //
    //         if (err) {
    //             // Perform any error transformations here.
    //             return next(err);
    //         }
    //
    //         // Perform any 200 success transformations here.
    //         return callback(null, payload );
    //     });
    // }

    get(options, callback) {

        // Input Validation
        const input = Joi.validate(options, Joi.object());
        Hoek.assert(!input.error, input.error && input.error.annotate());

        const settings = this._settings;
        const foobar = this._foobar;

        Wreck.get(options, (err, response, payload) => {    // raw example without the use of method, curry functionality

            if (err) {
                // Perform any error transformations here.
                return next(err);
            }

            // Perform any 200 success transformations here.
            return callback(null, payload );
        });
    }
};


module.exports = new Upstream();


//
// const CCA = new Upstream({ test: 123 });
// console.log(CCA._settings); // { test: 123 }
//
//
// CAA.defaults({ headers: 'correlationId' });
// console.log(CCA._settings); // { test: 123, headers: 'correlationId' }
