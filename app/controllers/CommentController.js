const pool = require('../database/index');

const getComments = (request, response) => {
    pool.query('SELECT * FROM comments ORDER BY id', (error, results) => {
        if (error) { response.status(422).json({ error : error }) }
        response.status(200).json(results.rows)
    })
};

const getComment = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM comments WHERE id = $1', [id], (error, results) => {
        if (error) { response.status(422).json({ error : error }) }
        response.status(200).json(results.rows)
    })
};

const createComment = (request, response) => {
    const body = request.body.body;
    const post_id = request.body.post_id;
    const prev_id = request.body.prev_id || null;

    pool.query(
        'INSERT INTO comments (body, post_id, prev_id) VALUES ($1, $2, $3)',
        [body, post_id, prev_id],
        (error, results) => {
            if (error) { response.status(422).json({ error : error }) }
            response.status(201).send(`Comment is created!`)
        })
};

const updateComment = (request, response) => {
    const id = parseInt(request.params.id);
    const body = request.body.body;

    pool.query(
        'UPDATE comments SET body = $1 WHERE id = $2',
        [body, id],
        (error, results) => {
            if (error) { response.status(422).json({ error : error }) }
            response.status(200).send(`Comment is modified with ID: ${id}`)
        }
    )
};

const deleteComment = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM comments WHERE id = $1', [id], (error, results) => {
        if (error) { response.status(422).json({ error : error }) }
        response.status(200).send(`Comment is deleted with ID: ${id}`)
    })
};

module.exports = {
    getComments,
    getComment,
    createComment,
    updateComment,
    deleteComment
};