'use strict';

// Load modules

const Hapi = require('hapi');
const Code = require('code');
const Lab = require('lab');
const Server = require('../lib');


// Declare internals

const internals = {};


// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;


describe('/index', () => {

    it('starts server and returns hapi server object', (done) => {

        Server.init(8000, (err, server) => {

            expect(err).to.not.exist();
            expect(server).to.be.instanceof(Hapi.Server);

            server.stop(done);
        });
    });

    it('starts server on provided port', (done) => {

        Server.init(5000, (err, server) => {

            expect(err).to.not.exist();
            expect(server.info.port).to.equal(5000);

            server.stop(done);
        });
    });
});
