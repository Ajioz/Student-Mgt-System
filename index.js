require('./models/db')

const express = require('express');
const path = require('path');
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
// const bodyParser = require('body-parser');
const studentController = require('./controllers/studentController');
const app = express();


// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json());

app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); //Parse URL-encoded bodies

app.get('/', (req, res) => {
    res.send(
        `<h2>Welcome to Student Database!</h2>
        <h3>Click here to get access to the <b><a href="/api/student/list">Database</a></h3>`
    );
});

app.set('views', path.join(__dirname, '/views/'))

app.engine('hbs', exphbs({ 
    handlebars: allowInsecurePrototypeAccess(handlebars),
    extname: 'hbs',
    defaultLayout: 'mainLayout',
    layoutsDir: __dirname + '/views/layouts',
}));

app.set("view engine", "hbs");

app.use('/api/student', studentController);


const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server listening to port ${port}...`));

