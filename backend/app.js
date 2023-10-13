import 'dotenv/config';
import Express from 'express';

const app = Express();
app.use(Express.json());

import cors from 'cors';
app.use(cors());

import fileUpload from 'express-fileupload';
app.use(fileUpload());      //middleware for accessing req.files

app.get('/', (req, res) => {
    res.status(200).send('API is running ...')
});

import routes from './routes/index.js'; 
app.use('/api', routes);

app.use((req, res, next) => {           //page not found middleware
    res.status(404).send('Page not found !!!');
});

app.use((err, req, res, next) => {      //error middleware
    res.status(err.status || 500).send();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started listening on PORT ${PORT}`))