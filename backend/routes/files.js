const express = require('express');
const File = require('../models/File');
const auth = require('../middleware/auth');
const { upload } = require('../config/s3');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Upload file
router.post('/upload', auth, upload.single('file'), async (req, res) => {
  try {
    const file = new File({
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      url: path.join(__dirname, '../uploads/', req.file.filename),
      user: req.user,
    });
    await file.save();
    res.json(file);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's files
router.get('/', auth, async (req, res) => {
  try {
    const files = await File.find({ user: req.user });
    res.json(files);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Download file
router.get('/download/:id', auth, async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file || file.user.toString() !== req.user) {
      return res.status(404).json({ message: 'File not found' });
    }
    res.sendFile(file.url);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete file
router.delete('/:id', auth, async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file || file.user.toString() !== req.user) {
      return res.status(404).json({ message: 'File not found' });
    }
    // Delete local file
    fs.unlink(file.url, (err) => {
      if (err) console.log(err);
    });
    await File.findByIdAndDelete(req.params.id);
    res.json({ message: 'File deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;