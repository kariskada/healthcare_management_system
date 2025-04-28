import React from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';
import Table from './table';
import { Appointment } from '@/types/data-types';
import ProfileImage from '../profile-image';
import { format } from 'date-fns/format';
import AppointmentStatusIndicator from '../appointment-status-indicator';
import ViewAppointment from '../view-appointment';


interface DataProps {
  data: any[];
}
const columns = [
  { header: "Info", key: "name" },
  {
    header: "Date",
    key: "appointment_date",
    className: "hidden md:table-cell",
  },
  {
    header: "Time",
    key: "time",
    className: "hidden md:table-cell",
  },
  {
    header: "Doctor",
    key: "doctor",
    className: "hidden md:table-cell",
  },
  {
    header: "Status",
    key: "status",
    className: "hidden xl:table-cell",
  },
  {
    header: "Actions",
    key: "action",
  },
];
const RecentAppointments = ({ data }: DataProps) => {
  // console.log(data);
  const renderRow = (item: Appointment) => {
    const name = item?.patient?.first_name + "  " + item?.patient?.last_name;
    return (
      <tr 
        key={item?.id}
        className="border-b border-gray-200 even:bg-slate-50 text-xs hover:bg-slate-50"
      >
        {/* user details */}
        <td className="flex items-center gap-2 2xl:gap-4 py-2 xl:py-4">
          <ProfileImage
        url={item?.patient?.img!}
        name={name}
        className="bg-violet-600"
        bgColor={item?.patient?.colorCode!}
          />
          <div>
        <h3 className="text-xs md:text-sm md:font-medium uppercase">
          {name}
        </h3>
        <span className="text-[10px] capitalize">
          {item?.patient?.gender?.toLowerCase()}
        </span>
          </div>
        </td>

        {/* appointment date and time */}
        <td className="hidden md:table-cell text-[10px]">
          {format(item?.appointment_date, "yyyy-MM-dd")}
        </td>
        <td className="hidden md:table-cell text-[10px]">{item?.time}</td>

        {/* doctor details */}
        <td className="hidden md:table-cell items-center py-2">
          <div className="flex items-center gap-2 2x:gap-4">
        <ProfileImage
          url={item?.doctor?.img!}
          name={item?.doctor?.name}
          className="bg-blue-600"
          bgColor={item?.doctor?.colorCode!}
          textClassName="text-black font-medium"
        />
        <div>
          <h3 className="font-medium uppercase text-xs">{item?.doctor?.name}</h3>
          <span className="text-[10px] capitalize">
            {item?.doctor?.specialization}
          </span>
        </div>
          </div>
        </td>
        {/* appointment status indicator */}

        <td className="hidden xl:table-cell">
        <AppointmentStatusIndicator status={item?.status} />
        </td>
        {/* action button */}
        <td>
        <div className="flex items-center gap-x-2">
            <ViewAppointment id={item?.id} />

            <Link href={`/record/appointments/${item?.id}`}>See all</Link>
          </div>
        </td>
      </tr>
    );
  };
  return (
    <div className="bg-white rounded-xl p-2 2xl:p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Recent Appointments</h1>

        <Button asChild variant={"outline"}>
          <Link href="/record/appointments">View All</Link>
        </Button>
      </div>

      <Table columns={columns} renderRow={renderRow} data={data} />
    </div>
  )
}

export default RecentAppointments