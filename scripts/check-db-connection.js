// Script to check database connection status
import db from '../lib/db.js';

async function checkDatabaseConnection() {
  try {
    console.log('Testing database connection...');
    
    // Try to connect to the database
    await db.$connect();
    console.log('✓ Database connection successful!');
    
    // Check if DATABASE_URL is set
    if (process.env.DATABASE_URL) {
      console.log('✓ DATABASE_URL environment variable is set');
    } else {
      console.log('✗ DATABASE_URL environment variable is NOT set');
      console.log('Please add DATABASE_URL to your .env file');
    }
    
    // Check if any patients exist
    const patientCount = await db.patient.count();
    console.log(`Total patients in database: ${patientCount}`);
    
    if (patientCount > 0) {
      console.log('✓ Patient records exist in the database');
      
      // Get a sample patient
      const samplePatient = await db.patient.findFirst({
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true
        }
      });
      
      console.log('Sample patient:', samplePatient);
    } else {
      console.log('✗ No patient records found in the database');
      console.log('You need to create at least one patient record');
    }
  } catch (error) {
    console.error('Database connection error:', error);
    console.log('\nPossible issues:');
    console.log('1. DATABASE_URL might be missing or incorrect in your .env file');
    console.log('2. PostgreSQL server might not be running');
    console.log('3. Database might not exist or might be inaccessible');
  } finally {
    await db.$disconnect();
  }
}

checkDatabaseConnection();
