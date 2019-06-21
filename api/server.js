const express = require('express')

const Games = require('../games/gamesModel')

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
    res.status(200).json({ api: 'up' })
})

server.get('/games', (req, res) => {
    Games.getAll()
    .then(games => {
        res.status(200).json(games)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

server.post('/games', (req, res) => {
    Games.getAll()
    .insert(req.body, 'id')
    .then(ids => {
        res.status(201).json(ids)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

server.delete('/:id', (req, res) => {
    Games.getAll()
    .where({ id: req.params.id })
    .del()
    .then(count => {
        if(count > 0) {
            const unit = count > 1 ? 'records' : 'record';
            res.status(200).json({ message: `${count} ${unit} deleted` })
        } else {
            res.status(404).json({ message: 'Game not found' })
        }
    }) .catch(error => {
        res.status(500).json(error)
    })
})

module.exports = server;