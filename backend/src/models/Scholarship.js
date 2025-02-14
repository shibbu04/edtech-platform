import mongoose from 'mongoose';

const scholarshipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  deadline: {
    type: Date,
    required: true
  },
  requirements: [{
    type: String,
    trim: true
  }],
  eligibility: {
    type: String,
    required: true,
    enum: ['undergraduate', 'graduate', 'highschool', 'all']
  },
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open'
  },
  imageUrl: {
    type: String,
    trim: true
  },
  link: {
    type: String,
    trim: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Scholarship', scholarshipSchema);