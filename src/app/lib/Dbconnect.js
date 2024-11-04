import mysql from 'mysql2/promise';

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,       // Database host
  user: process.env.DB_USER,       // Database user
  password: process.env.DB_PASS,   // Database password
  database: process.env.DB_DATBASE,   // Database name
  // Remove the invalid stagingurl configuration
});

// Test the connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to the MySQL database!");
    connection.release();
  } catch (error) {
    console.error("Unable to connect to the MySQL database:", error);
  }
}

testConnection();

export { pool };