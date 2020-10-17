/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const expect = require('chai').expect;
const MongoClient = require('mongodb');
const ObjectId = require('mongodb').ObjectID;
const IssueModel = require('../models/issue').IssueModel;

const mongoose = require('mongoose');
const connection = mongoose.connect(process.env.DB, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
});

mongoose.set('useCreateIndex', true);

const updatable_fields = [
  "issue_title",
  "issue_text",
  "created_by",
  "assigned_to",
  "status_text",
  "open"
]

const field_list = updatable_fields.concat([
  "_id",
  "created_on",
  "updated_on"
]);

module.exports = function (app) {

 app.route('/api/issues/:project')

    .get(function (req, res){
      var project = req.params.project;

      // Build Query
      let query = { project: project };  // We always filter by project
      field_list.forEach(field => {
        if(req.query.hasOwnProperty(field)) {
          query[field] = req.query[field];
        }
      })

      IssueModel.find(query, (err, docs) => {
        return res.json(docs);
      })
    })

    .post(function (req, res){
      let project = req.params.project;

      // check required fields
      let missing_fields = ['issue_title', 'issue_text', 'created_by']
        .filter( field => !req.body.hasOwnProperty(field))
        .join(',');

      if(missing_fields) {
        return res.send({ error: 'required field(s) missing' });
      }

      // Otherwise, create the object
      let issue = new IssueModel({
        project: project,
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text,
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to  || '',
        status_text: req.body.status_text || ''
      });

      issue.save(function(err, result) {
        if(err) { console.log(err) }
        res.json(result.toJSON());
      })

    })

    .put(function (req, res){
      let project = req.params.project;
      let id = req.body._id;

      // No id passed
      if(!id) {
        return res.json({ error: 'missing _id' })
      }

      // Build update object
      let update = {};
      let count = 0;
      updatable_fields.forEach(field => {
        if(req.body.hasOwnProperty(field)) {
          update[field] = req.body[field];
          count++;
        }
      })

      if(!count) {
        return res.json({ error: 'no update field(s) sent', '_id': id })
      }

      IssueModel.updateOne({ project, _id: id }, update, (err, result) => {
        if(err) console.log(err);

        // id not found
        if(result.nModified === 0 || result.n === 0) {
          return res.json({ error: 'could not update', '_id': id });
        }

        // Success!
        res.json({ result: 'successfully updated', '_id': id })
      });
    })

    .delete(function (req, res){
      let project = req.params.project;
      let id = req.body._id;

      // No id passed
      if(!id) {
        return res.json({ error: 'missing _id' });
      }

      IssueModel.deleteOne({ project, '_id': id })
        .then(result => {
          if(result.deletedCount === 1) {
            return res.json({ result: 'successfully deleted', '_id': id });
          } else {
            return res.json({ error: 'could not delete', '_id': id });
          }
        });
    });
    
};
