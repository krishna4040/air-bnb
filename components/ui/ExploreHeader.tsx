import Colors from "@/constants/Colors"
import { Ionicons, MaterialIcons } from "@expo/vector-icons"
import { Link } from "expo-router"
import { useRef, useState } from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import * as Haptics from 'expo-haptics'

interface Category {
    name: string
    icon: string
}

interface Props {
    onCategoryChanged: (category: string) => void
}

const categories: Category[] = []

export const ExploreHeader = ({onCategoryChanged}: Props) => {
    const scrollRef = useRef<ScrollView | null>(null)
    const itemRef = useRef<Array<TouchableOpacity | null>>([])
    const [activeIndex, setActiveIndex] = useState(0)

    const selectCategory = (index: number) => {
        const selected = itemRef.current[index]
        selected?.measure(x => {
            scrollRef.current?.scrollTo({
                x: x - 16,
                y: 0,
                animated: true
            })
        })
        setActiveIndex(index)
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        onCategoryChanged(categories[index].name)
    }

    return (
        <SafeAreaView>
            <View className="bg-white flex-1 h-32">
                <View className="flex flex-row items-center justify-between px-6 pb-4">
                    <Link href={'/(tabs)/(modals)/booking'} asChild>
                        <TouchableOpacity className="flex flex-row items-center gap-2 border-gray-200 border shadow-md flex-1">
                            <Ionicons name="search" size={24} />
                            <View>
                                <Text>Where to?</Text>
                                <Text>Anywhere . Any Time</Text>
                            </View>
                        </TouchableOpacity>
                    </Link>
                    <TouchableOpacity className="p-2 border border-gray-500 rounded-3xl">
                        <Ionicons name="options-outline" size={24} />
                    </TouchableOpacity>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{
                    alignItems: 'center',
                    gap: 20,
                    paddingHorizontal: 16
                }}
                    ref={scrollRef}
                >
                    {
                        categories.map((item, idx) => (
                            <TouchableOpacity
                                key={idx}
                                className={`${activeIndex === idx ? '' : ''}`}
                                ref={el => itemRef.current[idx] = el}
                                onPress={() => {
                                    selectCategory(idx)
                                }}
                            >
                                <MaterialIcons size={24} name={item.icon as any} color={activeIndex === idx ? '#000' : Colors.grey} />
                                <Text className={`${activeIndex === idx ? '' : ''}`}>{item.name}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}