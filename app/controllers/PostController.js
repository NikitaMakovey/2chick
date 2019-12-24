const pool = require('../database/index');

const getPosts = (request, response) => {
    pool.query('SELECT * FROM posts ORDER BY id', (error, results) => {
        if (error) { response.status(422).json({ error : error }) }
        response.status(200).json(results.rows)
    })
};

const getPost = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM posts WHERE id = $1', [id], (error, results) => {
        if (error) { response.status(422).json({ error : error }) }
        response.status(200).json(results.rows)
    })
};

const createPost = (request, response) => {
    const body = request.body.body;
    const image = request.body.image || null;
    const category_id = request.body.category_id;

    pool.query(
        'INSERT INTO posts (body, image, category_id) VALUES ($1, $2, $3)',
        [body, image, category_id],
        (error, results) => {
        if (error) { response.status(422).json({ error : error }) }
        response.status(201).send(`Post is created!`)
    })
};

const updatePost = (request, response) => {
    const id = parseInt(request.params.id);
    const body = request.body.body;
    const image = request.body.image || null;
    const category_id = request.body.category_id;

    pool.query(
        'UPDATE posts SET body = $1, image = $2, category_id = $3 WHERE id = $4',
        [body, image, category_id, id],
        (error, results) => {
            if (error) { response.status(422).json({ error : error }) }
            response.status(200).send(`Post is modified with ID: ${id}`)
        }
    )
};

const deletePost = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM posts WHERE id = $1', [id], (error, results) => {
        if (error) { response.status(422).json({ error : error }) }
        response.status(200).send(`Post is deleted with ID: ${id}`)
    })
};

const getPostComments = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM comments WHERE post_id = $1', [id], (error, results) => {
        if (error) { response.status(422).json({ error : error }) }
        response.status(200).json(results.rows)
    })
};

module.exports = {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    getPostComments
};