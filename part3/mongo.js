const mongoose = require("mongoose");

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log(
    "Correct syntax: node mongo.js <password>, node mongo.js <password> <name> <number>"
  );
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://ductam_11:${password}@cluster0.sxo5g.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
});
const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 5) {
  const addedName = process.argv[3];
  const addedNumber = process.argv[4];
  const person = new Person({
    id: Math.floor(Math.random() * 100000),
    name: addedName,
    number: addedNumber,
  });
  person.save().then((result) => {
    console.log(result);
    console.log(`added ${addedName} number ${addedNumber} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}
