const express = require('express')
const router = express.Router()
const db = require('../db/server')


router.get("/", async (req, res) => {
   try {
    let result = await db.query("SELECT * FROM patients;");
    return res.json(result.rows);
   } catch (error) {
      res.status().json({error : 'error'})
   }
});

/*http//localhost:3000/patients */