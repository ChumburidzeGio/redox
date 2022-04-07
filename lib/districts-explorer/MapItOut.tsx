import * as React from "react";

export const MapItOut = () => (
    <div className="relative mt-6 pb-[100%] h-0">
        <br />
        <iframe
            className="rounded-md absolute top-0 left-0 w-full h-full"
            src="https://mapitout.iamsterdam.com/"
            title="MapItOut embed"
            frameBorder="0"
            allowFullScreen
        />
    </div>
)
