const mongoose = require("mongoose")

if (process.argv.lengh < 3) {
    console.log("give password as argument")
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0-kbdoa.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true})

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
})

const Note = mongoose.model("Note", noteSchema)

const note = new Note({
    content: "HTML is Easy",
    date: new Date(),
    important: true
})

Note.find({ important: true }).then(res => {
    res.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})

// note.save().then(res => {
//     console.log("note saved")
//     mongoose.connection.close()
// })