import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Link, Stack } from 'expo-router'
import { ExploreHeader } from '@/components/ui/ExploreHeader'
import Listings from '@/components/ui/Listings'

// Explore page
const Page = () => {
  const [category, setCategory] = useState('')

  const onDataChanged = (category: string) => {
    setCategory(category)
  }

  return (
    <View className='flex-1'>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />
        }}
      />
      <Listings category={category} listings={[]} />
    </View>
  )
}

export default Page