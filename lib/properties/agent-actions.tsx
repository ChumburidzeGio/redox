import * as React from "react";
import { ErrorText, Form, Input, Label, RequestError } from "lib/forms";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";

import api from "lib/api/internal";
import { Button } from "lib/shared-ui";
import { useUser } from "lib/auth";
import { Offer } from "./types";
import { useQuery } from "react-query";
import { DateTime } from "../forms/date-time";
import dayjs from "dayjs";

interface ActionsProps {
  offers: Offer[];
}

interface MutationData {
  date: Date;
  status: string;
  id: number;
}

export const AgentActions = ({ offers }: ActionsProps) => {
  const { role } = useUser();
  const methods = useForm();

  const mutation = useMutation(
    (data: MutationData) => {
      return api.home.setOfferStatus(data.status, data.id, data.date);
    },
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const updateStatus = async (offer: Offer) => {
    let status = "considering";
    if (offer.status === "considering") {
      status = "viewing_requested";
    }
    if (offer.status === "viewing_requested") {
      status = "offer_sent";
    }
    if (offer.status === "offer_sent") {
      status = "rented";
    }
    await api.home.setOfferStatus(status, offer.id);
    refetch();
  };

  const getHomes = () => {
    return api.home.loadHomes();
  };
  const archiveStatus = async (id: number) => {
    await api.home.setOfferStatus("archive", id);
    refetch();
  };

  const { refetch } = useQuery("homes", getHomes, {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const getButtonContent = (status: string | null, offer: Offer): any => {
    if (offer.status === "viewing_requested" && offer.viewingAt) {
      return "Set offer sent";
    }
    switch (status) {
      case "considering":
        return "Considering";
      case "viewing_requested":
        return "Set Viewing Date";
      case "offer_sent":
        return "Set as Rented"  
      default:
        return "Send";
    }
  };

  const getActions = (offer: Offer) => {
    return (
      <>
        {offer.status === "viewing_requested" && !offer.viewingAt ? (
          <Form
            onSubmit={(data) =>
              mutation.mutate({ ...data, status: offer.status, id: offer.id })
            }
            methods={methods}
          >
            <div className="flex flex-col gap-2">
              <div>
                <DateTime
                  id="date"
                  value={offer.viewingAt || mutation.data}
                  rules={{ required: true }}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => archiveStatus(offer.id)}
                  variant="red"
                  className="py-1.5"
                >
                  Archive
                </Button>
                <Button variant="primary" type="submit" className="py-1.5">
                  Set viewing time
                </Button>
              </div>
            </div>
          </Form>
        ) : (
          <div className="flex gap-2">
            <Button
              onClick={() => archiveStatus(offer.id)}
              variant="red"
              className="py-1.5"
            >
              Archive
            </Button>
            <Button
              onClick={() => updateStatus(offer)}
              variant="primary"
              className="py-1.5"
            >
              {getButtonContent(offer.status, offer)}
            </Button>
          </div>
        )}
      </>
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
          <div className="mr-10">{offer.relocationName}</div>
          <div className="flex gap-2">{getActions(offer)}</div>
        </div>
      ))}
    </div>
  );
};
