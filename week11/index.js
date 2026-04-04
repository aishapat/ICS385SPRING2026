const mongoose = require('mongoose');
const Customer = require('./customerModel');

// this is my local MongoDB connection (my database name is myCustomerDB)
const connectionString = 'mongodb://127.0.0.1:27017/myCustomerDB';

// connecting to MongoDB
mongoose.connect(connectionString)
  .then(async () => {
    console.log('Connected to MongoDB.');

// these are the customers I want to add into my database
    const customersToInsert = [
      {
        firstName: 'Aisha',
        lastName: 'Patterson',
        email: 'aishapat@hawaii.edu',
        phone: '808-825-5212'
      },
      {
        firstName: 'Jessa',
        lastName: 'Sagario',
        email: 'js2000@gmail.com',
        phone: '808-555-1234'
      },
      {
        firstName: 'Abe',
        lastName: 'Kamaka',
        email: 'abe808@yahoo.com',
        phone: '808-419-3333'
      }
    ];

    try {
      // first I clear out the collection so I don’t get duplicates when I rerun it
      const result = await Customer.deleteMany({});
      console.log(`Deleted ${result.deletedCount} customers.`);
    } catch (error) {
      console.error('Error deleting customers:', error);
    }
    
    try {
      // now I insert all my sample customers into the database
      const insertedCustomers = await Customer.insertMany(customersToInsert);
      console.log('Inserted customers:', insertedCustomers);
    } catch (error) {
      console.error('Error inserting customers:', error);
    }

    try {
      // here I’m searching for a customer by last name
      const lastNameToFind = 'Patterson';
      const customer = await Customer.find({ lastName: lastNameToFind });

      // if it finds something, it prints it out, if not it lets me know
      if (customer.length > 0) {
        console.log(`Found customer with last name '${lastNameToFind}':`, customer);
      } else {
        console.log(`No customer found with last name '${lastNameToFind}'`);
      }
    } catch (error) {
      console.error('Error finding customer:', error);
    }
    
    // closing the connection after everything runs
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });