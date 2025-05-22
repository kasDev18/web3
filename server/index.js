const connectToMongoDB = require('./db/connections.js');
const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

/* Routes */
const userETHRouter = require('./routes/ethereum.route.js');




// app.use('/api/transactions', transactionsRouter);
app.use('/api', userETHRouter);

app.listen(PORT, () => {
    connectToMongoDB(); /* Connect to MongoDB */
    console.log(`Server is listening on PORT ${PORT}`);
});