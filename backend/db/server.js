const mysql = require('mysql2/promise');


const pool = mysql.createPool({
  host: '168.119.183.3',      
  user: 'root',   
  password: 'g0tIFJEQsKHm5$34Pxu1', 
  database: '', 
  port: 3306,
});

module.exports = pool;
