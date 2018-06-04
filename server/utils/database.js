import mongoose from 'mongoose';
import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';

import * as constants from '../constants';

export let db;
export let storage;
export let upload;

mongoose.connect(constants.mongoUrl).then(instance => {
  db = instance.connection.db;
  
  storage = new GridFsStorage({
    db: db,
    root: 'files', // Root collection name
    filename: (req, file, cb) => {
      let date = Date.now();
      // The way you want to store your file in database
      cb(null, file.fieldname + '-' + date + '.'); 
    },
      
    // Additional Meta-data that you want to store
    metadata: function(req, file, cb) {
      cb(null, { originalname: file.originalname });
    }
  });
  
  upload = new multer({ storage: storage }).single('file');
});