const express = require('express');
const router = express.Router();
const db = require('../db'); 

// 1. ADD INVENTORY ITEM (Notice we added /api)
router.post('/api/inventory', (req, res) => {
    const { item_name, quantity } = req.body;

    if (!item_name || !quantity) {
        return res.status(400).json({ error: "Item name and quantity are required" });
    }

    const sql = "INSERT INTO inventory (item_name, quantity) VALUES (?, ?)";
    
    db.query(sql, [item_name, quantity], (err, result) => {
        if (err) {
            console.error("Database Insert Error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "Item added", id: result.insertId });
    });
});

// 2. GET INVENTORY LIST (Notice we added /api)
// This prevents it from stealing the URL from your HTML page
router.get('/api/inventory', (req, res) => {
    const sql = "SELECT * FROM inventory ORDER BY created_at DESC";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Database Fetch Error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(results);
    });
});

module.exports = router;