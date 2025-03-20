import mysql from 'mysql';

// Create MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'MPP',
  connectionLimit: 10, // Adjust according to your application's needs
});

export default pool;