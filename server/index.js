const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

/* Routes */
const transactionsRouter = require('./routes/transactions.route');


app.use('/api/transactions', transactionsRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});