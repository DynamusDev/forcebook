

const db = require('@models/database.js');


const users = {
    /** Returns an array of users */
    async getAll(){
        const result = await db.query('SELECT id, name, email FROM users');
        return result;
    },
    /** Returns a user by its id */
    async getById(id){
        const result = await db.query('SELECT id, name, email FROM users WHERE id = ?', [id]);
        return result[0];
    },
    /** Adds a new user to database and returns it */
    async create(name, email){
        const { insertId } = await db.query('INSERT INTO users(id, name, email) VALUES(0, ?, ?)', [name, email]);
        return (await db.query('SELECT id, name, email FROM users WHERE id = ?', [insertId]))[0];
    },
    /** Update an existing user and returns it */
    async update(id, name, email){
        await db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
        return (await db.query('SELECT id, name, email FROM users WHERE id = ?', [id]))[0];
    },
    /** Deletes an existing user */
    async delete(id){
        const result = await db.query('DELETE FROM users WHERE id = ?', [id]);
        return result;
    }
}


module.exports = users;