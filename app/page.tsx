import Image from "next/image";
// import {  } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { getRole } from "@/utils/roles";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";


export default  async function Home() {
  const { userId } = await auth();
  const role = await getRole();
  if (userId && role) { 
    redirect(`/${role}`);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center">
            Welcome to <br />
            <span className="text-5xl font-bold text-blue-700 md:text-6xl">
              Healthcare Management System
            </span>
          </h1>
        </div>
        <div className="text-center 	flex flex-col items-center justify-center ">
          <p className="mb-8 text-center text-lg md:text-xl font-light text-gray-700">
           The solution to digital health care management systems.
          </p>

          <div className="flex flex-col gap-4 md:flex-row">
            {userId ? (
              <>
                <Link href={`/${role}`}>
                  <Button>View Dashboard</Button>
                </Link>
                <UserButton></UserButton>
              </>
            ) : (
              <>
                <Link href="/sign-up">
                  <Button className="md:text-base font-light">
                    New Patient
                  </Button>
                </Link>

                <Link href="/sign-in">
                  <Button
                    className="md:text-base font-light hover:bg-blue-100"
                    variant="outline"
                  >
                    Log in to the account
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <footer className="mt-8 text-center">
        <p className="text-sm text-gray-500 text-center ">
          &copy; {new Date().getFullYear()} Healthcare Management System. All
          rights reserved.Developed fullstack by{" MzKaris "}
        </p>
      </footer>
    </div>
  );
}
