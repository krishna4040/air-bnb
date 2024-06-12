import { View, Text, FlatList, ListRenderItem, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'expo-router'
import { Listing } from '@/assets/data/interface'
import { Ionicons } from '@expo/vector-icons'
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated'

interface Props {
    listings: Listing[]
    category: string
}

const Listings = ({ category, listings }: Props) => {
    const listRef = useRef<FlatList>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [category])

    const renderRow: ListRenderItem<Listing> = ({ item }) => {
        return (
            <Link href={`/listing/${item.id}`} asChild>
                <TouchableOpacity>
                    <Animated.View entering={FadeInRight} exiting={FadeOutLeft}  className='p-4 gap-2 my-4'>
                        <Image
                            source={{uri: item.medium_url || ''}}
                            className='w-full h-[300] rounded-md'
                        />
                        <TouchableOpacity className='absolute right-8 top-8'>
                            <Ionicons name='heart-outline' size={24} color={'#000'} />
                        </TouchableOpacity>
                        <View className='flex flex-row justify-between gap-1'>
                            <Text>{item.name}</Text>
                            <View>
                                <Ionicons name='star-outline' size={16} />
                                <Text>{item.review_scores_rating || 0 / 20}</Text>
                            </View>
                        </View>
                        <Text>{item.room_type}</Text>
                        <View className='flex flex-row justify-between gap-1'>
                            <Text>{item.price}</Text>
                            <Text>night</Text>
                        </View>
                    </Animated.View>
                </TouchableOpacity>
            </Link>
        )
    }

    return (
        <View>
            <FlatList
                data={loading ? [] : listings}
                ref={listRef}
                renderItem={renderRow}
            />
        </View>
    )
}

export default Listings