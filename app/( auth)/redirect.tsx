'use client'

import { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react' // this is the spinner icon from shadcn/lucide

export default function RedirectPage() {
  const { isLoaded, user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!isLoaded) return

    const role = user?.publicMetadata?.role

    if (role === 'patient') {
      router.replace('/dashboard/patient')
    } else if (role === 'doctor') {
      router.replace('/dashboard/doctor')
    } else {
      router.replace('/dashboard')
    }
  }, [isLoaded, user, router])

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 text-center">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      <p className="text-sm text-gray-600">Loading your profile...</p>
    </div>
  )
}
