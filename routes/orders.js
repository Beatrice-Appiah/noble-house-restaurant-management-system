const express = require('express');
const router = express.Router();
const db = require('../db'); // Imports your MySQL connection

// 1. ADD NEW ORDER (POST /orders)
router.post('/orders', (req, res) => {
    // We explicitly create the variables here based on the frontend payload
    const item = req.body.food_item; 
    const quantity = req.body.quantity;
    const price = req.body.price;

    // Validate input prevents empty rows
    if (!item || !quantity || !price) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = "INSERT INTO orders (item, quantity, price) VALUES (?, ?, ?)";
    
    db.query(sql, [item, quantity, price], (err, result) => {
        if (err) {
            console.error("Database Insert Error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "Order added successfully", id: result.insertId });
    });
});

// 2. GET ALL ORDERS (GET /orders)
router.get('/orders', (req, res) => {
    // Sort by created_at DESC so newest orders appear first
    const sql = "SELECT id, item AS food_item, quantity, price, created_at FROM orders ORDER BY created_at DESC";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Database Fetch Error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(results);
    });
});

module.exports = router;