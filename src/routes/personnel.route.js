const express = require('express')
const router = express.Router()
const db = require('../db')

router.use(express.urlencoded({ extended: false }));
router.get('/liste', async function (req, res) {
  try {
    const [liste] = await db.query("SELECT * FROM personnel")
    res.render('personnel/liste', { personnel: liste })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/add', function (req, res) {
  res.render('personnel/add')
})

router.get('/effacer/:id', async function (req, res) {
  try {
    const { id } = req.params
    const query = await db.query("DELETE FROM personnel WHERE id =?", [id])
    res.redirect('/liste')
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


router.get('/modifier/:id', async function (req, res) {
  try {
    const { id } = req.params
    const [personnel] = await db.query("SELECT * FROM personnel WHERE id =?", [id])
    res.render(`personnel/modifier`, { personnel: personnel })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/modifier/:id', async function (req, res) {
  try {
    const { id, firstname, lastname, birthday } = req.body
    const query = await db.query("UPDATE personnel SET firstname =?, lastname =?, age =? WHERE id =?", [firstname, lastname, birthday, id])
    res.redirect('/liste')
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/add', async function (req, res) {
  try {
    const { firstname, lastname, birthday } = req.body
    const query = await db.query("INSERT INTO personnel (firstname, lastname, age) VALUES (?, ?, ?)", [firstname, lastname, birthday])
    res.redirect('/liste')
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router