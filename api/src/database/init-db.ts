import * as mysql from 'mysql2/promise';
import * as fs from 'fs';
import * as path from 'path';

async function initializeDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
    });

    // Create database if it doesn't exist
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${
        process.env.DB_DATABASE || 'iot_factory_management'
      }`,
    );

    // Use the database
    await connection.query(
      `USE ${process.env.DB_DATABASE || 'iot_factory_management'}`,
    );

    // Read and execute the SQL file
    const sqlFile = path.join(__dirname, '../../../db.sql');
    const sql = fs.readFileSync(sqlFile, 'utf8');
    const statements = sql.split(';').filter(stmt => stmt.trim());

    for (const statement of statements) {
      if (statement.trim()) {
        await connection.query(statement);
      }
    }

    console.log('Database initialized successfully');
    await connection.end();
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initializeDatabase();