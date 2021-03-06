export default {
    baseUrl: process.env.NEXTAUTH_URL as string,
    services: {
        redar: {
            baseUrl: process.env.REDAR_BASE_URL,
        },
        amplitude: {
            apiKey: '127e72a08a594d038656516bb021f04b',
        },
    },
    mapToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string,
    intercomAppId: 'nd37jin7',
}
