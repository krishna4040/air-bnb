import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Link, Stack } from 'expo-router'
import { ExploreHeader } from '@/components/ui/ExploreHeader'
import Listings from '@/components/ui/Listings'
import ListingsData from '@/assets/data/airbnb-listings.json'
import ListingsMapData from '@/assets/data/airbnb-listings.geo.json'
import { Listing, LocationList } from '@/assets/data/interface'
import ListingsMapView from '@/components/ui/ListingsMapView'
import ListingBottomSheet from '@/components/ui/ListingBottomSheet'

// Explore page
const Page = () => {
  const [category, setCategory] = useState('')

  const onDataChanged = (category: string) => {
    setCategory(category)
  }

  return (
    <View className='flex-1 mt-[80px]'>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />
        }}
      />
      <ListingBottomSheet category={category} listings={ListingsData as Listing[]}/>
      <ListingsMapView listings={ListingsMapData as LocationList} />
    </View>
  )
}

export default Page