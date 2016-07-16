'use strict';

// Load Modules

const Path = require('path');


// Declare internals

const internals = {
    publicPath: Path.join(__dirname, '..', 'public')
};


exports.endpoints = [];

exports.endpoints.push({
    method: 'GET',
    path: '/',
    config: {
        description: 'Simple starter route',
        handler: (request, reply) => {

            return reply.view('index');
        }
    }
});
