import express from 'express';

import { body} from 'express-validator';

const usersController = require('../controllers/users');

const auth = require('../middleware/auth');

const router = express.Router();
router.get('/', auth, usersController.fetchAll);
router.get('/:id', auth, usersController.fetchById);
module.exports = router;



