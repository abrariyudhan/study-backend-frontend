const port = 3000;
const express =  require('express');
const app = express();
const router = require('./routes');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`App running on port http://localhost:${port}`);
});


module.exports = app;