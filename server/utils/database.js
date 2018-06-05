import mongoose from 'mongoose';
import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';
import GridFsStream from 'gridfs';

import * as constants from '../constants';

export let connection;
export let mongo;
export let db;
export let storage;
export let upload;
export let gfs;

mongoose.connect(constants.mongoUrl).then(instance => {
  connection = instance.connection;
  mongo = instance.mongo;
  db = instance.connection.db;
  
  storage = new GridFsStorage({
    db: db,
    file: (req, file) => {
      return {
        bucketName: 'files',
        filename: `${file.fieldname}-${Date.now()}.${file.originalname.split('.')[file.originalname.split('.').length -1]}`,
        metadata: { originalname: file.originalname }
      }
    }
  });
  
  upload = new multer({ storage: storage }).array('files', 10);

  gfs = new GridFsStream(db, mongo);
});