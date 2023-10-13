import 'dotenv/config';
import Express from 'express';

const app = Express();
app.use(Express.json());

import cors from 'cors';
app.use(cors());

import fileUpload from 'express-fileupload';
app.use(fileUpload());      //middleware for accessing req.files

import routes from './backend/routes/index.js';
app.use('/api', routes);

// --------------------------deployment------------------------------
import path from 'path'
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
    console.log('Serving frontend...')
    app.use(Express.static(path.join(__dirname1, "/frontend/dist")));
    app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname1, "frontend", "dist", "index.html"))
    );
}
else {
    app.get("/", (req, res) =>
        res.send("API is running..")
    );
}
// --------------------------deployment------------------------------


app.use((req, res, next) => {           //page not found middleware
    res.status(404).send('Page not found !!!');
});

app.use((err, req, res, next) => {      //error middleware
    res.status(err.status || 500).send();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started listening on PORT ${PORT}`))