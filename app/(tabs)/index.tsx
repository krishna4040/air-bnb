import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

// Explore page
const Page = () => {
  return (
    <View>
      <Link href={'/(tabs)/(modals)/login'}>Login</Link>
      <Link href={'/(tabs)/(modals)/booking'}>Bookings</Link>
      <Link href={'/(tabs)/listing/222'}>Listing details</Link>
    </View>
  )
}

export default Page