import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Grid, IconButton, Box } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';

const FileList = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/files');
        setFiles(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFiles();
  }, []);

  const handleDownload = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/files/download/${id}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file'); // You can set a proper filename
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      alert('Download failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/files/${id}`);
      setFiles(files.filter(file => file._id !== id));
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Your Files
      </Typography>
      <Grid container spacing={3}>
        {files.map(file => (
          <Grid item xs={12} sm={6} md={4} key={file._id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div" gutterBottom>
                  {file.originalName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Size: {(file.size / 1024 / 1024).toFixed(2)} MB
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Uploaded: {new Date(file.uploadDate).toLocaleDateString()}
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                <IconButton color="primary" onClick={() => handleDownload(file._id)}>
                  <DownloadIcon />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(file._id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FileList;