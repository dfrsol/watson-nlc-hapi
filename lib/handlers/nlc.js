// Load Modules

const fs = require('fs');
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

exports.ask = (request, reply) => {

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
};

exports.create = (request, reply) => {
    const file = request.query.file;

    fs.stat(file, (err, res) => {

        if (err) {
            
            return reply(err);
        }

        internals.NLC.create({
            language: 'en',
            name: request.query.name,
            training_data: fs.createReadStream(file)
        },
        (err, res) => {
            
            if (err) {

                return reply(err);
            }

            return reply(res);
        });
    });

    return reply('create');
}

exports.delete = (request, reply) => {

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

exports.list = (reqest, reply) => {

    internals.NLC.list({}, (err, res) => {

        if (err) {

            return reply(err);
        }

        return reply(res);
    });
} 

exports.status = (request, reply) => {

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
