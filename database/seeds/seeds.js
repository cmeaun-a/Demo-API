/* eslint-disable import/no-extraneous-dependencies */
require('@babel/register')

const { hash: hashPassword } = require('../../src/server/utils/password')

exports.seed = async function seed(knex) {
  await knex('users').insert([
    {
      email: 'test@test.com',
      hash: await hashPassword('test'),
    },
  ])
  await knex('categories').insert([
    {
      name: 'Appetizers',
    },
    {
      name: 'Soups',
    },
    {
      name: 'Salads',
    },
  ])
  await knex('types').insert([
    {
      name: 'Cheese',
    },
    {
      name: 'Pork',
    },
    {
      name: 'Vegetarian',
    },
  ])
  await knex('menus').insert([
    {
      restaurant_name: 'dsd',
      english_name: 'Cheesy Garlic Bread',
      lao_name: 'ເຂົ້າຈີ່ກະທຽມຊີ໊ດ',
      price: 20000,
      cloudinary_id:
        'https://res.cloudinary.com/djxpw90hu/image/upload/v1550747217/lm/P1-01.jpg',
    },
    {
      restaurant_name: 'dsd',
      english_name: 'New Orleans Wings',
      lao_name: 'ປີກໄກ່ນິວອໍລີນ',
      price: 20000,
      cloudinary_id:
        'https://res.cloudinary.com/djxpw90hu/image/upload/v1550747211/lm/P1-03.jpg',
    },
    {
      restaurant_name: 'dsd',
      english_name: 'Garlic Bread',
      lao_name: 'ເຂົ້າຈີ່ກະທຽມ',
      price: 20000,
      cloudinary_id:
        'https://res.cloudinary.com/djxpw90hu/image/upload/v1550747717/lm/P1-04.jpg',
    },
    {
      restaurant_name: 'dsd',
      english_name: 'Cheesy Onion Rings',
      lao_name: 'ຫົວບົວໃຫຍ່ທອດຊີ໊ສ',
      price: 20000,
      cloudinary_id:
        'https://res.cloudinary.com/djxpw90hu/image/upload/v1550747652/lm/P1-02.jpg',
    },
    {
      restaurant_name: 'lm',
      english_name: 'Cheesy Garlic Bread',
      lao_name: 'ເຂົ້າຈີ່ກະທຽມຊີ໊ດ',
      price: 20000,
      cloudinary_id:
        'https://res.cloudinary.com/djxpw90hu/image/upload/v1550747217/lm/P1-01.jpg',
    },
    {
      restaurant_name: 'lm',
      english_name: 'New Orleans Wings',
      lao_name: 'ປີກໄກ່ນິວອໍລີນ',
      price: 20000,
      cloudinary_id:
        'https://res.cloudinary.com/djxpw90hu/image/upload/v1550747211/lm/P1-03.jpg',
    },
    {
      restaurant_name: 'lm',
      english_name: 'Garlic Bread',
      lao_name: 'ເຂົ້າຈີ່ກະທຽມ',
      price: 20000,
      cloudinary_id:
        'https://res.cloudinary.com/djxpw90hu/image/upload/v1550747717/lm/P1-04.jpg',
    },
    {
      restaurant_name: 'lm',
      english_name: 'Cheesy Onion Rings',
      lao_name: 'ຫົວບົວໃຫຍ່ທອດຊີ໊ສ',
      price: 20000,
      cloudinary_id:
        'https://res.cloudinary.com/djxpw90hu/image/upload/v1550747652/lm/P1-02.jpg',
    },
  ])
}
