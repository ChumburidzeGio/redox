import React from "react";
import dayjs from "dayjs";
import toast from "react-hot-toast";

import { Offer } from "./types";
import api from "lib/api/internal";
import { useQueryClient } from "react-query";

const notifyError = (text: string) => toast.error(text);

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

const GetCustomerStatusValue = (offer: Offer): string => {
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

function useSharedActions() {
  const queryClient = useQueryClient();
  async function archiveConfirm(id: number) {
    if (confirm("Are you sure you want to archive property?")) {
      try {
        await api.home.setOfferStatus("archive", id);
        await queryClient.prefetchQuery("homes");
      } catch (err) {
        notifyError(
          "Oops we broke something, please try again later or if error persists let us know in the chat."
        );
      }
    }
  }

  async function setStatus(status: string | null, id: number, date?: string) {
    try {
      await api.home.setOfferStatus(status, id, date);
      await queryClient.prefetchQuery("homes");
    } catch (err) {
      notifyError(
        "Oops we broke something, please try again later or if error persists let us know in the chat."
      );
    }
  }

  return { archiveConfirm, setStatus };
}

export { GetCustomerStatusValue, useSharedActions, useStatusLabel };
