const pool = require('../database/index');

const getCategories = (request, response) => {
    pool.query('SELECT * FROM categories ORDER BY id', (error, results) => {
        if (error) { response.status(422).json({ error : error }) }
        response.status(200).json(results.rows)
    })
};

const getCategory = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM categories WHERE id = $1', [id], (error, results) => {
        if (error) { response.status(422).json({ error : error }) }
        response.status(200).json(results.rows)
    })
};

const createCategory = (request, response) => {
    const name = request.body.name;

    pool.query('INSERT INTO categories (name) VALUES ($1) ON CONFLICT(name) DO NOTHING', [name], (error, results) => {
        if (error) { response.status(422).json({ error : error }) }
        response.status(201).send(`Category is created!`)
    })
};

const updateCategory = (request, response) => {
    const id = parseInt(request.params.id);
    const name = request.body.name;

    pool.query(
        'UPDATE categories SET name = $1 WHERE id = $2',
        [name, id],
        (error, results) => {
            if (error) { response.status(422).json({ error : error }) }
            response.status(200).send(`Category is modified with ID: ${id}`)
        }
    )
};

const deleteCategory = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM categories WHERE id = $1', [id], (error, results) => {
        if (error) { response.status(422).json({ error : error }) }
        response.status(200).send(`Category is deleted with ID: ${id}`)
    })
};

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
};