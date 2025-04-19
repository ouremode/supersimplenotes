import { ThemeProvider } from '@react-navigation/native';
import '../global.css';

import * as Notifications from 'expo-notifications';

import { StyleSheet } from 'react-native';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { Toaster } from 'sonner-native';

import { Stack } from 'expo-router';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getDeviceId } from '~/core/services/helpers';
import { registerForPushNotificationsAsync } from '~/core/services/notifications';
import { useThemeConfig } from '~/core/theme/use-theme-config';
import axios from 'axios';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Providers = ({ children }: { children: ReactNode }) => {
  const theme = useThemeConfig();

  const [notifications, setNotifications] = useState<Notifications.Notification>();

  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();

  useEffect(() => {
    const initNotifications = async () => {
      const token = await registerForPushNotificationsAsync();
      if (token) {
        const deviceId = await getDeviceId();
        const response = await axios.post(
          'https://supersimplenotesapi.onrender.com/users/subscription',
          {
            pushToken: token,
            deviceId,
          }
        );
      }
    };

    initNotifications();

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotifications(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('response', response);
    });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }

      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <KeyboardProvider>
        <ThemeProvider value={theme}>{children}</ThemeProvider>
        <Toaster />
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
};

export default function RootLayoutNav() {
  return (
    <Providers>
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="details" />
      </Stack>
    </Providers>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
});
