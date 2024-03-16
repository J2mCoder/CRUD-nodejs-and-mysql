const express = require('express')
const path = require('path')
const { engine } = require('express-handlebars')
const morgan = require('morgan')
const route = require('./routes/personnel.route')

const app = express()

app.set('port', (process.env.PORT || 5000))

const pathDirectoryViews = path.join(__dirname, './views')
const pathDirectoryPublic = path.join(__dirname, './public')

app.engine('hbs', engine({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, './views/layouts'),
  partialsDir: path.join(__dirname, './views/partials')
}))
app.set('views', pathDirectoryViews)
app.set('view engine', 'hbs')
app.use(express.static(pathDirectoryPublic))

app.use(route)
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res) => {
  res.render('index')
})

app.get('*', (req, res) => {
  res.render('error')
})
const port = app.get('port')
app.listen(port, () => {
  console.log('Example app listening on port 3000!')
})