import { StyleSheet } from 'react-native';
import MapView, { Marker, Region} from 'react-native-maps';

interface MapProps {
    region: Region
    heading: number
}

export default function Map({ region, heading }: MapProps) {
  return (
    <MapView
      style={styles.map}
      region={region}
      mapType='satellite'   //Satellite view on map
      camera={heading !== undefined ? {
        center: {
            latitude: region.latitude,
            longitude: region.longitude
        },
        pitch: 0,
        zoom: 15,
        heading: heading
      } : undefined}
    >
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          title="Your location"
          description="You are here"
          pinColor='red'
        />

      </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
