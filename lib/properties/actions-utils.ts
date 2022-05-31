import React from "react";
import dayjs from "dayjs";

import { Offer } from "./types";
import api from "lib/api/internal";

export const useStatusLabel = (offer: Offer): string => {
  return React.useMemo(() => {
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
};

export const archiveConfirm = async (id: number, onSuccess: () => void) => {
  if (confirm("Are you sure you want to archive property?")) {
    await api.home.setOfferStatus("archive", id);
    onSuccess();
  }
};
