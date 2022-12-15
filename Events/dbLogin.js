const mongoose = require('mongoose') 
  
module.exports = db = async (client) => { 
   await mongoose.connect(process.env.MONGODB, { 
     useNewUrlParser: true, 
     useUnifiedTopology: true, 
     autoIndex: false, 
     poolSize: 5, 
     connectTimeoutMS: 10000, 
     family: 4 
   }) 
   mongoose.Promise = global.Promise 
   mongoose.set('useFindAndModify', false) 
  
   mongoose.connection.on('connected', () => { 
     console.log('Connected to the database') 
   }) 
   mongoose.connection.on('disconnected', () => { 
     console.log("Disconnected Mongoose") 
   }) 
   mongoose.connection.on('err', (err) => { 
     console.log(err) 
   }) 
 }