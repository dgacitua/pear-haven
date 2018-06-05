import express from 'express';
import mongoose from 'mongoose';

import * as database from '../utils/database';

const router = express.Router();

router.post('/upload', (req, res) => {
  database.upload(req, res, (err) => {
    if (err) {
      console.error('Upload Error', err);
      res.json({ statusCode: 1, message: 'Upload Error' });
      return;
    }
    res.json({ statusCode: 0, message: 'Upload Successful', fileUploaded: true });
  });
});

// Route for getting file by filename
router.get('/file/:filename', (req, res) => {
  database.gfs.collection('files'); //set collection name to lookup into

  /** First check if file exists */
  database.gfs.files.find({ filename: req.params.filename }).toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({
        statusCode: 1,
        message: 'File not found'
      });
    }
    // create read stream
    var readstream = database.gfs.createReadStream({
      filename: files[0].filename,
      root: 'files'
    });
    // set the proper content type 
    res.set('Content-Type', files[0].contentType)
    // Return response
    return readstream.pipe(res);
  });
});

// Route for getting all the files
router.get('/files', (req, res) => {
  let filesData = [];
  let count = 0;
  database.gfs.collection('files'); // set the collection to look up into

  database.gfs.files.find({}).toArray((err, files) => {
    // Error checking
    if (err) {
      console.error(err);
      return res.status(404).json({
        statusCode: 1,
        message: 'Query Error'
      });
    }
    // Empty results
    if (!files || files.length === 0) {
      return res.status(404).json({
        statusCode: 1,
        message: 'Files not found'
      });
    }
    // Loop through all the files and fetch the necessary information
    files.forEach((file) => {
      filesData[count++] = {
        originalname: file.metadata.originalname,
        filename: file.filename,
        contentType: file.contentType
      }
    });
    res.json(filesData);
  });
});

export default router;