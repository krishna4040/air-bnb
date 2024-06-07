import React from 'react'
import { Tabs } from 'expo-router'
import { FontAwesome, FontAwesome5, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarLabelStyle: {
          // fontSize: 'mono-sb'
        }
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: (icon) => <FontAwesome name='search' color={icon.color} size={icon.size} />
        }}
      />

      <Tabs.Screen
        name='wishlist'
        options={{
          tabBarLabel: 'Wishlist',
          tabBarIcon: (icon) => <Ionicons name='heart-outline' color={icon.color} size={icon.size} />
        }}
      />

      <Tabs.Screen
        name='trips'
        options={{
          tabBarLabel: 'Trips',
          tabBarIcon: (icon) => <FontAwesome5 name='airbnb' color={icon.color} size={icon.size} />
        }}
      />

      <Tabs.Screen
        name='inbox'
        options={{
          tabBarLabel: 'Inbox',
          tabBarIcon: (icon) => <MaterialCommunityIcons name='message-outline' color={icon.color} size={icon.size} />
        }}
      />

      <Tabs.Screen
        name='profile'
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: (icon) => <Ionicons name='person-circle-outline' color={icon.color} size={icon.size} />
        }}
      />
    </Tabs>
  )
}

export default TabLayout