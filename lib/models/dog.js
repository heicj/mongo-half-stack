const mongo = require('../mongodb');

module.exports = {
    insert(dog){
        return mongo.then(db => {
            return db.collection('dogs')
                .insert(dog)
                .then(result => result.ops[0]);
        });
    }
};