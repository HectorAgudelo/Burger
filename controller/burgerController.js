const express = require("express");
const router = express.Router();
const burger = require("../models/burgers.js");

// Create all our routes and set up logic within those routes where required.

// GET route for getting all the burgers
router.get("/", (req, res) => {
  burger.all((err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    const hbsObject = {
      burgers: data,
    };
    res.render("index", hbsObject);
  });
});

// POST route for saving a new burger
router.post("/api/burgers", (req, res) => {
  burger.create(
    ["name", "devoured"],
    [req.body.name, req.body.devoured],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      // Send back the ID of the new burger
      res.json({ id: result.insertId });
    }
  );
});

// PUT route for updating a burger's status
router.put("/api/burgers/:id", (req, res) => {
  const condition = `id = ${req.params.id}`;
  burger.update(
    {
      devoured: req.body.devoured,
    },
    condition,
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

// DELETE route for deleting a burger
router.delete("/api/burgers/:id", (req, res) => {
  const condition = `id = ${req.params.id}`;
  burger.delete(condition, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (result.affectedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();
  });
});

// Export routes for server.js to use.
module.exports = router;
