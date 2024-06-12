import { View, Text } from 'react-native'
import React from 'react'
import { Marker } from 'react-native-maps'
import { defaultStyles } from '@/constants/styles'
import { Feature, LocationList } from '@/assets/data/interface'
import { router } from 'expo-router'
import MapView from 'react-native-map-clustering'

interface Props {
    listings: LocationList
}

const ListingsMapView = ({ listings }: Props) => {
    const onMarkerSelected = (item: Feature) => {
        router.push(`/listing/${item.properties.id}`)
    }

    const renderCluster = (cluster: any) => {
        const { id, geometry, onPress, properties } = cluster
        const points = properties.point_count
        return (
            <Marker key={id}
                coordinate={{
                    longitude: geometry.coordinate[0],
                    latitude: geometry.coordinate[1],
                }}
            >
                <View className='bg-white p-2 shadow-md rounded-md flex items-center justify-center'>
                    <Text className='text-black text-center'>{points}</Text>
                </View>
            </Marker>
        )
    }

    return (
        <View style={defaultStyles.container}>
            <MapView
                animationEnabled={false}
                clusterColor='#fff'
                clusterTextColor='#000'
                showsUserLocation
                showsMyLocationButton
                provider='google'
                renderCluster={renderCluster}
            >
                {
                    listings.features.map(item => {
                        return <Marker
                            key={item.properties.id}
                            coordinate={{
                                latitude: parseFloat(item.properties.latitude),
                                longitude: parseFloat(item.properties.longitude),
                            }}
                            onPress={() => onMarkerSelected(item)}
                        >
                            <View className='bg-white p-2 shadow-md rounded-md flex items-center justify-center'>
                                <Text className='text-sm'>Rs.{item.properties.price}</Text>
                            </View>
                        </Marker>
                    })
                }
            </MapView>
        </View>
    )
}

export default ListingsMapView