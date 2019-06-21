const db = require('../data/dbConfig')

module.exports = {
    insert,
    update,
    remove,
    getAll,
    findById,
}

function insert(game) {
    return db('games')
    .insert(game, 'id')
    .then(ids => {
        return db('games')
        .where({ id: ids[0] })
        .first()
    })
}

async function update(id, changes) {
    return undefined;
}

function remove(game) {
    return db('games')
    .del(game, 'id')
}

function getAll() {
    return db('games')
}

function findById(id) {
    return db('games')
    .findById(game, 'id')
    .then(ids => {
        return db('games')
        .then(ids => {
            return db('games')
            .where({ id: ids[0] })
            .first()
        })
    })
}