import express from 'express';

import bodyParser from  'body-parser';

const authRoutes = require('./routes/auth');

const usersRoutes = require('./routes/users');
const errorController = require('./controllers/error');

const app = express();

const ports = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((req: any, res: any, next:any) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Accept, X-Custom-Header, Authorization'
    );
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});

app.use('/auth', authRoutes);

app.use('/user', usersRoutes);

app.use(errorController.get404);

app.use(errorController.get500);

app.listen(ports, () => console.log(`Listening on port ${ports}`));
