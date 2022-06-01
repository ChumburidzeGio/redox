import * as React from "react";
import { ChevronRightIcon, ExternalLinkIcon } from "@heroicons/react/solid";
import Image from "next/image";

import { Drawer, Header, Button, Badge } from "lib/shared-ui";
import { CustomerActions } from "./customer-actions";
import { AgentActions } from "./agent-actions";
import { Offer, PropertyCardProps } from "./types";
import { PointOnMap } from "./point-on-map";

const PropertiesCard = ({ property }: PropertyCardProps) => {
  const [showDetails, setShowDetails] = React.useState(false);
  const offers: Offer[] = property.offers;

  const imgLoader = ({ src }: { src: string }): string => {
    return src;
  };

  return (
    <li
      className="block hover:bg-gray-50 cursor-pointer"
      onClick={() => setShowDetails(true)}
    >
      <Drawer show={showDetails} onClose={() => setShowDetails(false)}>
        <div className="pointer-events-auto w-screen sm:max-w-lg max-w-full">
          <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
            <Image
              loader={imgLoader}
              src={property.photo}
              alt="image"
              width="100%"
              height="500px"
              className="rounded-sm"
            />

            <div className="pt-3 px-5 pb-5 flex flex-col justify-between">
              <div className="flex flex-col">
                <Header level="3">{property.street}</Header>
                <Header level="4" color="text-gray-700">
                  {property.city}, {property.postcode}{" "}
                  <span className="text-indigo-600">· {property.rent}</span>
                </Header>
                <p className="text-sm mt-1">
                  {property.surface} m2 · {property.rooms} rooms ·{" "}
                  {(property.availability || property.interior) &&
                    `${property.availability || property.interior} ·`}{" "}
                  By {property.agency}
                </p>
              </div>

              <a
                href={property.url}
                target="_blank"
                className="mt-5 mb-3"
                rel="noreferrer"
              >
                <Button variant="secondary" className="w-full">
                  View Details on {property.source}
                  <ExternalLinkIcon className="h-5 w-5 ml-2" />
                </Button>
              </a>
              <CustomerActions offers={offers || []} />
              <AgentActions offers={offers || []} />

              {property.coordinates && (
                <PointOnMap
                  lat={property.coordinates.lat}
                  lng={property.coordinates.lng}
                />
              )}
            </div>
          </div>
        </div>
      </Drawer>
      <div className="flex items-center py-3 sm:px-4 sm:py-4">
        <div className="min-w-0 flex-1 flex items-center">
          <div className="sm:w-100 max-w-full sm:max-w-[100px] flex flex-[1_0_auto] sm:max-h-[80px] justify-center items-center overflow-hidden">
            <img
              src={property.photo}
              alt="img"
              className="flex-shrink-0 min-w-full min-h-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
            <div>
              <p className="text-md font-semibold text-gray-800 truncate">
                {property.street}
                {property.isNew && (
                  <Badge color="green" size="sm" className="ml-2">
                    new
                  </Badge>
                )}
              </p>
              <p className="mt-1 flex items-center text-sm text-gray-600 font-medium max-w-full truncate">
                <span className="text-indigo-600 mr-1">{property.rent} · </span>
                {property.city}, {property.postcode}
              </p>
            </div>
            <div className="hidden md:block">
              <p className="text-sm mt-1 text-gray-800 font-medium">
                {property.surface} m2 · {property.rooms} rooms
              </p>
              <p className="text-sm mt-1.5 text-gray-600">
                {property.availability || property.interior}
              </p>
            </div>
          </div>
        </div>
        <div>
          <ChevronRightIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>
      </div>
    </li>
  );
};

export default React.memo(PropertiesCard);
