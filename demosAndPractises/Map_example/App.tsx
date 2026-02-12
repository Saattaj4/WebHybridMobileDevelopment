import React, {useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import Map from './components/Map';
import { Region, Marker } from 'react-native-maps';
import * as Location from 'expo-location';



export default function App() {
  const [location, setLocation] = useState<Region>({
    latitude: 65.0000,
    longitude: 25.4800,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  const [heading, setHeading] = useState<number>(0)


  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null

    getCurrentLocation()

    const startCompassTracking = async(): Promise<void> => {
      try {
        const hasCompass = await Location.hasServicesEnabledAsync()
        if (!hasCompass){
          console.log("Compass not available")
          return
        }

          subscription = await Location.watchHeadingAsync((
            headingData) => {
              setHeading(headingData.trueHeading || headingData.magHeading)
            })

      } catch (error) {
        console.log("Compass error " + error)
        }
      }
      startCompassTracking()
      
      return () => {
        if (subscription) {
          subscription.remove();
        }
      };
    }, [])

  const getCurrentLocation = async (): Promise<void> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      
      const getCurrentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
      })
      setLocation({
        ...location,
        latitude: getCurrentLocation.coords.latitude,
        longitude: getCurrentLocation.coords.longitude,
      })

    } catch (error) {
      console.log(error)
    }
  }



  return (
    <Map region={location} heading={heading} />
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
