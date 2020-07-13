const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();
app.use(express.json());
app.use(cors())

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
const db = knex({
    client: 'pg',
    connection: {
      connectString : process.env.DATABASE_URL,
      ssl: true
    }
});

app.get('/', (req, res) => { res.send('App is working') });
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) });
app.put('/image', (req, res) => { image.handleImage(req, res, db) });
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });
app.listen(process.env.PORT || 3001, () => {
    console.log(`App is running on port ${process.env.PORT}`);
});