const fs = require('fs');
const path = require('path');
const { dbGet, dbRun, dbExec } = require('./db');

async function runMigrations() {
  console.log('Running database migrations...');
  
  // Create schema version table if it doesn't exist
  await dbExec(`
    CREATE TABLE IF NOT EXISTS schema_version (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      version TEXT NOT NULL UNIQUE,
      applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const migrationsDir = path.join(__dirname, 'migrations');
  if (!fs.existsSync(migrationsDir)) {
    fs.mkdirSync(migrationsDir, { recursive: true });
    console.log('Migrations directory created.');
    return;
  }

  // Get all SQL migration files and sort them
  const files = fs.readdirSync(migrationsDir)
    .filter(file => file.endsWith('.sql'))
    .sort();

  console.log(`Found ${files.length} migration files in migrations directory.`);

  for (const file of files) {
    // Check if this migration was already applied
    const row = await dbGet('SELECT id FROM schema_version WHERE version = ?', [file]);
    
    if (!row) {
      console.log(`Applying database migration: ${file}...`);
      const filePath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filePath, 'utf8');
      
      // Execute in manual transaction block
      await dbExec('BEGIN TRANSACTION');
      try {
        await dbExec(sql);
        await dbRun('INSERT INTO schema_version (version) VALUES (?)', [file]);
        await dbExec('COMMIT');
        console.log(`Migration ${file} applied successfully.`);
      } catch (err) {
        await dbExec('ROLLBACK');
        console.log(`Migration ${file} rolled back due to error.`);
        console.error(`Error applying migration ${file}:`, err);
        throw err;
      }
    } else {
      console.log(`Migration ${file} is already applied.`);
    }
  }
  
  console.log('All migrations checked and applied successfully.');
}

module.exports = {
  runMigrations
};
