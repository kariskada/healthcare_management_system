import NewPatient from '@/components/newpatient'
import { getPatientById } from '@/utils/services/patient';
import { auth } from '@clerk/nextjs/server';
import React from 'react'


const Registration = async() => {

  const { userId } = await auth();
  // const data = null

  const { data } = await getPatientById(userId!);
  console.log(data);
  //checking if data is null or visible on the database

  return (
    <div className="w-full h-full flex justify-center">
    <div className="max-w-6xl w-full relative pb-10">
      <NewPatient data={data!} type={!data ? "create" : "update"} />
    </div>
  </div>
  )
}

export default Registration