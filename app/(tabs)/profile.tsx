import { View, Text, Button, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { defaultStyles } from '@/constants/styles'
import { TouchableOpacity } from '@gorhom/bottom-sheet'
import Colors from '@/constants/Colors'
import * as ImagePicker from 'expo-image-picker'

const Page = () => {
  const { signOut, isSignedIn } = useAuth()
  const { user } = useUser()

  const [fname, setFname] = useState(user?.firstName)
  const [lname, setLname] = useState(user?.lastName)
  const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress)
  const [edit, setEdit] = useState(false)

  useEffect(() => {
    if (user) {
      setFname(user.firstName)
      setLname(user.lastName)
      setEmail(user.emailAddresses[0].emailAddress)
    }
  }, [user])

  const onSaveUser = async () => {
    try {
      if (!fname || !lname) {
        return
      }
      await user?.update({
        firstName: fname,
        lastName: lname
      })
    } catch (error) {
      console.log(error)
    } finally {
      setEdit(false)
    }
  }

  const onCaptureImage = async () => {
    let res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    })
    if (!res.canceled) {
      const base64 = `data:image/jpeg;base64,${res.assets[0].base64}`
      try {
        await user?.setProfileImage({ file: base64 })
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <SafeAreaView style={defaultStyles.container}>
      <View className='flex flex-row p-6 justify-between items-center'>
        <Text className='text-2xl'>Profile</Text>
        <Ionicons name='notifications-outline' size={26} />
      </View>
      {
        user &&
        <View className='card'>
          <TouchableOpacity onPress={onCaptureImage}>
            <Image
              source={{ uri: user.imageUrl }}
              className={`1-[100px] rounded-full bg-[${Colors.grey}`}
            />
          </TouchableOpacity>
          <View className='flex flex-row gap-2'>
            {
              edit ?
                <View>
                  <TextInput placeholder='First Name' value={fname || ""} onChangeText={setFname} />
                  <TextInput placeholder='Last Name' value={lname || ""} onChangeText={setLname} />
                  <TextInput placeholder='Email' value={email} onChangeText={setEmail} />
                  <Image source={{ uri: user.imageUrl }} className='1-[100px] rounded-full bg-[${Colors.grey}' />
                  <TouchableOpacity onPress={onSaveUser}>
                    <Ionicons name='checkmark-outline' size={24} color={Colors.dark} />
                    <Text>Edit</Text>
                  </TouchableOpacity>
                </View> :
                <View className='flex-1 items-center justify-center gap-0'>
                  <Text>{fname} {lname}</Text>
                  <TouchableOpacity onPress={() => setEdit(true)}>
                    <Ionicons name='create-outline' size={24} color={Colors.dark} />
                  </TouchableOpacity>
                </View>
            }
          </View>
          <Text>{email}</Text>
          <Text>Since {user.createdAt?.toLocaleDateString()}</Text>
        </View>
      }
      {isSignedIn && <Button title='Log-out' onPress={() => signOut()} />}
      {
        !isSignedIn &&
        <Link href={'/(tabs)/(modals)/login'}>
          <Text>Login</Text>
        </Link>
      }
    </SafeAreaView>
  )
}

export default Page