require('dotenv').config();
const mongo = require('../lib/mongodb');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../lib/app');

chai.use(chaiHttp);
const { assert } = chai;
describe('dogs', () => {

    before(() => {
        return mongo.then(db => {
            db.collection('dogs').remove();
        });
    });

    let dog = {
        name: 'Clifford',
        description: 'big red dog'
    };

    it('saves dog', () => {
        return chai.request(app)
            .post('/dogs')
            .send(dog)
            .then(({ body }) => {
                assert.ok(body._id);
                dog = body;
            });
    });

});
