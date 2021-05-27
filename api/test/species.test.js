const server = require('../server')
const db = require('../data/db-config')
const supertest = require('supertest')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})
afterAll(async (done) => {
  await db.destroy()
  done()
})

it('sanity check', () => {
  expect(true).not.toBe(false)
})

describe( 'tests species endpoint' , () => {
    it( 'returns a list of species' , async () => {
        const res = await supertest(server).get('/api/species')
        expect(res.status).toBe(200)
        expect(res.body[0].species_type).toBe('Flowering Plants')
    })
    it( 'can add a species' , async() => {
		const res = await supertest(server)
			.post('/api/species')
			.send({
				species: "Flying Plants"
			})
		expect(res.status).toBe(202)
		
	})
    it( 'can remove a species' , async() => {
		const res = await supertest(server)
			.delete("/api/species/1")
		expect(res.statusCode).toBe(200)
		expect(res.type).toBe('application/json')
		const res2 = await supertest(server)
			.get("/api/species/1")
		expect(res2.statusCode).toBe(404)
    })
})
