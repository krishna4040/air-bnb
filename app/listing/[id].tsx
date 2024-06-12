import { View, Text, Dimensions, TouchableOpacity, Share } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { Listing } from '@/assets/data/interface'
import ListingData from '@/assets/data/airbnb-listings.json'
import Animated, { SlideInDown, interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated'
import { defaultStyles } from '@/constants/styles'
import { Ionicons } from '@expo/vector-icons'

const IMG_HEIGHT = 300
const { width } = Dimensions.get('window')

const Page = () => {
    const { id } = useLocalSearchParams()
    const listing = (ListingData as Listing[]).find(listing => listing.id === id)
    const scrollRef = useAnimatedRef<Animated.ScrollView>()

    const scrollOffset = useScrollViewOffset(scrollRef)

    const imageAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: interpolate(scrollOffset.value, [-IMG_HEIGHT, 0, IMG_HEIGHT], [-IMG_HEIGHT / 4, 0, IMG_HEIGHT * 0.75]), },
                { scale: interpolate(scrollOffset.value, [-IMG_HEIGHT, 0, IMG_HEIGHT], [2, 1, 1]) }
            ]
        }
    })

    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT/1.70], [0, 1]),
        }
    })

    const navigation = useNavigation()
    const shareListing = async () => {
        await Share.share({
            title: listing?.name,
            url: listing?.listing_url || ""
        })
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return <View className='flex flex-row justify-between items-center'>
                    <TouchableOpacity onPress={shareListing}>
                        <Ionicons name='share-outline' />
                    </TouchableOpacity>
                </View>
            },
            headerLeft: () => {
                <TouchableOpacity>
                    <Ionicons name='chevron-back' size={24} color={'#000'} />
                </TouchableOpacity>
            },
            headerBackGround: () => {
                return <Animated.View className={'bg-white h-[100px] border-b-gray-400'} style={[headerAnimatedStyle]}>

                </Animated.View>
            }
        })
    }, [])

    return (
        <View className='flex-1 bg-white'>
            <Animated.ScrollView ref={scrollRef}>
                <Animated.Image source={{ uri: listing?.xl_picture_url || "" }} className={`h-[${IMG_HEIGHT}] w-[${width}]`} style={[imageAnimatedStyle]} />
            </Animated.ScrollView>
            <Animated.View entering={SlideInDown.delay(200)}>
                <View className='flex flex-row justify-between items-center'>
                    <TouchableOpacity>
                        <Text>Rs.{listing?.price}</Text>
                        <Text>Night</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={defaultStyles.btn}>
                        <Text style={defaultStyles.btnText}>Reserve</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    )
}

export default Page