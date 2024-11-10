import express from 'express';
const app = express();

/**
 * @api {get} /users Request a list of users
 * @apiName GetUsers
 * @apiGroup User
 *
 * @apiSuccess {Object[]} users List of users.
 * @apiSuccess {String} users.name Name of the user.
 * @apiSuccess {String} users.email Email of the user.
 */
app.get('/users', (req, res) => {
    // Lógica aquí
    res.json([{ name: 'John Doe', email: 'john@example.com' }]);
  });