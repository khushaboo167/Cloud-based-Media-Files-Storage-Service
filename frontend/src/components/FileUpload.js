import React, { useState } from 'react';
import axios from 'axios';
import { Button, Typography, Box, Paper, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    try {
      await axios.post('http://localhost:5000/api/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('File uploaded successfully');
      window.location.reload(); // Refresh to show new file
    } catch (err) {
      alert('Upload failed');
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Paper sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Upload File
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <input
              accept="*/*"
              style={{ display: 'none' }}
              id="file-upload"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
            <label htmlFor="file-upload">
              <Button variant="outlined" component="span" startIcon={<CloudUploadIcon />}>
                Choose File
              </Button>
            </label>
            {file && (
              <Typography sx={{ ml: 2 }}>
                {file.name}
              </Typography>
            )}
          </Box>
          <Button type="submit" fullWidth variant="contained" disabled={!file}>
            Upload
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default FileUpload;