const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const morgan = require("morgan")
const cors = require("cors")

app.use(bodyParser.json())
app.use(cors())

const requestLogger = (req, res, next) => {
    console.log("Method:", req.method)
    console.log("Path:", req.path)
    console.log("Body:", req.body)
    console.log("---:")
    next()
}
app.use(requestLogger)

app.use(morgan("combined"))

let persons = [{
        name: "Jou Wadap",
        number: "040-1234445",
        id: 1
    },
    {
        name: "Mou Wadap",
        number: "040-1234645",
        id: 2
    },
    {
        name: "Tru Man",
        number: "044-777 777",
        id: 3
    }
]

app.get("/", (req, res) => {
    res.send("<h1>Hello world!</h1>")
})


app.get("/info", (req, res) => {
    const date = new Date()
    res.send(`<p>Phonebook has info for ${notes.length} people<p>
    <p>${date}<p>`)
})

const generateId = () => {
    const maxId = persons.length > 0 ?
        Math.max(...persons.map(p => p.id)) : 0
    return maxId + 1
}

app.post("/api/persons", (req, res) => {
    const body = req.body
    let duplicate = false
    if (!body.name || !body.number) {
        return res.status(400).json({
            error: "Something is missing"
        })
    }

    persons.forEach(person => {
        if (person.name === body.name) {
            duplicate = true
            return res.status(400).json({
                error: `Name already exists`
            })
        }
    })
    persons.forEach(person => {
        if (person.number === body.number) {
            duplicate = true
            return res.status(400).json({
                error: `Number already exists`
            })
        }
    })
    if (duplicate === true) return

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person)
    res.json(person)
})



app.get("/api/persons", (req, res) => {
    res.json(persons)
})


app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})



const unknownEndpoint = (req, res) => {
    res.status(404).send({
        error: "unknown endpoint"
    })
}
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)