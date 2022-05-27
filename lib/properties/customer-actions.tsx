import * as React from "react";
import { useQuery } from "react-query";

import api from "lib/api/internal";
import { Button } from "lib/shared-ui";
import { useUser } from "../auth";
import { Offer } from "./types";

interface ActionsProps {
  offers: Offer[];
}

export const CustomerActions = ({ offers }: ActionsProps) => {
  const { role } = useUser();
  const updateStatus = async (offer: Offer) => {
    let status = "";
    if (offer.status === "considering") {
      status = "viewing_requested";
    }
    if (offer.status === "viewing_requested") {
      status = "archived";
    }
    if (offer.status === "offer_sent") {
      status = "";
    }
    await api.home.setOfferStatus(status, offer.id);
    refetch();
  };

  const archiveStatus = async (id: number) => {
    await api.home.setOfferStatus("archive", id);
    refetch();
  };
  const getHomes = () => {
    return api.home.loadHomes();
  };

  const { refetch } = useQuery("homes", getHomes, {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const getButtonContent = (status: string | null): any => {
    switch (status) {
      case "considering":
        return "Considering";
      case "viewing_requested":
        return "Cancel Viewing and Archive";
      case "offer_sent":
        return "Cancel Offer";
      default:
        return "Send";
    }
  };

  const getActions = (offer: Offer) => {
    return (
      <div className="flex gap-2">
        {offer.status === null ||
          (offer.status === "considering" && (
            <Button
              onClick={() => archiveStatus(offer.id)}
              variant="red"
              className="py-1.5"
            >
              Archive
            </Button>
          ))}
        <Button
          onClick={() => updateStatus(offer)}
          variant="primary"
          className="py-1.5"
        >
          {getButtonContent(offer.status)}
        </Button>
      </div>
    );
  };

  if (role !== "customer") {
    return null;
  }

  return (
    <div className="border border-gray-300 divide-y divide-gray-200 rounded-md sm:min-w-[400px] mt-4 sm:mt-0">
      {offers?.map((offer: Offer) => (
        <div
          key={offer.id}
          className="py-2 px-4 flex flex-row justify-between items-center"
        >
          <div className="mr-10">{offer.relocationName}</div>
          <div className="flex gap-2">{getActions(offer)}</div>
        </div>
      ))}
    </div>
  );
};
