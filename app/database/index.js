const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'two_chick',
    password: 'Aa3sdf&&',
    port: 5432,
});

module.exports = pool;