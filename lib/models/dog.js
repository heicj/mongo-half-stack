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
                .then(result => {
                    return result; 
                });
        });
    },
    find(){
        return mongo.then(db => {
            return db.collection('dogs')
                .find()
                .toArray()
                .then(result => {
                    return result;
                });
        });
    },

    update(id, body){
        return mongo.then(db => {
            return db.collection('dogs')
                .update({
                    _id: ObjectId(id)
                }, {
                    name: body.name,
                    description: body.description
                });
        });
    },

    delete(id){
        return mongo.then(db => {
            return db.collection('dogs')
                .remove({
                    _id: ObjectId(id)
                });
        });
    }
};