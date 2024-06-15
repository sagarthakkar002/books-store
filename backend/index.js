import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'

const app = express()

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'test',
    database: 'test'
})

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send('Hello World')
})

app.post("/books", (req, res) => {
    const { body: { title, desc, price, cover } } = req || {}
    const q = "INSERT INTO books (`title`, `desc`,`price`, `cover`) VALUES (?)"
    const values = [title, desc, price, cover]
    db.query(q, [values], (err, data) => {
        if (err) {
            res.json(err)
        }
        return res.json("Book has been created")
    })
})

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE  FROM books WHERE id = ?"
    db.query(q, [bookId], (err, data) => {
        if (err) {
            res.json(err);
        }
        res.json({ message: "Deleted book successfully" })
    })

})

app.get("/books/:id", (req, res) => {
    const bookId = req.params.id
    const q = "select * from books WHERE id= ?"

    db.query(q, [bookId], (err, data) => {
        if (err) {
            return res.json(err)
        }
        return res.json(data)
    })
})

app.get("/books", (req, res) => {
    const q = "select * from books"
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err)
        }
        return res.json(data)

    })
})

app.put("/books/:id", (req, res) => {
    const { body: { title, desc, price, cover } } = req || {}
    const bookdId = req.params.id
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?"
    const values = [title, desc, price, cover]
    db.query(q, [...values, bookdId], (err, data) => {
        if (err) {
            res.json(err)
        }
        return res.json("Book has been created")
    })
})

const PORT = 8080
app.listen(PORT, () => {
    console.log("app is running on port" + PORT)
})