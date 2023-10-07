import React, { useEffect } from 'react'
import GoogleMapReact, { Position } from 'google-map-react'
import { Icon } from '@iconify/react'
import toast from 'react-hot-toast'
import styleGoogleMaps from '../../styles/googleMapsStyle/main'

interface PropsGoogleMaps {
  lat: number
  lon: number
}

const GoogleMaps = ({ lat, lon }: PropsGoogleMaps) => {
  console.log(lat, lon)
  const CurrentLocationMarker = ({ text }: { text: string }) => (
    <Icon
      icon="ic:round-emoji-people"
      className="-translate-x-2 -translate-y-2"
      fontSize={32}
      color="red"
    />
  )
  const handleApiLoaded = (map: any, maps: any) => {
    // use map and maps objects
    map.setOptions({
      disableDefaultUI: true,
      zoomControl: true,
      center: {
        lat: lon,
        lng: lat,
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
      lat: lat,
      lng: lon,
    },
    zoom: 11,
    styles: styleGoogleMaps,
  }

  return (
    <div className="aspect-square rounded-lg" style={{ width: '100%' }}>
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
        <CurrentLocationMarker lat={lat} lng={lon} />
      </GoogleMapReact>
    </div>
  )
}

export default GoogleMaps

