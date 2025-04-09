import mongoose from 'mongoose';

const jobApplicationSchema = new mongoose.Schema({
  company: String,
  role: String,
  status: { type: String, enum: ['Applied', 'Interview', 'Offer', 'Rejected'] },
  date: Date,
  link: String
});

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);

export default JobApplication;  
