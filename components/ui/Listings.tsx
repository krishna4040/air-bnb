import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

interface Props {
    listings: any[]
    category: string
}

const Listings = ({ category, listings }: Props) => {

    useEffect(() => {
        
    }, [category])

    return (
        <View>
            <Text>Listings</Text>
        </View>
    )
}

export default Listings