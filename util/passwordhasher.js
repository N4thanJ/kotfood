// util/hash.js
const bcrypt = require('bcryptjs');

const password = process.argv[2];
const saltRounds = 10;

if (!password) {
  console.error('❌ Please provide a password: node hash.js <password>');
  process.exit(1);
}

bcrypt.hash(password, saltRounds).then((hash) => {
  console.log('✅ Hashed password:');
  console.log(hash);
});
