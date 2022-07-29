import * as React from 'react'
import { useQuery } from 'react-query'
import LoadingState from './loading-state'
import api from 'lib/api'
import { ProfileCard } from './profile-card'
import { SearchProfile } from './types'

export const SearchProfiles = () => {
    const { data, isError, isLoading } = useQuery('search-profiles', () => {
        return api.request.get('/admin/search-profiles')
    })

    if (isLoading) {
        return <LoadingState />
    }

    if (!data?.data?.length || isError) {
        return <>Hmm... Cant find any search profiles, must be an Error :(</>
    }

    return (
        <div className="grid gap-6 grid-cols-2 w-full">
            {data?.data.map((profile: SearchProfile) => (
                <ProfileCard key={profile.id} profile={profile} />
            ))}
        </div>
    )
}
