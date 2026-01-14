const express = require('express');
const router = express.Router();

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'admin123') {
    req.session.user = username;
    return res.redirect('/dashboard');
  }

  res.send('Invalid login details');
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
