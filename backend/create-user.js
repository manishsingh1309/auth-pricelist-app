import bcrypt from 'bcryptjs';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'pricelist_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres'
});

async function createUser(username, password, fullName, location) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await pool.query(
      'INSERT INTO users (username, password, full_name, location) VALUES ($1, $2, $3, $4) RETURNING id, username, full_name, location',
      [username, hashedPassword, fullName, location]
    );
    
    console.log('✅ User created successfully:');
    console.log('ID:', result.rows[0].id);
    console.log('Username:', result.rows[0].username);
    console.log('Full Name:', result.rows[0].full_name);
    console.log('Location:', result.rows[0].location);
  } catch (error) {
    if (error.code === '23505') {
      console.error('❌ Error: Username already exists');
    } else {
      console.error('❌ Error creating user:', error.message);
    }
  } finally {
    await pool.end();
  }
}

const args = process.argv.slice(2);

if (args.length < 2) {
  console.log('Usage: node create-user.js <username> <password> [fullName] [location]');
  console.log('Example: node create-user.js johndoe mypassword "John Doe" "Stockholm"');
  process.exit(1);
}

const username = args[0];
const password = args[1];
const fullName = args[2] || username;
const location = args[3] || 'Not specified';

createUser(username, password, fullName, location);
