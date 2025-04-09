import JobApplication from '../models/jobApplication.js'

// Get all job applications
export const getJobApplications = async (req, res) => {
  try {
    const jobApplications = await JobApplication.find();
    res.json(jobApplications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a job application
export const addJobApplication = async (req, res) => {
  const { company, role, status, date, link } = req.body;

  const jobApplication = new JobApplication({
    company,
    role,
    status,
    date,
    link
  });

  try {
    const newJobApplication = await jobApplication.save();
    res.status(201).json(newJobApplication);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update job application status
export const updateJobStatus = async (req, res) => {
  try {
    const updatedJobApplication = await JobApplication.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updatedJobApplication);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a job application
export const deleteJobApplication = async (req, res) => {
  try {
    await JobApplication.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job application deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
