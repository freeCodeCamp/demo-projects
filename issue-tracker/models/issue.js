const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
  project: { type: String, required: true, index: true },
  issue_title: { type: String, required: true },
  issue_text: { type: String, required: true },
  created_by: { type: String, required: true },
  assigned_to: { type: String, default: "" },
  status_text: { type: String, default: "" },
  open: {type: Boolean, default: true }

}, {
  timestamps: {
    createdAt: 'created_on',
    updatedAt: 'updated_on'
  }
});

// Hide project and __v fields from JSON
// Ref: https://stackoverflow.com/a/17063594/1420506
IssueSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    delete ret.project;
    delete ret.__v;
    return ret;
  }
});

const IssueModel = mongoose.model('Issue', IssueSchema);

exports.IssueModel = IssueModel;