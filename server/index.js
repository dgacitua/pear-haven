import express from 'express';
import bodyParser from 'body-parser';
import os from 'os';

import * as database from './utils/database';
import files from './api/files';

const app = express();

app.use(express.static('dist'));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin' , 'http://localhost:3000');
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append("Access-Control-Allow-Headers", "Origin, Accept,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.append('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/file-api', files);

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.listen(8080, () => console.log('Listening on port 8080!'));