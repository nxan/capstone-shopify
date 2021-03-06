const express = require('express');
var session = require('express-session');

const db = require('./config/db');

const app = express();

db.authenticate()
  .then(() => console.log('Database connected....'))
  .catch(err => console.log('Error' + err))

app.use(express.json({extended: false}));
app.set('trust proxy', 1)
    app.use(session({
        secret: '123',
        resave: false,
        saveUninitialized: true,
        cookie: { 
            maxAge: 300000,
            secure: false 
        }
    }))

app.get('/', (req, res) => {
    res.send('API running');
});    

app.use('/api/user', require('./routes/api/user.route'));
app.use('/api/auth', require('./routes/api/auth.route'));
app.use('/api/os', require('./routes/api/os.route'));
app.use('/api/device', require('./routes/api/device.route'));
app.use('/api/browser', require('./routes/api/browser.route'));
app.use('/api/session', require('./routes/api/session.route'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
