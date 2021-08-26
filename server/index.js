
import express from 'express'
import path from 'path'
import fileupload from 'express-fileupload'
import mongoose from 'mongoose'
import { url } from './database.js'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(fileupload())
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(db => console.log('db is conect'))
  .catch(err => console.log(err))

app.set('port', process.env.port || 3000)
app.engine('html', require('ejs').renderFile)
app.use('/', express.static(path.join(__dirname, '/public')))
app.use(require(path.join(__dirname, 'Router/index.js')))
app.use('*', (req, res) => {
  res.render(path.join(__dirname, 'public/html/servis/error.html'))
})
app.listen(app.get('port'), () => {
  console.log(`esta corriendo por el puesto ${app.get('port')} `)
})
