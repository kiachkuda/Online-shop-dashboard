const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { executeQuery } = require('./Model/query');

let version = 1;

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());


app.use(cors());

// Import routes
const productRoutes = require('./Routes/products.route');
const userRoutes = require('./Routes/user.route');
const authRoutes = require('./Routes/auth.route')

// Use routes
app.use(`/api/v1/products`, productRoutes);
app.use(`/api/v1/users`, userRoutes);
app.use(`/api/v1/auth`, authRoutes)


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



