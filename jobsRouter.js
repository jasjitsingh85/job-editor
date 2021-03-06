'use strict';

const bodyParser = require('body-parser');
const express = require('express');
// var JSSoup = require('jssoup').default
// var https = require("https");

const router = express.Router();

const jsonParser = bodyParser.json();

const {Job} = require('./models');

const { getJobsFromIndeed , getJobFromIndeed } = require('./jobUtils.js');

// router.get('/', (req, res) => {
//   Job.find()
//   .limit(10)
//   .then(jobs => {
//     res.json({
//       jobs: jobs.map (
//         job => job.serialize())
//       });
//     });
// });

router.get('/', (req, res) => {

  let queryOptions = {
    query: req.query.query,
    city: 'Seattle, WA',
    radius: '25',
    level: 'entry_level',
    jobType: 'fulltime',
    maxAge: '7',
    sort: 'date',
    limit: '10'
  };

  getJobsFromIndeed(queryOptions).then(jobs => {
    res.json({
      jobs: jobs.map (
        job => job.serialize())
      });

      return jobs;
    
    })
});



router.get('/:id', (req, res) => {
  Job.findById(req.params.id, function(err, job) {
    console.log(job.url);
    getJobFromIndeed(job.url)
    .then(function(data) {
      res.status(200).json({ job_description: data })
    });
  });
  // BlogPost.findById(req.params.id)
  // .then(blogpost => res.json(blogpost.serialize()))
  // .catch(err =>  {
  //   console.error(err)
  //   res.status(500).json({ message: 'Internal server error' })
  // })

  // .then(function(data) {

  //   });

});

// router.post('/', (req, res) => {
//   // ensure `name` and `budget` are in request body
//   const requiredFields = ['title', 'content', 'author'];
//   console.log(req.body);
//   for (let i=0; i<requiredFields.length; i++) {
//     const field = requiredFields[i];
//     if (!(field in req.body)) {
//       const message = `Missing \`${field}\` in request body`
//       console.error(message);
//       return res.status(400).send(message);
//     }
//   }
//   let authorFirstName = req.body.author.split(" ")[0];
//   let authorLastName = req.body.author.split(" ")[1];
//   BlogPost.create({
//     title: req.body.title, 
//     content: req.body.content, 
//     author: {firstName: authorFirstName, lastName: authorLastName},
//   })
//   .then(blogpost => res.status(201).json(blogpost.serialize()))
//   .catch(err => {
//     console.error(err);
//     res.status(500).json({ message: 'Internal server error' });
//   })
// });

// router.put('/:id', (req, res) => {
//   if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
//     const message = (
//       `Request path id (${req.params.id}) and request body id ` +
//       `(${req.body.id}) must match`);
//     console.error(message);
//     return res.status(400).json({ message: message });
//   }

//   const toUpdate = {};
//   const updateableFields = ['title', 'content', 'author'];

//   updateableFields.forEach(field => {
//     if (field in req.body) {
//       toUpdate[field] = req.body[field];
//     }

//   BlogPost
//     // all key/value pairs in toUpdate will be updated -- that's what `$set` does
//     .findByIdAndUpdate(req.params.id, { $set: toUpdate })
//     .then(restaurant => res.status(204).end())
//     .catch(err => res.status(500).json({ message: 'Internal server error' }));
//   });
// })

// router.delete('/:id', (req, res) => {
//     BlogPost
//     .findByIdAndRemove(req.params.id)
//     .then(restaurant => res.status(204).end())
//     .catch(err => res.status(500).json({ message: 'Internal server error' }));
// });

module.exports = router;