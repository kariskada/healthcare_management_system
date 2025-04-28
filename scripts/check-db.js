// Script to check database connection and patients
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkDatabase() {
  try {
    // Test database connection
    console.log('Testing database connection...');
    await prisma.$connect();
    console.log('✓ Database connection successful');
    
    // Check for patients
    const patientCount = await prisma.patient.count();
    console.log(`Total patients in database: ${patientCount}`);
    
    if (patientCount > 0) {
      // Get first few patients
      const patients = await prisma.patient.findMany({
        take: 3,
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true
        }
      });
      console.log('Sample patients:', JSON.stringify(patients, null, 2));
    } else {
      console.log('No patients found in the database');
    }
  } catch (error) {
    console.error('Database error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();
