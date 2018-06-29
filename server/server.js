require('dotenv').config();

const   express = require('express')
        , bodyParser = require('body-parser')
        , massive = require('massive')
        , faker = require('faker')
        , session = require('express-session')
        , ctrl = require('./controller');

const { CONNECTION_STRING, PORT, SESSION_SECRET } = process.env; 

const app = express();

app.use(bodyParser.json());

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

massive(CONNECTION_STRING)
    .then( db => {
        app.set('db', db)
        console.log('DB Connected')
    })
    .catch( err => console.log(err));

app.route('/api/products')
    .get(ctrl.getAllProducts)
    .post(ctrl.addProduct)

app.route('/api/products/:id')
    .put(ctrl.updateProduct)
    .delete(ctrl.deleteProduct)

// app.get('/api/products', ctrl.getAllProducts)

// app.post('/api/products/', ctrl.addProduct)

// app.put('/api/products/:id', ctrl.updateProduct)

// app.delete('/api/products/:id', ctrl.deleteProduct)

app.listen( PORT || 3010, () => console.log(`Hard to port ${PORT || 3010}`));
