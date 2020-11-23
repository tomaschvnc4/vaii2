const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

const port = 3001

app.use(express.json())
app.use(cors())

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

const db = mysql.createConnection({
  user: 'tomas',
  host: 'localhost',
  password: '1noklab1',
  database: 'projekt1',
})

app.post('/create', (req, res) => {
  console.log(req.body)
  const { fullName, userName, plat, pozicia } = req.body
  db.query(
    'INSERT INTO zamestnanci (fullName, userName, plat, pozicia) VALUES (?,?,?,?)',
    [fullName, userName, plat, pozicia],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
        console.log(result)
      }
    }
  )
})

app.get('/zamestnanci', (req, res) => {
  db.query('SELECT * FROM zamestnanci', (err, result) => {
    if (err) {
      console.log(err + ' select')
    } else {
      res.send(result)
    }
  })
})

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id
  db.query('DELETE FROM zamestnanci WHERE id = ?', id, (err, result) => {
    if (err) {
      console.log(err + ' delete')
    } else {
      res.send(result)
    }
  })
})

app.put('/update', (req, res) => {
  const { id, fullName, userName, plat, pozicia } = req.body
  console.log(req.body)
  db.query(
    'UPDATE zamestnanci SET fullName = ?, username = ?, plat=?, pozicia=? WHERE id = ?',
    [fullName, userName, plat, pozicia, id],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
})
