//DECLARATIONS
const cors = require('cors');
const express = require('express');
const app = express();
const router = require('./router');
const helmet = require('helmet');

require('./database/db.connection');


//middlewears
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//MAIN ROUTE
app.use('/', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("SERVER IS LISTEN ON PORT:" , PORT);
});