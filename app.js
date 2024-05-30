const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cors = require('cors');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

// Import routes
const foireRoute = require('./routes/foire');
const eventRoute = require('./routes/evenement');
const standRoute = require('./routes/StandRoutes'); // Ensure correct import
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const reservationRoute = require('./routes/reservation');

// Configuration and middleware
require('./configuration/configuration');
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/getimage', express.static('./generator'));

// Initialize Passport
app.use(passport.initialize());
require('./security/passport')(passport);

// Routes
app.use('/api/stands', standRoute); // Ensure correct route definition
app.use('/api/reservation', reservationRoute);
app.use('/foire', foireRoute);
app.use('/event', eventRoute);
app.use('/auth', authRoute);
app.use('/users', userRoute);

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Test route
app.get('/', (req, res) => {
  res.send('Hello World! Flesk consulting');
});

// Start server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
