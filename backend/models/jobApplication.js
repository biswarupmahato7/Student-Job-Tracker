import mongoose from 'mongoose';

const jobApplicationSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Applied', 'Interview', 'Offer', 'Rejected'], 
    required: true 
  },
  date: { 
    type: Date, 
    required: true, 
    default: Date.now 
  },
  link: { type: String, required: true }
});

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);

export default JobApplication;
