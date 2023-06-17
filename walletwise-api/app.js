const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require("openai");

const axios = require('axios');

const configuration = new Configuration({
    apiKey: "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",
});

app.use(bodyParser.json());
app.use(express.json());

// mongoose init
mongoose.connect('mongodb+srv://ovladaettt:Ghjcnjq8@cluster0.dntuddk.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');

} );
const Schema = mongoose.Schema;


const dataSchema = new Schema({
    user: String,
    name: String,
    amount: Number,
    category: String,
    date: Date,
    notes: String,
} );

const Data = mongoose.model('Data', dataSchema);


app.post('/api/add', (req, res) => {
    const data = new Data(req.body);
    data.save()
        .then(data => {
            res.status(200).json({'data': 'data added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new data failed');
        });
} );

// get expenses without callback
app.get('/api/data', (req, res) => {
    Data.find()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Ошибка сервера' });
        });
});

// register username, email, password, register date, last activity date
const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    registerDate: Date,
    lastActivityDate: Date,
} );


const User = mongoose.model('User', userSchema);

app.post('/api/register', (req, res) => {
    const user = new User(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'user': 'user added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new user failed');
        });

} );

// login
app.post('/api/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Проверяем логин и пароль в базе данных или в другом источнике данных
    // В этом примере предполагается использование модели User

    User.findOne({ username: username, password: password })
        .then(user => {
            if (user) {
                res.status(200).json({ 'user': 'user found successfully' });
            } else {
                res.status(401).json({ 'error': 'Invalid username or password' });
            }
        })
        .catch(err => {
            res.status(400).json({ 'error': 'Error occurred while finding user' });
        });
});


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});