import express from 'express';
import cors from 'cors';

import db from './db';
db.connect(); 

import path from "path";
const app = express();

// Parses the text as JSON and exposes the resulting
// object on req.body.
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
	app.use(cors());
}

if (process.env.NODE_ENV === "production") {
     const __dirname = path.resolve();
     app.use(express.static(path.join(__dirname, "../frontend", "build")));
     app.get("/*", function (req, res) {
       res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
     });
}

import routes from './routes';
app.use('/', routes);
console.log(">>>> routes:", routes)
const port = process.env.PORT || 4000;
app.listen(port, () =>
     console.log(`Example app listening on port ${port}!`),
);