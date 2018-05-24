import { Notifications, Permissions } from 'expo'
import { AsyncStorage, Platform, Alert } from 'react-native'
import moment from 'moment'

const NOTIFICATION_KEY = 'MobileFlashcards:notifications'

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()
              const localNotification = {
                title: 'Practice your stuff!',
                body: "Hey! Don't forget to practice your decks today!",
                data: {
                  type: 'delayed',
                },
                ios: {
                  sound: true,
                }
              }
              const time = new moment().add(1, 'day')
              // const time = new moment().add(1, 'second') //Use this to test notifications
              time = time.toDate()

              Notifications.scheduleLocalNotificationAsync(
                localNotification, { time, repeat: 'day' }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}