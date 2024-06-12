import { View, Text } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet'
import Listings from './Listings'
import { Listing } from '@/assets/data/interface'
import Colors from '@/constants/Colors'
import { TouchableOpacity } from '@gorhom/bottom-sheet'
import { Ionicons } from '@expo/vector-icons'

interface Props {
    listings: Listing[]
    category: string
}

const ListingBottomSheet = ({listings, category}: Props) => {
    const bottomSheetRef = useRef<BottomSheet>(null)
    const snapPoints = useMemo(() => ['10%', '100%'], [])
    const [refresh, setRefresh] = useState(0)

    const showMap = () => {
        bottomSheetRef.current?.collapse()
        setRefresh(refresh + 1)
    }

    return (
        <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}
            handleIndicatorStyle={{backgroundColor: Colors.grey}}
            style={{
                backgroundColor: '#fff',
                borderRadius: 10,
                elevation: 4,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
            }}
        >
            <View className='flex-1'>
                <Listings listings={listings} category={category} refresh={refresh} />
                <View className='absolute bottom-7 w-full items-center'>
                    <TouchableOpacity onPress={showMap} className={`bg-[${Colors.dark} p-4 h-12 flex flex-row items-center rounded-md gap-2`}>
                        <Text className='text-white'>Map</Text>
                        <Ionicons name='map' size={20} />
                    </TouchableOpacity>
                </View>
            </View>
        </BottomSheet>
    )
}

export default ListingBottomSheet