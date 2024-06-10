// addSerialNumbers.js
const mongoose = require('mongoose');
const SerialNumber = require('./model/serialNumber'); // Adjust the path if necessary

mongoose.connect("mongodb://localhost:27017/FairManagementPFE2")
  .then(() => {
    console.log("Connected Successfully");

    const serialNumbers = [
      { number: '123456' },
      { number: '654321' },
      { number: '111111' }
    ];

    SerialNumber.insertMany(serialNumbers)
      .then(() => {
        console.log("Serial Numbers added successfully");
        mongoose.connection.close();
      })
      .catch(err => {
        console.log("Error adding serial numbers:", err);
        mongoose.connection.close();
      });

  })
  .catch(err => {
    console.log("Error connecting to database:", err);
  });
