import * as React from 'react'
import {PropertiesCard} from "./property-card";
import {Header} from "lib/shared-ui";

export const PropertiesList = () => {
    return (
        <div className="mt-4 sm:mt-6">
            <Header level="3">New apartments</Header>
            <div className="mt-4 overflow-hidden rounded-md sm:border border-gray-200">
                <ul role="list" className="divide-y divide-gray-200">
                    <PropertiesCard property={{
                        id: 12312,
                        photo: "https://cloud.funda.nl/valentina_media/154/794/639_720x480.jpg",
                        street: "Vossiusstraat 53 D",
                        city: "Amsterdam",
                        postcode: "1077PA",
                        rent: "€3,200",
                        isNew: false,
                        surface: 135,
                        publisher: "Heeren Makelaars",
                        rooms: 4,
                        furnishing: null,
                        availability: "Available in consultation",
                        url: "https://www.pararius.com/apartment-for-rent/amsterdam/cbbf7dbd/bartholomeus-diazstraat",
                        source: "Pararius",
                        coordinates: { lat: 4.871903, lng: 52.348717 }
                    }} />
                    <PropertiesCard property={{
                        id: 12312,
                        photo: "https://cloud.funda.nl/valentina_media/154/794/639_720x480.jpg",
                        street: "Vossiusstraat 53 D",
                        city: "Amsterdam",
                        postcode: "1077PA",
                        rent: "€1,800",
                        surface: 135,
                        isNew: false,
                        publisher: "Heeren Makelaars",
                        rooms: 4,
                        furnishing: null,
                        availability: "Available in consultation",
                        url: "https://www.pararius.com/apartment-for-rent/amsterdam/cbbf7dbd/bartholomeus-diazstraat",
                        source: "Funda",
                        coordinates: { lat: 4.871903, lng: 52.348717 }
                    }} />
                </ul>
            </div>

            <Header level="3" className="mt-8">Viewings & Offers</Header>
            <div className="mt-4 overflow-hidden rounded-md sm:border border-gray-200">
                <ul role="list" className="divide-y divide-gray-200">
                    <PropertiesCard property={{
                        id: 12312,
                        photo: "https://cloud.funda.nl/valentina_media/154/794/639_720x480.jpg",
                        street: "Vossiusstraat 53 D",
                        city: "Amsterdam",
                        postcode: "1077PA",
                        rent: "€3,200",
                        isNew: false,
                        surface: 135,
                        publisher: "Heeren Makelaars",
                        rooms: 4,
                        furnishing: null,
                        availability: "Available in consultation",
                        url: "https://www.pararius.com/apartment-for-rent/amsterdam/cbbf7dbd/bartholomeus-diazstraat",
                        source: "Pararius",
                        coordinates: { lat: 4.871903, lng: 52.348717 }
                    }} />
                    <PropertiesCard property={{
                        id: 12312,
                        photo: "https://cloud.funda.nl/valentina_media/154/794/639_720x480.jpg",
                        street: "Vossiusstraat 53 D",
                        city: "Amsterdam",
                        postcode: "1077PA",
                        rent: "€1,800",
                        surface: 135,
                        isNew: false,
                        publisher: "Heeren Makelaars",
                        rooms: 4,
                        furnishing: null,
                        availability: "Available in consultation",
                        url: "https://www.pararius.com/apartment-for-rent/amsterdam/cbbf7dbd/bartholomeus-diazstraat",
                        source: "Funda",
                        coordinates: { lat: 4.871903, lng: 52.348717 }
                    }} />
                </ul>
            </div>
        </div>
    )
}
1