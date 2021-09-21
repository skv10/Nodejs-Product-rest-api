//in place of xyz place your mongodb atlas string in mongodb.connect

const mongoose = require('mongoose');

mongoose.connect('xyz')

mongoose.connection.on('connected',()=>{
console.log('Mongoose connected to db........');
});

mongoose.connection.on('error',(err)=>{
    console.log(err);
});

mongoose.connection.on('disconnected',()=>{
    console.log('mongoose is disconnected......');
});
