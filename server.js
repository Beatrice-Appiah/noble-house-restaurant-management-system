const express = require('express');
const session = require('express-session');
const path = require('path');

const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orders');
const inventoryRoutes = require('./routes/inventory');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'noble-secret',
  resave: false,
  saveUninitialized: true
}));

app.use(express.static('public'));

// Routes
app.use(authRoutes);
app.use(orderRoutes);
app.use(inventoryRoutes);

// Pages
app.get('/', (req, res) => res.sendFile(__dirname + '/views/login.html'));

app.get('/dashboard', (req, res) => {
  if (!req.session.user) return res.redirect('/');
  res.sendFile(__dirname + '/views/dashboard.html');
});

app.get('/order', (req, res) => {
  if (!req.session.user) return res.redirect('/');
  res.sendFile(__dirname + '/views/order.html');
});

app.get('/inventory', (req, res) => {
  if (!req.session.user) return res.redirect('/');
  res.sendFile(__dirname + '/views/inventory.html');
});

// Grab the port Railway assigns, or default to 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});