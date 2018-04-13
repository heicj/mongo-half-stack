const mongo = require('../mongodb');
const ObjectId = require('mongodb').ObjectID;

module.exports = {
    insert(dog){
        return mongo.then(db => {
            return db.collection('dogs')
                .insert(dog)
                .then(result => result.ops[0]);
        });
    },

    findOne(id){
        return mongo.then(db => {
            return db.collection('dogs')
                .findOne({ _id: ObjectId(id) })
                // .toArray();
                .then(result => {
                    return result; });
        });
    }
};