// importing the people file

// this is how we normally get the data
//const data = require("./people");

//console.log(data.people, data.ages);

// this sis how we grab the data with destructuring

const { people, ages } = require("./people");

console.log(people, ages);

// this is about the operating system that we have
// it is a built in object

const os = require("os");

console.log(os.platform(), os.homedir());
