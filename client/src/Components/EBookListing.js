import React from 'react'
import { DrizzleContext } from '@drizzle/react-plugin'


export default function EBookListing() {
    return (
        <DrizzleContext.Consumer>
            {drizzleContext => {
                const { drizzle, drizzleState, initialized } = drizzleContext

                if (!initialized) {
                    return 'Loading...'
                }

                return 'Hello Book listing'
            }}
        </DrizzleContext.Consumer>
    )
}
