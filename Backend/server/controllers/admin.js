const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')

//Model
const { Admins } = require('../models/admin')

var imagepath = 'tmp/my-uploads/'
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'tmp/my-uploads/')
  },
  filename: function (req, file, cb) {
    var extension = file.originalname.substr(file.originalname.lastIndexOf('.'))
    cb(null, file.fieldname + '-' + Date.now() + extension)
  }
})

var upload = multer({ storage: storage })

// Insert
router.post('/insert', upload.single('image'), function (req, res) {
  try {
    var img = req.file.filename
    var date = Date.now()
    var myobj = {
      name: req.body.name,
      brand: req.body.brand,
      image: img,
      price: req.body.price,
      descr: req.body.descr,
      color: req.body.color,
      featured: req.body.featured,
      date: date
    }
    const admin = new Admins(myobj)
    admin.save()
    res.status(201).send("1 document inserted")
  } catch (error) {
    // res.status(400).send('Error')
    console.log(error)
  }
})

// Find One
router.get('/findOne/:id', async function (req, res) {
  try {
    const id = req.params.id
    var filter = {
      _id: id
    }
    const admins = await Admins.findOne(filter)
    res.send(admins)
  } catch (error) {
    res.status(400).send('Error')
  }
})

// Find All
router.get('/findAll', async function (req, res) {
  try {
    const admins = await Admins.find({})
    const adminData = []
    if (admins) {
      for (var index in admins) {
        adminData.push({
          _id: admins[index]._id,
          name: admins[index].name,
          brand: admins[index].brand,
          image: 'http://localhost:3000/img/' + admins[index].image,
          price: admins[index].price,
          descr: admins[index].descr,
          color: admins[index].color,
          featured: admins[index].featured,
          date: admins[index].date
        })
      }
    }
    res.send(adminData)
  } catch (error) {
    res.status(400).send('Error')
  }
})

// Find All + Filter
router.get('/findAllFilter', async function (req, res) {
  try {
    var filter = {
      name: req.body.name
    }
    const admins = await Admins.find(filter)
    res.send(admins)
  } catch (error) {
    res.status(400).send('Error')
  }
})

// Delete One
router.delete('/deleteOne/:id', async function (req, res) {
  try {
    var myquery = {
      _id: req.params.id
    }

    var admins = await Admins.findOne(myquery)
    if (admins) {
      //Hapus Image
      fs.unlink(imagepath + admins.image, (err) => {
        if (err) throw err;
        console.log('path/file.txt was deleted');
      });
    }

    await Admins.deleteOne(myquery)
    res.send("1 document deleted")
  } catch (error) {
    res.status(400).send('Error')
    console.log(error)
  }
})

// Delete Many
router.delete('/deleteMany', async function (req, res) {
  try {
    var myquery = {
      address: "Highway 37 2"
    }
    var result = await Admins.deleteMany(myquery)
    res.send(result.n + " document(s) deleted")
  } catch (error) {
    res.status(400).send('Error')
  }
})

// Update One
router.patch('/updateOne/:id', upload.single('image'), async function (req, res) {
  try {
    var myquery = {
      _id: req.params.id
    }
    var image = req.file.filename

    var newvalues = {
      $set: {
        name: req.body.name,
        brand: req.body.brand,
        image: image,
        price: req.body.price,
        descr: req.body.descr,
        color: req.body.color,
        featured: req.body.featured,
        date: date
      }
    }

    var admins = await Admins.findOne(myquery)
    if (admins) {
      //Hapus Image
      fs.unlink(imagepath + admin.image, (err) => {
        if (err) throw err;
        console.log('path/file.txt was deleted');
      });
    }

    await Admins.updateOne(myquery, newvalues)
    res.send("1 document updated")
  } catch (error) {
    res.status(400).send('Error')
  }
})

// Update Many
router.put('/updateMany', async function (req, res) {
  try {
    var myquery = {
      descr: "Short of attaching rocket launchers to the bottoms of these kicks, we've poured every ounce of our performance-boosting know-how into these men's training shoes. The upper wraps to feet, and the tech-loaded midsole is where these shoes really take flight, offering support, superior cushioning and maximum energy return. Added ProFoam boosts rebound, while the internal midfoot shank stabilises each step. The rubber outsole ensures split-second traction and grip, and PUMA branding elements on the upper vamp, tongue and back lateral side embellish the overall design."
    }
    var newvalues = {
      $set: {
        descr: "This shoes are for sale."
      }
    }
    var result = await Admins.updateMany(myquery, newvalues)
    res.send(result.nModified + " document(s) updated")
  } catch (error) {
    res.status(400).send('Error')
  }
})

module.exports = router