const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    input: {
      type: String,
    },
    language: {
      type: String,
      required: true,
      // enum: ['cpp', 'c', 'java', 'javascript', 'python'],
    },
    uuid: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Code = mongoose.models.Code || mongoose.model('Code', codeSchema);
export default Code;
