//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const app = express();
const db = mongoose.connection;
require('dotenv').config();
const Kicks = require('./models/kicks.js');
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI) //, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   // useFindAndModify: false
// });

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({
  extended: false
})); // extended: false - does not allow nested objects in query strings
app.use(express.json()); // returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method')); // allow POST, PUT and DELETE from a form


//___________________
// Routes
//___________________
//localhost:3000

//////NEW/////////
app.get('/kicks/new', (req, res) => {
  res.render('new.ejs');
});


//////////Create//////////
app.post('/kicks/', (req, res) => {
  if (req.body.purchased === 'on') {
    req.body.purchased = true;
  } else {
    req.body.purchased = false;
  }
  console.log(req.body);
  Kicks.create(req.body, (error, createdKicks) => {
    res.redirect('/kicks');
  });
});

/////Index/////////
app.get('/kicks', (req, res) => {
  Kicks.find({}, (error, allKicks) => {
    res.render('index.ejs', {
      kicks: allKicks
    });
  });
});

//////Show////////
app.get('/kicks/:id', (req, res) => {
  Kicks.findById(req.params.id, (err, foundKicks) => {
    res.render('show.ejs', {
      kicks: foundKicks
    });
  });
});


///////ShowTimeline/////////
app.get('/kicks/timeline', (req, res) => {
  Kicks.find({}, (err, publicKicks) => {
    res.render('public.ejs', {
      kicks: publicKicks
    });
  });
});


///////Delete/////
app.delete('/kicks/:id', (req, res) => {
  Kicks.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/kicks');
  });
});

////////EDIT////////
app.get('/kicks/:id/edit', (req, res) => {
  Kicks.findById(req.params.id, (err, foundKicks) => {
    res.render(
      'edit.ejs', {
        kicks: foundKicks
      }
    );
  });
});

app.put('/kicks/:id', (req, res) => {
  if (req.body.puchased === 'on') {
    req.body.purchased = true;
  } else {
    req.body.purchased = false;
  }
  Kicks.findByIdAndUpdate(req.params.id, req.body, (err, updatedModel) => {
    res.redirect('/kicks');
  });
});





//___________________
//Listener
//___________________
app.listen(PORT, () => console.log('Listening on port:', PORT));