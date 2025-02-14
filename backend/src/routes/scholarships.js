import express from 'express';
import { body, validationResult } from 'express-validator';
import { auth, authorize } from '../middleware/auth.js';
import Scholarship from '../models/Scholarship.js';
import Application from '../models/Application.js';

const router = express.Router();

// Get all scholarships
router.get('/', auth, async (req, res) => {
  try {
    const scholarships = await Scholarship.find()
      .sort({ createdAt: -1 });
    res.json(scholarships);
  } catch (error) {
    console.error('Get scholarships error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get scholarship by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id);
    if (!scholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }
    res.json(scholarship);
  } catch (error) {
    console.error('Get scholarship error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create scholarship (admin only)
router.post('/', [
  auth,
  authorize('admin'),
  body('title').trim().notEmpty(),
  body('description').trim().notEmpty(),
  body('amount').isNumeric(),
  body('deadline').isISO8601(),
  body('requirements').isArray(),
  body('eligibility').notEmpty(),
  body('status').isIn(['open', 'closed'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const scholarship = new Scholarship({
      ...req.body,
      createdBy: req.user._id
    });

    await scholarship.save();
    res.status(201).json(scholarship);
  } catch (error) {
    console.error('Create scholarship error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update scholarship (admin only)
router.put('/:id', [
  auth,
  authorize('admin'),
  body('title').optional().trim().notEmpty(),
  body('description').optional().trim().notEmpty(),
  body('amount').optional().isNumeric(),
  body('deadline').optional().isISO8601(),
  body('requirements').optional().isArray(),
  body('eligibility').optional().notEmpty(),
  body('status').optional().isIn(['open', 'closed'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const scholarship = await Scholarship.findById(req.params.id);
    if (!scholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }

    // Update fields
    Object.assign(scholarship, req.body);
    await scholarship.save();

    res.json(scholarship);
  } catch (error) {
    console.error('Update scholarship error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete scholarship (admin only)
router.delete('/:id', [auth, authorize('admin')], async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id);
    if (!scholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }

    // Check if there are any applications
    const applicationCount = await Application.countDocuments({ scholarship: req.params.id });
    if (applicationCount > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete scholarship with existing applications' 
      });
    }

    await scholarship.deleteOne();
    res.json({ message: 'Scholarship deleted successfully' });
  } catch (error) {
    console.error('Delete scholarship error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Apply for scholarship
router.post('/:id/apply', [
  auth,
  authorize('student')
], async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id);
    if (!scholarship || scholarship.status === 'closed') {
      return res.status(404).json({ message: 'Scholarship not found or closed' });
    }

    const existingApplication = await Application.findOne({
      user: req.user._id,
      scholarship: scholarship._id
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'Already applied' });
    }

    const application = new Application({
      user: req.user._id,
      scholarship: scholarship._id,
      documents: req.body.documents || []
    });
    await application.save();
    res.status(201).json(application);
  } catch (error) {
    console.error('Apply scholarship error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;