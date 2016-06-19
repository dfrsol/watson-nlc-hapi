'use strict';

exports.routes = [];

exports.routes.push({
    method: 'GET',
    path: '/{path*}',
    config: {
        description: 'Simple starter route',
        handler: (reqest, reply) => {
            
            return reply('Watson NLC Hapi.JS Starter Kit');
        }
    }
});