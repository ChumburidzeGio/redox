export interface CoordinatesDts {
  lat: number;
  lng: number;
}

export type SearchOfferStatus =
  | null
  | "considering"
  | "viewing_requested"
  | "archived"
  | "offer_sent"
  | "rented";

export interface Offer {
  id: number;
  searchProfileId: number;
  relocationId: number;
  homeId: number;
  status: SearchOfferStatus;
  viewingAt: string;
  createdAt: Date;
  updatedAt: Date;
  relocationName: string;
}

export interface PropertyDts {
  id: number;
  photo: string;
  street: string;
  city: string;
  postcode: string;
  rent: string;
  surface: number;
  publisher: string;
  isNew: boolean;
  rooms: number;
  furnishing: string | null;
  availability: string | null;
  url: string;
  source: string;
  coordinates: CoordinatesDts;
  offers: Offer[];
}

export interface OfferOption {
  label: string;
  value: string;
  desc: string;
}

export interface PropertyCardProps {
  property: {
    id: number;
    photo: string;
    street: string;
    city: string;
    postcode: string;
    rent: string;
    surface: number;
    agency: string;
    isNew: boolean;
    rooms: number;
    availability: string | null;
    url: string;
    source: string;
    coordinates: { lat: number; lng: number };
    interior: string | null;
    offers: Offer[];
  };
  refetch: () => void;
}
