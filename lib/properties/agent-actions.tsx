import * as React from "react";
import { useQuery } from "react-query";
import dayjs from "dayjs";

import api from "lib/api/internal";
import { Button } from "lib/shared-ui";
import { useUser } from "lib/auth";
import { Offer, OfferOption } from "./types";
import { SharedPopover } from "./popover";
import { AxiosResponse } from "axios";

const statuses: OfferOption[] = [
  {
    label: "Considering",
    value: "considering",
    desc: "Status Description",
  },
  {
    label: "Send Offer",
    value: "offer_sent",
    desc: "Status Description",
  },
  {
    label: "Viewing Requested",
    value: "viewing_requested",
    desc: "Status Description",
  },
  {
    label: "Rented",
    value: "rented",
    desc: "Status Description",
  },
];

function GetStatus({ offer }: { offer: Offer }) {
  const status = React.useMemo(() => {
    switch (offer?.status) {
      case "considering":
        return "Considering";
      case "offer_sent":
        return "Offer Sent";
      case "viewing_requested":
        const { viewingAt } = offer;
        return viewingAt
          ? `Viewing at ${dayjs(viewingAt).format("MMM D, HH:mm")}`
          : "Viewing Requested";
      case "rented":
        return "Rented";
      default:
        return "No Status";
    }
  }, [offer]);

  return <div className="text-xs text-gray-700 ">{status}</div>;
}
export const AgentActions = ({ offers }: { offers: Offer[] }) => {
  const { role } = useUser();

  const updateStatus = async (
    status: string | null,
    offer: Offer,
    date?: Date | string
  ) => {
    await api.home.setOfferStatus(status, offer.id, date);
    refetch();
  };

  const getHomes = (): Promise<AxiosResponse> => {
    return api.home.loadHomes();
  };
  const archiveStatus = async (id: number) => {
    if (confirm("Are you sure you want to archive property?")) {
      await api.home.setOfferStatus("archive", id);
      refetch();
    }
  };

  const { refetch } = useQuery("homes", getHomes, {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const getActions = (offer: Offer): JSX.Element => {
    return (
      <div className="flex flex-col gap-1">
        <div className="flex gap-2">
          <Button
            onClick={() => archiveStatus(offer.id)}
            variant="gray"
            className="py-1.5"
          >
            Archive
          </Button>
          <SharedPopover
            options={statuses}
            updateHandler={updateStatus}
            offer={offer}
          />
        </div>
        {<GetStatus offer={offer} />}
      </div>
    );
  };

  if (role !== "admin") {
    return null;
  }

  return (
    <div className="border border-gray-300 divide-y divide-gray-200 rounded-md sm:min-w-[400px] mt-4 sm:mt-0">
      {offers?.map((offer: Offer) => (
        <div
          key={offer.id}
          className="py-2 px-4 flex flex-row justify-between items-center"
        >
          <div className="mr-4 sm:mr-10">{offer.relocationName}</div>
          <div className="flex gap-2">{getActions(offer)}</div>
        </div>
      ))}
    </div>
  );
};
