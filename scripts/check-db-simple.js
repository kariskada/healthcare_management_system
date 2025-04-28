// Simple script to check database connection
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkDatabase() {
  try {
    console.log('Testing database connection...');
    
    // Check if any patients exist
    const patientCount = await prisma.patient.count();
    console.log(`Database connection successful! Total patients: ${patientCount}`);
    
    if (patientCount > 0) {
      // Get a sample patient
      const samplePatient = await prisma.patient.findFirst({
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true
        }
      });
      
      console.log('Sample patient:', samplePatient);
    } else {
      console.log('No patient records found in the database');
    }
  } catch (error) {
    console.error('Database connection error:', error);
    console.log('\nPossible issues:');
    console.log('1. DATABASE_URL might be missing or incorrect in your .env file');
    console.log('2. PostgreSQL server might not be running');
    console.log('3. Database might not exist or might be inaccessible');
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();
