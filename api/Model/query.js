const conn = require('../config/db_connection');

// Function to execute a query and return results as a Promise
function executeQuery(query, params = []) {
    return new Promise((resolve, reject) => {
        conn.query(query, params, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        }
        );
    });
}

module.exports = { executeQuery };