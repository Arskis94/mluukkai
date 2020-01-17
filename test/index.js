const express = require("express")
const app = express()
require("dotenv").config()
const bodyParser = require("body-parser")

const Note = require("./models/note")

app.use(bodyParser.json())
const cors = require("cors")

app.use(cors())

const reqLogger = (req, res, next) => {
  console.log("Method:", req.method)
  console.log("Path:  ", req.path)
  console.log("Body:  ", req.body)
  console.log("---")
  next()
}

app.use(reqLogger)

// let notes = [
//   {
//     id: 1,
//     content: "HTML is easy",
//     date: "2019-05-30T17:30:31.098Z",
//     important: true
//   },
//   {
//     id: 2,
//     content: "Browser can execute only Javascript",
//     date: "2019-05-30T18:39:34.091Z",
//     important: false
//   },
//   {
//     id: 3,
//     content: "GET and POST are the most important methods of HTTP protocol",
//     date: "2019-05-30T19:20:14.298Z",
//     important: true
//   }
// ]

app.use(express.static("build"))

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>")
})

app.post("/api/notes", (req, res) => {
  const body = req.body

  if (body.content === undefined) {
    return res.status(400).json({
      error: "content missing"
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date()
  })

  note
    .save()
    .then(savedNote => savedNote.toJSON())
    .then(savedAndFormattedNote => {
      res.json(savedAndFormattedNote)
    })
    .catch(error => next(error))
})

app.get("/api/notes", (req, res) => {
  Note.find({}).then(notes => {
    res.json(notes)
  })
})

app.get("/api/notes/:id", (req, res) => {
  Note.findById(req.params.id)
    .then(note => {
      if (note) {
        res.json(note.toJSON())
      } else {
        res.status(204).end()
      }
    })
    .catch(error => next(error))
})

app.delete("/api/notes/:id", (req, res) => {
  Note.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.put("/api/notes/:id", (req, res, next) => {
  const body = req.body
  const note = {
    name: body.content,
    important: body.important
  }
  Note.findByIdAndUpdate(req.params.id, note, {
    new: true
  })
    .then(updatedNote => {
      res.json(updatedNote.toJSON())
    })
    .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({
    error: "unknown endpoint"
  })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.log(error.message)
  if (error.name === "CastError" && error.kind === "ObjectID") {
    return res.status(400).send({
      error: "malformatted id"
    })
  } else if (error.name === "ValidationError") {
    return res.status(400).json({
      error: error.message
    })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
