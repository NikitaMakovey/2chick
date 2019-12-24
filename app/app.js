const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const categoryRoutes = require('../api/routes/categories');
const postRoutes = require('../api/routes/posts');
const commentRoutes = require('../api/routes/comments');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use((request, response, next) => {
    response.header(
        'Access-Control-Allow-Origin',
        '*'
    );
    response.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (request.method === 'OPTIONS') {
        response.header(
            'Access-Control-Allow-Methods',
            'PUT, POST, PATCH, DELETE, GET'
        );
        return response.status(200).json({});
    }
    next();
});

app.use('/api/ch/categories', categoryRoutes);
app.use('/api/ch/posts', postRoutes);
app.use('/api/ch/comments', commentRoutes);

/*app.use((request, response, next) => {
    const error = new Error('Not found.');
    error.status = 404;
    next(error);
});

app.use((error, request, response, next) => {
    response.status(error.status || 500).json({
        error : {
            message : error.message
        }
    });
});*/

module.exports = app;