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

    after(() => mongo.client.close());

    let dog = {
        name: 'Clifford',
        description: 'big red dog'
    };

    let cujo = {
        name: 'Cujo',
        description: 'not too friendly'
    };

    before(() => {
        return chai.request(app)
            .post('/dogs')
            .send(dog)
            .then(({ body }) => {
                dog = body;
            });
    });

    it('post adds a dog', () => {
        assert.ok(dog._id);
    });

    it('get dog by id', () => {
        return chai.request(app)
            .get(`/dogs/${dog._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, dog);
            });
    });

    it('updates dog', () => {
        dog.description = 'Big Red Dog';
        return chai.request(app)
            .put(`/dogs/${dog._id}`)
            .send(dog)
            .then(() => {
                return chai.request(app)
                    .get(`/dogs/${dog._id}`)
                    .then(({ body }) => {
                        assert.deepEqual(body, dog);
                    });
            });
    });

    it('gets all dogs', () => {
        return chai.request(app)
            .post('/dogs')
            .send(cujo)
            .then(({ body }) => {
                cujo = body;
                return chai.request(app)
                    .get('/dogs')
                    .then(({ body }) => {
                        assert.deepEqual(body, [dog, cujo]);
                    });
            });
    });

    it('deletes dog by id', () => {
        return chai.request(app)
            .delete(`/dogs/${cujo._id}`)
            .then(() => {
                return chai.request(app)
                    .get('/dogs')
                    .then(({ body }) => {
                        assert.deepEqual(body, [dog]);
                    });
            });
    });

});
