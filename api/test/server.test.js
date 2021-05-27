const server = require('../server')
const db = require('../data/db-config')
const supertest = require('supertest')
const bcrypt = require('bcryptjs')

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

describe('server.js', () => {
  it('is the correct testing environment', async () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })
})
describe('users endpoint testing',()=>{
  it('get all users', async ()=>{
    const res = await supertest(server).get('/api/users')
      expect(res.statusCode).toBe(200)
      expect(res.type).toBe('application/json')
  })
  it('get specific user', async() =>{
    const res = await supertest(server).get('/api/users/1')
      expect(res.statusCode).toBe(200)
      expect(res.type).toBe('application/json')
  })
  it('add new user', async()=>{
    const res = await supertest(server)
    .post('/api/users')
    .send({
      username: "testman",
      password: "abc123",
      phoneNumber: "8008675309"
    })
  })
  it('add new user & return new resource', async()=>{
    const res = await supertest(server)
      .post('/api/auth/register')
      .send({
        username: "machoMan",
        password: "abc123",
        phoneNumber: "8008675309"
      })
    expect(res.status).toBe(201)
    expect(res.type).toBe('application/json')
    expect(res.body.username).toBe('machoMan')
    expect(res.body.phoneNumber).toBe("8008675309")
  })
  it('delete a user', async ()=>{
    const res = await supertest(server).delete('/api/users/1')
    expect(res.statusCode).toBe(204)
  })
  it('can update a user (all keys)' , async() => {
    
    const res = await supertest(server)
    .put('/api/users/1')
    .send({
      username:"editName",
		  password:"editPassword",
		  phoneNumber:"EDI-TNU-MBER"
	  })

	  expect(res.statusCode).toBe(202)
	  expect(res.type).toBe('application/json')
	  expect(res.body.username).toBe('editName')
	  expect(res.body.phoneNumber).toBe('EDI-TNU-MBER')
	  
    const passwordValidation = await bcrypt.compare('editPassword', res.body.password)
    expect(passwordValidation).toBeTruthy()
    
  })
  it('can update a user (only username)' , async() => {
    const res = await supertest(server)
    .put('/api/users/1')
    .send({
      username:"editName",
	  })
	  expect(res.statusCode).toBe(202)
	  expect(res.type).toBe('application/json')
	  expect(res.body.username).toBe('editName')
	  expect(res.body.phoneNumber).toBe('1234567890')
    expect(res.body.password).toBe('$2a$10$c4pQE1UeQoCnqIsr6Ncsp.n8I8/G8GoJYcbF3mH7NleyDOm2.1cqK')
  })
  it('can update a user (only phoneNumber)' , async() => {
    const res = await supertest(server)
    .put('/api/users/1')
    .send({
      phoneNumber:"notNumber",
	  })
	  expect(res.statusCode).toBe(202)
	  expect(res.type).toBe('application/json')
	  expect(res.body.username).toBe('abcd1234')
	  expect(res.body.phoneNumber).toBe('notNumber')
    expect(res.body.password).toBe('$2a$10$c4pQE1UeQoCnqIsr6Ncsp.n8I8/G8GoJYcbF3mH7NleyDOm2.1cqK')
  })
  it('can update a user (only password)' , async() => {
    const res = await supertest(server)
    .put('/api/users/1')
    .send({
      password: 'editPassword',
	  })
	  expect(res.statusCode).toBe(202)
	  expect(res.type).toBe('application/json')
	  expect(res.body.username).toBe('abcd1234')
	  expect(res.body.phoneNumber).toBe('1234567890')
    const passwordValidation = await bcrypt.compare('editPassword', res.body.password)
    expect(passwordValidation).toBeTruthy()
  })
	  
    
  
})
  
describe('auth endpoint', ()=>{
  it('register adds a user',async ()=>{
    const res = await supertest(server)
      .post('/api/auth/register')
      .send({
        username: "sirTinkles",
        password: "abc123",
        phoneNumber: "8008675309"
      })
    expect(res.statusCode).toBe(201)
    expect(res.type).toBe('application/json')
    expect(res.body.username).toBe('sirTinkles')
    expect(res.body.phoneNumber).toBe('8008675309')
    expect(res.body.user_id).toBeDefined()
  })
  it('registration fails with bad username', async()=>{
    const res = await supertest(server)
      .post('/api/auth/register')
      .send({
        username:123456,
        password: "abc123",
        phoneNumber: "7026817945"
      })
      expect(res.status).toBe(400)
  })
  it('registration fails with bad password', async()=>{
    const res = await supertest(server)
      .post('/api/auth/register')
      .send({
        username:"workingName",
        password: 123456,
        phoneNumber: "workingNumber"
      })
      expect(res.status).toBe(400)
  })
  it('registration fails with bad phoneNumber', async()=>{
    const res = await supertest(server)
      .post('/api/auth/register')
      .send({
        username:"workingName",
        password: "workingPassword",
        phoneNumber:123456,
      })
      expect(res.status).toBe(400)
  })
  it('login passes with fresh user', async()=>{
    const newGuy = await supertest(server)
      .post('/api/auth/register')
      .send({
        username: "sirTinkles",
        password: "abc123",
        phoneNumber: "8008675309"
      })
    expect(newGuy.statusCode).toBe(201)
    expect(newGuy.type).toBe('application/json')
    expect(newGuy.body.username).toBe('sirTinkles')
    expect(newGuy.body.phoneNumber).toBe('8008675309')
    expect(newGuy.body.user_id).toBeDefined()

    const res = await supertest(server)
      .post('/api/auth/login')
      .send({
        username:'sirTinkles',
        password:'abc123'
      })
      expect(res.status).toBe(200)
      expect(res.type).toBe('application/json')
  })
})