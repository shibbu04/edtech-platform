import express from 'express';
import { auth, authorize } from '../middleware/auth.js';
import Application from '../models/Application.js';

const router = express.Router();

// Get my applications (student)
router.get('/me', [auth, authorize('student')], async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user._id })
      .populate('scholarship')
      .sort({ submittedAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all applications (admin)
router.get('/', [auth, authorize('admin')], async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('user')
      .populate('scholarship')
      .sort({ submittedAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update application status (admin)
router.patch('/:id', [auth, authorize('admin')], async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status = status;
    await application.save();
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;