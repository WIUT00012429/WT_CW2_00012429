const express = require('express');
const app = express();
const port = 8080;
const bodyParser = require('body-parser');
const routes = require('./routes/articles');
const { getFile } = require('./helpers');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    const data = await getFile();
    res.render('pages/index', { data });
});


app.use("/", routes)


app.listen(port, async () => {
    console.log(`Your app is listening on port ${port}`);
});

