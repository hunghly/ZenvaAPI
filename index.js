import express from 'express';
import parser from 'body-parser';
import routes from './routes.js';


const app = new express();


app.use(parser.urlencoded({
    extended: false
}))

app.use(routes);




console.log("here");
console.log(process.env.PORT);
app.listen(process.env.PORT || 3000);