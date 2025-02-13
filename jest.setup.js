const sequelize = require('./db/connection'); 
require('dotenv').config({ path: '.env.test' });

beforeAll(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully for tests.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
});

afterAll(async () => {
  try {
    await sequelize.close();
    console.log('Database connection closed after tests.');
  } catch (error) {
    console.error('Error closing the database connection:', error);
    throw error;
  }
});
