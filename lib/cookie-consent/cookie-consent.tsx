import * as React from 'react'
import ReactCookieConsent from "react-cookie-consent";

export const CookieConsent = () => (
        <ReactCookieConsent
            location="bottom"
            buttonText="Accept Cookies"
            cookieName="redox_cookie_consent"
            containerClasses="max-w-[400px] sm:rounded-md sm:mx-5 sm:mb-5 left-0 bottom-0 fixed bg-white p-4 shadow-md border-t sm:border border-slate-300"
            buttonWrapperClasses="mt-3 block w-full"
            buttonClasses="w-full text-sm font-medium rounded-md w-full py-2 items-center justify-center bg-amber-200 text-amber-900"
            disableStyles={true}
            expires={365}
        >
            This website uses cookies to enhance the user experience.
        </ReactCookieConsent>
    )
