// Load Modules

const Hoek = require('hoek');
const Joi = require('joi');
const Watson = require('watson-developer-cloud');


// Declare internals

const internals = {
    NLC: Watson.natural_language_classifier({
        url: process.env.VCAP_NLC_URL,
        username: process.env.VCAP_NLC_USERNAME,
        password: process.env.VCAP_NLC_PASSWORD,
        version: 'v1'
    })
}


// NLC Endpoints

exports.ask = {
    description: 'Ask a question to a specific classifier',
    validate: {
        query: {
            id:  Joi.string().min(1).required(),
            question: Joi.string().min(1).required()
        },
        failAction: function (request, reply, source, error) {

            return reply(error);
        }
    },
    handler: (request, reply) => {

        internals.NLC.classify({
            classifier_id: request.query.id,
            text: request.query.question
        }, 
        (err, res) => {

            if (err) {

                return reply(err);
            }

            return reply(res);
        });
    }
}

exports.create = {
    description: 'Create a new classifier',
    validate: {},
    handler: (request, reply) => {

        return reply('create');
    }
}

exports.delete = {
    description: 'Delete a classifier',
    validate: {
        query: {
            id: Joi.string().min(1).required(),
        },
        failAction: function (request, reply, source, error) {

            return reply(error);
        }
    },
    handler: (request, reply) => {

        internals.NLC.delete({
            classifier_id: request.query.id
        },
        (err, res) => {

            if (err) {

                return reply(err);
            }

            return reply(res);
        });
    }
}

exports.list = {
    description: "Returns a list of all classifiers ",
    handler: (reqest, reply) => {

        internals.NLC.list({}, (err, res) => {

            if (err) {

                return reply(err);
            }

            return reply(res);
        });
    } 
}

exports.status = {
    description: "Returns the current classifier training status",
    validate: {
        query: {
            id: Joi.string().min(1).required()
        },
        failAction: function (request, reply, source, error) {

            return reply(error);
        }
    },
    handler: (request, reply) => {

        internals.NLC.status({
            classifier_id: request.query.id
        },
        (err, res) => {

            if (err) {

                return reply(err);
            }

            return reply(res);
        });
    }
}
