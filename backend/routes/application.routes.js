import express from 'express';
import {
  getJobApplications,
  addJobApplication,
  updateJobStatus,
  deleteJobApplication
} from '../controller/application.controller.js';

const router = express.Router();

// Get all job applications
router.get('/', getJobApplications);

// Add a new job application
router.post('/', addJobApplication);

// Update job application status
router.patch('/:id', updateJobStatus);

// Delete a job application
router.delete('/:id', deleteJobApplication);

export default router;
