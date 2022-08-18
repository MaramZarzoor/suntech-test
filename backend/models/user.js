const db = require('../util/database');

module.exports = class User {
    constructor(firstName, lastName, email, address, contactNumber, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.address = address;
        this.contactNumber = contactNumber;
        this.password = password;
    }

    static find(email) {
        return db.execute('SELECT * FROM users WHERE email = ?', [email]);
    }
    static fetchById(id) {
        return db.execute('SELECT * FROM users WHERE id = ?', [id]);
    }
    static fetchAll() {
        return db.execute('SELECT * FROM users');
    }
    static save(user) {
        return db.execute(
            'INSERT INTO users (firstName, lastName, email, address, contactNumber, password) VALUES (?, ?, ?, ?, ?, ?)',
            [user.firstName, user.lastName, user.email, user.address, user.contactNumber, user.password]
        );
    }

};
