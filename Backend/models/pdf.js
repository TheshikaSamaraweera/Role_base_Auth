const mongoose = require('mongoose');
const joi = require('joi');
const Schema= mongoose.Schema;

const pdfSchema = new mongoose.Schema({
  pdfname: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },

});

module.exports=mongoose.model(
    'pdfDetails',
    pdfSchema)