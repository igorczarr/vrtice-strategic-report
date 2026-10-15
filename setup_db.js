const { Pool } = require('pg');
const pool = new Pool({
    connectionString: 'postgresql://neondb_owner:npg_1phb6mVOoBuZ@ep-rough-sound-acrq49hl-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require'
});

async function setup() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS orion_users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                whatsapp VARCHAR(50),
                password VARCHAR(255),
                payment_status VARCHAR(50) DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("Table orion_users created successfully.");
    } catch (error) {
        console.error("Error creating table:", error);
    } finally {
        process.exit(0);
    }
}
setup();
