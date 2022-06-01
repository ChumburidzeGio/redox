import React from "react";
import dayjs from "dayjs";

import { Offer } from "./types";
import api from "lib/api/internal";
import { useQueryClient } from "react-query";

const useStatusLabel = (offer: Offer): string => {
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

const useCustomerStatusValue = (offer: Offer): string => {
  return React.useMemo(() => {
    switch (offer?.status) {
      case "considering":
        return "viewing_requested";
      case "viewing_requested":
        return "archived";
      case "offer_sent":
        return "archived";
      default:
        return "archived";
    }
  }, [offer]);
};

const updateStatus = async (
  onSuccess: () => void,
  status: string | null,
  offer: Offer,
  date?: Date | string
) => {
  await api.home.setOfferStatus(status, offer.id, date);
  onSuccess();
};

function useSharedActions() {
  const queryClient = useQueryClient();
  async function archiveConfirm(id: number) {
    if (confirm("Are you sure you want to archive property?")) {
      await api.home.setOfferStatus("archive", id);
      await queryClient.prefetchQuery("homes");
    }
  }
  async function setStatus(status: string | null, id: number, date?: string) {
    await api.home.setOfferStatus(status, id, date);
    await queryClient.prefetchQuery("homes");
  }
  return { archiveConfirm, setStatus };
}

export {
  useCustomerStatusValue,
  useSharedActions,
  updateStatus,
  useStatusLabel,
};
