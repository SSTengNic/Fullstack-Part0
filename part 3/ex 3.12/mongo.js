const mongoose = require('mongoose')
if (process.argv.length<3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]
const newName = process.argv[3]
const newNum = process.argv[4]
console.log("password is: ",password)
const url = `mongodb+srv://nicholasteng05:${password}@phonebookdatabase.bqh5sfd.mongodb.net/?retryWrites=true&w=majority`

const entrySchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Entry = mongoose.model('Note', entrySchema)

/*
mongoose
  .connect(url)
  .then(Note.find({})
  .then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  }))
*/
if (process.argv.length ===3) {
  mongoose.connect(url)
  .then(()=>{
  console.log("phonebook:")
  })
  .then(Entry.find({})
  .then(result => {
    result.forEach(entry => {
      console.log(`${entry.name} ${entry.number}`)
    })
    mongoose.connection.close()
  }))
}

if (process.argv.length >3) {
mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')    
    const entry = new Entry({
      name: newName,
      number: newNum
    })
    return (
      entry.save(), 
      console.log(`added ${entry.name} number ${entry.number} to phonebook`)
    )
    
  })
  .then(() => {
    console.log('note saved!')
    mongoose.connection.close()
  })
}
