// Script to check if there are any patients in the database
import db from '../lib/db.js';

async function checkPatients() {
  try {
    // Get count of patients
    const patientCount = await db.patient.count();
    console.log(`Total patients in database: ${patientCount}`);
    
    // Get first few patients if any exist
    if (patientCount > 0) {
      const patients = await db.patient.findMany({
        take: 5,
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true
        }
      });
      console.log('Sample patients:', patients);
    }
  } catch (error) {
    console.error('Error querying database:', error);
  } finally {
    await db.$disconnect();
  }
}

checkPatients();
