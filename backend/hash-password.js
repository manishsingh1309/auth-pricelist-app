import bcrypt from 'bcryptjs';

async function hashPassword(password) {
  const hash = await bcrypt.hash(password, 10);
  console.log('Password:', password);
  console.log('Hashed:', hash);
  console.log('\nSQL Insert Example:');
  console.log(`INSERT INTO users (username, password, full_name, location)`);
  console.log(`VALUES ('username', '${hash}', 'Full Name', 'Location');`);
}

const password = process.argv[2] || 'password123';
hashPassword(password);
