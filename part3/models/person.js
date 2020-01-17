const mongoose = require("mongoose")

const url = process.env.MONGODB_URI

mongoose.set("useFindAndModify", false)

console.log("connecting to", url)

mongoose
  .connect(url, { useNewUrlParser: true })
  .then(result => {
    console.log("connected to MongoDB")
  })
  .catch(error => {
    console.log("error connecting to MongoDB:", error.message)
  })

const noteSchema = new mongoose.Schema({
  name: {
    type: String,
    minlenght: 3,
    required: true
  },
  number: {
    type: String,
    required: true,
    minlength: 8
  }
})

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model("Person", noteSchema)
