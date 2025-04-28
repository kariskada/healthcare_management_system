import type { Roles } from '@/types/globals' // Update the path to the correct location of 'globals'
import { auth } from '@clerk/nextjs/server'

export const checkRole = async (role: Roles) => {
  const { sessionClaims } = await auth();

  const userRole = sessionClaims?.metadata?.role;

  return userRole?.toLowerCase() === role.toLowerCase();
};


export const getRole = async () => {
  const { sessionClaims } = await auth();

  const rawRole = sessionClaims?.metadata?.role;

  const role = rawRole ? rawRole.toLowerCase() : "patient"; // fallback to patient if undefined

  return role;
};
