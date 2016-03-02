// I'm sure some more through tests will be useful at a later date, but this is sufficient to get rolling with CI.
var request = require('supertest');
describe('loading express', function () {
  var server;
  beforeEach(function () {
    server = require('../app');
  });
  afterEach(function () {
    server.close();
  });
  it('responds to /', function testSlash(done) {
  request(server)
    .get('/')
    .expect(200, done);
  });
});