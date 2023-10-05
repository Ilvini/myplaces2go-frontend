import React, { useEffect } from 'react'
import GoogleMapReact, { Position } from 'google-map-react'
import { Icon } from '@iconify/react'
import toast from 'react-hot-toast'
import styleGoogleMaps from '../../styles/googleMapsStyle/main'
interface PropsGoogleMapsPlaceLocation {
  lat: string
  long: string
}

export const GoogleMapsPlaceLocation = ({
  lat,
  long,
}: PropsGoogleMapsPlaceLocation) => {
  const CurrentLocationMarker = ({ text }: { text: string }) => (
    <Icon
      icon="fa:map-marker"
      fontSize={32}
      className="-translate-x-2 -translate-y-2"
      color="red"
    />
  )
  const handleApiLoaded = (map: any, maps: any) => {
    // use map and maps objects
    map.setOptions({
      disableDefaultUI: true,
      zoomControl: true,
      center: {
        lat: lat,
        lng: long,
      },
      zoom: 11,
    })
    maps.event.addListener(map, 'click', function (e: any) {
      console.log(e.latLng.lat())
      console.log(e.latLng.lng())
    })
  }

  const defaultProps = {
    center: {
      lat: Number(lat),
      lng: Number(long),
    },
    zoom: 11,
    styles: styleGoogleMaps,
  }

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: 'AIzaSyAXVy2ejGB5cOb_FPd0J2mhxaMjJ4It6JA' }}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      defaultCenter={defaultProps.center}
      defaultZoom={defaultProps.zoom}
      options={{
        styles: defaultProps.styles,
      }}
    >
      <CurrentLocationMarker lat={lat} lng={long} />
    </GoogleMapReact>
  )
}

