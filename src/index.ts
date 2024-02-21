import express from "express"

const app = express()
const port = 3000

const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)

const db = {
    courses: [
        {id: 1, title: 'front-end'},
        {id: 2, title: 'back-end'},
        {id: 3, title: 'html'},
        {id: 4, title: 'css'},
    ]
}

app.get('/', (req, res) => {
    res.send('<h1>Hello world!</h1>')
})
app.get('/courses', (req, res) => {
    let foundedCourses = db.courses

    if (req.query.title) {
        foundedCourses = foundedCourses.filter(c => c.title.indexOf(req.query.title as string) > -1)
    }

    res.json(foundedCourses)
})
app.get('/courses/:id', (req, res) => {
    const foundedCourse = db.courses.find(c => c.id === +req.params.id)

    if (!foundedCourse) {
        res.sendStatus(404)
        return
    }

    res.json(foundedCourse)
})
app.post('/courses', (req, res) => {

    if (!req.body.title) {
        res.sendStatus(400)
        return
    }

    const newCourse = {
        id: +(new Date()),
        title: req.body.title
    };

    db.courses.push(newCourse)

    res.status(201).json(newCourse)
})
app.delete('/courses/:id', (req, res) => {

    const foundedCourse = db.courses.find(c => c.id === +req.params.id)

    if (!foundedCourse) {
        res.sendStatus(404)
        return
    }

    db.courses = db.courses.filter(c => c.id !== +req.params.id)

    res.sendStatus(204)
})
app.put('/courses/:id', (req, res) => {
    if (!req.body.title) {
        res.sendStatus(400)
        return
    }

    const foundedCourse = db.courses.find(c => c.id === +req.params.id)

    if (!foundedCourse) {
        res.sendStatus(404)
        return
    }

    foundedCourse.title = req.body.title
    res.sendStatus(204)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})