import * as React from "react";
import { useQuery } from "react-query";
import EmptyState from "./empty-state";
import LoadingState from "./loading-state";
import { EmployeeCard } from "./employee-card";
import { InviteEmployee } from "./invite-employee";
import api from "lib/api/internal";
import { RelocationDts } from "./dts/relocation.dts";

export const EmployeesList = () => {
  const { data, isError, isLoading } = useQuery("employees", () => {
    return api.employer.loadEmployees();
  });

  if (isLoading) {
    return <LoadingState />;
  }

  if (!data?.data?.length || isError) {
    return <EmptyState />;
  }

  return (
    <>
      <div className="mt-7 overflow-hidden rounded-md border border-gray-200">
        <ul role="list" className="divide-y divide-gray-200">
          {data?.data.map((relocation: RelocationDts) => (
            <EmployeeCard key={relocation.id} relocation={relocation} />
          ))}
        </ul>
      </div>

      <InviteEmployee />
    </>
  );
};
