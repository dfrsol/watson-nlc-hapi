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

// Ask a question to a specific classifier
exports.ask = (request, reply) => {

}

// Create a new classifier
exports.create = (request, reply) => {

}

// Delete a classifier
exports.delete = (request, reply) => {

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
