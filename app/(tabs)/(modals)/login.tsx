import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { defaultStyles } from '@/constants/styles'
import { Ionicons } from '@expo/vector-icons'
import { useOAuth } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'

enum Strategy {
  Google = "oauth_google",
  Apple = "oauth_apple",
  Facebook = "oauth_facebook"
}

const Page = () => {
  const router = useRouter()

  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: 'oauth_apple' })
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' })
  const { startOAuthFlow: facebookAuth } = useOAuth({ strategy: 'oauth_facebook' })

  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Apple]: appleAuth,
      [Strategy.Facebook]: facebookAuth
    }[strategy];
    try {
      const { createdSessionId, setActive } = await selectedAuth()
      if (createdSessionId) {
        setActive!({ session: createdSessionId })
        router.back()
      }
    } catch (error) {
      console.log('OAuth error: ', error)
    }
  }

  return (
    <View className='flex-1 bg-white p-6'>
      <TextInput
        autoCapitalize='none'
        placeholder='Email'
        style={[defaultStyles.inputField]}
        className=''
      />
      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>

      <View className='flex flex-row'>
        <View className='border-black gap-2 items-center my-7'></View>
        <Text className=''>or</Text>
      </View>

      <View className='gap-5'>
        <TouchableOpacity className='bg-white border border-gray-500 h-12 rounded-lg items-center justify-center flex flex-row px-2'>
          <Ionicons name='call-outline' style={defaultStyles.btnIcon} size={24} />
          <Text className='text-black'>Continue with Phone</Text>
        </TouchableOpacity>

        <TouchableOpacity className='bg-white border border-gray-500 h-12 rounded-lg items-center justify-center flex flex-row px-2' onPress={() => onSelectAuth(Strategy.Apple)}>
          <Ionicons name='logo-apple-ar' style={defaultStyles.btnIcon} size={24} />
          <Text className='text-black'>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity className='bg-white border border-gray-500 h-12 rounded-lg items-center justify-center flex flex-row px-2' onPress={() => onSelectAuth(Strategy.Google)}>
          <Ionicons name='logo-google' style={defaultStyles.btnIcon} size={24} />
          <Text className='text-black'>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity className='bg-white border border-gray-500 h-12 rounded-lg items-center justify-center flex flex-row px-2' onPress={() => onSelectAuth(Strategy.Facebook)}>
          <Ionicons name='logo-facebook' style={defaultStyles.btnIcon} size={24} />
          <Text className='text-black'>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Page