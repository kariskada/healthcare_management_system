import { MedicalHistoryContainer } from "@/components/medical-history-container";
import PatientRatingContainer from "@/components/patient-rating-container";
import ProfileImage from "@/components/profile-image";
import { Card } from "@/components/ui/card";
import { getPatientFullDataById } from "@/utils/services/patient";
import { auth } from "@clerk/nextjs/server";
import { format } from "date-fns";
import Link from "next/link";
import { Suspense } from "react";

// Client components without type annotations
function SmallCard({ label, value }) {
  return (
    <div className="w-full md:w-1/3">
      <span className="text-sm text-gray-500">{label}</span>
      <p className="text-sm md:text-base capitalize">{value || "Not provided"}</p>
    </div>
  );
}

function PatientProfileUI({ data, id, cat }) {
  return (
    <div className="bg-gray-100/60 h-full rounded-xl py-6 px-3 2xl:p-6 flex flex-col lg:flex-row gap-6">
      <div className="w-full xl:w-3/4">
        <div className="w-full flex flex-col lg:flex-row gap-4">
          <Card className="bg-white rounded-xl p-4 w-full lg:w-[30%] border-none flex flex-col items-center">
            <ProfileImage
              url={data.img || ""}
              name={`${data.first_name || ""} ${data.last_name || ""}`}
              className="h-20 w-20 md:flex"
              bgColor={data.colorCode || "#4f46e5"}
              textClassName="text-3xl"
            />
            <h1 className="font-semibold text-2xl mt-2">
              {`${data.first_name || ""} ${data.last_name || ""}`}
            </h1>
            <span className="text-sm text-gray-500">{data.email || "No email provided"}</span>

            <div className="w-full flex items-center justify-center gap-2 mt-4">
              <div className="w-1/2 space-y-1 text-center">
                <p className="text-xl font-medium">{data.totalAppointments || 0}</p>
                <span className="text-xs text-gray-500">Appointments</span>
              </div>
            </div>
          </Card>

          <Card className="bg-white rounded-xl p-6 w-full lg:w-[70%] border-none space-y-6">
            <div className="flex flex-col md:flex-row md:flex-wrap md:items-center xl:justify-between gap-y-4 md:gap-x-0">
              <SmallCard
                label={"Gender"}
                value={data.gender?.toLowerCase() || "Not specified"}
              />
              <SmallCard
                label="Date of Birth"
                value={data.date_of_birth ? format(data.date_of_birth, "yyyy-MM-dd") : "Not specified"}
              />
              <SmallCard label={"Phone Number"} value={data.phone || "Not provided"} />
            </div>

            <div className="flex flex-col md:flex-row md:flex-wrap md:items-center xl:justify-between gap-y-4 md:gap-x-0">
              <SmallCard label="Marital Status" value={data.marital_status || "Not specified"} />
              <SmallCard label="Blood Group" value={data.blood_group || "Not specified"} />
              <SmallCard label="Address" value={data.address || "Not provided"} />
            </div>

            <div className="flex flex-col md:flex-row md:flex-wrap md:items-center xl:justify-between gap-y-4 md:gap-x-0">
              <SmallCard
                label="Contact Person"
                value={data.emergency_contact_name || "Not provided"}
              />
              <SmallCard
                label="Emergency Contact"
                value={data.emergency_contact_number || "Not provided"}
              />
              <SmallCard
                label="Last Visit"
                value={data.lastVisit ? format(data.lastVisit, "yyyy-MM-dd") : "No last visit"}
              />
            </div>
          </Card>
        </div>

        <div className="mt-10">
          {cat === "medical-history" && (
            <MedicalHistoryContainer patientId={id} />
          )}
        </div>
      </div>

      <div className="w-full xl:w-1/3">
        <div className="bg-white p-4 rounded-md mb-8">
          <h1 className="text-xl font-semibold">Quick Links</h1>

          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link
              className="p-3 rounded-md bg-yellow-50 hover:underline"
              href={`/record/appointments?id=${id}`}
            >
              Patient&apos;s Appointments
            </Link>
            <Link
              className="p-3 rounded-md bg-purple-50 hover:underline"
              href="?cat=medical-history"
            >
              Medical Records
            </Link>
            <Link
              className="p-3 rounded-md bg-violet-100"
              href={`?cat=payments`}
            >
              Medical Bills
            </Link>
            <Link className="p-3 rounded-md bg-pink-50" href={`/`}>
              Dashboard
            </Link>

            <Link className="p-3 rounded-md bg-rose-100" href={`#`}>
              Lab Test & Result
            </Link>
          </div>
        </div>

        <PatientRatingContainer id={id} />
      </div>
    </div>
  );
}

function NotFoundComponent() {
  return (
    <div className="bg-gray-100/60 h-full rounded-xl py-6 px-3 2xl:p-6 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold text-red-500">Patient data not found</h1>
      <p className="text-gray-500 mt-2">The requested patient information could not be retrieved.</p>
      <Link href="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Return to Dashboard
      </Link>
    </div>
  );
}

function ErrorComponent({ message }) {
  return (
    <div className="bg-gray-100/60 h-full rounded-xl py-6 px-3 2xl:p-6 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold text-red-500">Error</h1>
      <p className="text-gray-500 mt-2">{message}</p>
      <Link href="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Return to Dashboard
      </Link>
    </div>
  );
}

// Simple page component with minimal structure to avoid Next.js 15 type conflicts
export default async function Page(props) {
  const patientId = props.params.patientid;
  const searchParams = props.searchParams || {};
  
  let id = patientId;
  const cat = typeof searchParams?.cat === 'string' ? searchParams.cat : "medical-history";

  if (patientId === "self") {
    const { userId } = await auth();
    id = userId || patientId;
  }

  try {
    const response = await getPatientFullDataById(id);
    
    if (!response.success || !response.data) {
      return <NotFoundComponent />;
    }

    return (
      <Suspense fallback={<div>Loading...</div>}>
        <PatientProfileUI data={response.data} id={id} cat={cat} />
      </Suspense>
    );
  } catch (error) {
    console.error("Error fetching patient data:", error);
    return <ErrorComponent message="Error loading patient data" />;
  }
}
