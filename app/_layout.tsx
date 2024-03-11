import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from '@/components/useColorScheme';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),...FontAwesome.font,});

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const router = useRouter()

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name='(tabs)/(modals)/login' options={{
          title: 'Login or Sign-up',
          presentation: 'modal',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name='close-outline' />
            </TouchableOpacity>
          )
        }} />
        <Stack.Screen
          name='(tabs)/listing/[id]'
          options={{headerTitle: ""}}
        />
        <Stack.Screen
          name='(tabs)/(modals)/booking'
          options={{
            presentation: 'transparentModal',
            animation: 'fade',
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name='close-outline' />
            </TouchableOpacity>
            )
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
