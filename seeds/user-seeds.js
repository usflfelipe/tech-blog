const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userdata = [
  {
    username: 'Bootcamp',
    email: 'bootcamp@ucf.com',
    password: '1234pwd'
  },
  {
    username: 'Brenda',
    email: 'a@b.com',
    password: '1234pwd'
  },
  {
    username: 'Fred',
    email: 'b@b.com',
    password: '1234pwd'
  },
  {
    username: 'George',
    email: 'c@b.com',
    password: '1234pwd'
  },
  {
    username: 'Ron',
    email: 'd@b.com',
    password: '1234pwd'
  },
  {
    username: 'Ginny',
    email: 'e@b.com',
    password: '1234pwd'
  },
  {
    username: 'Harry',
    email: 'f@b.com',
    password: '1234pwd'
  },
  {
    username: 'Arthur',
    email: 'g@b.com',
    password: '1234pwd'
  },
  {
    username: 'Molly',
    email: 'h@b.com',
    password: '1234pwd'
  },
  {
    username: 'Percy',
    email: 'i@b.com',
    password: '1234pwd'
  }
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;
