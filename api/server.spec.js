const supertest = require('supertest')

const server = require('./server')

const db = require('../data/dbConfig')

const { insert, remove } = require('../games/gamesModel')


// server testing
describe('Server test', () => {

    beforeEach(async () => {
        await db('games').truncate();
    });


    // get for /
    describe('Can reach the GET /', () => {
        it('responds with 200 ok', () => {
            return supertest(server)
                .get('/')
                .expect(200)
        })

        it('responds with api being up and running', async () => {
            await supertest(server)
                .get('/')
                .then(res => {
                    expect(res.body).toEqual({ api: 'up' })
                })
        })
    })

    // get for /games

    describe('Can reach GET /games', () => {
        it('responds with 200 ok', () => {
            return supertest(server)
                .get('/games')
                .expect(200)
        })
    })

    // post for /games

    describe('Can reach post for /games', () => {
        it('should add a game', async () => {
            await insert({
                title: 'League of Legends',
                genre: 'MOBA',
                releaseYear: 2009
            })

            const games = await db('games');
            expect(games).toHaveLength(1)
        })


        it('Should display 201 success', async () => {
            await supertest(server)
                .post('/games')
            expect(201);
        });
    })

    // delete for /games

    describe('Can react DELETE for /games', () => {
        it('should delete game', async () => {
            await remove({
                name: 'League of Legends',
                genre: 'MOBA',
                releaseYear: 2009
            })
            await remove({
                name: 'Runescape',
                genre: 'MMORPG',
                releaseYear: 2001
            })
        })
        it('should display 401 games not found', async () => {
            await supertest(server)
                .delete('/:id')
                .then(res => {
                    expect(res.body).toEqual({ message: 'Game not found' })
                })
        })
    })
})
