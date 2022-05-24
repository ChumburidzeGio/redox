import * as React from "react";
import { useQuery } from "react-query";

import api from "lib/api/internal";
import { Header } from "lib/shared-ui";

import { PropertiesCard } from "./property-card";
import LoadingState from "./loading-state";
import EmptyState from "./empty-state";

export const PropertiesList = () => {
  const getHomes = () => {
    return api.home.loadHomes();
  };

  const { data, isError, isLoading } = useQuery("homes", getHomes, {
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <LoadingState />;
  }

  if (!data?.data?.length || isError) {
    return <EmptyState />;
  }

  return (
    <div className="mt-4 sm:mt-6">
      <Header level="3">New apartments</Header>
      <div className="mt-4 overflow-hidden rounded-md sm:border border-gray-200">
        <ul role="list" className="divide-y divide-gray-200">
          {data?.data?.map(({ home, offers }: any) => {
            return (
              <PropertiesCard
                key={home.id}
                property={{
                  id: home.id,
                  photo: home.photo,
                  street: home.street,
                  city: home.city,
                  postcode: home.postcode,
                  rent: `€${home.rent}`,
                  isNew: false,
                  surface: home.surface,
                  agency: home.agency,
                  rooms: home.rooms,
                  interior: home.interior,
                  availability: home.availability,
                  url: home.url,
                  source: "Pararius",
                  coordinates: home.coordinates,
                  offers: offers,
                }}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};
1;
