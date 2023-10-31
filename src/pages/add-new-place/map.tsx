import React from 'react'
import GoogleMapReact, { Position } from 'google-map-react'
import { useRouter } from 'next/router'
import styleGoogleMaps from '../../styles/googleMapsStyle/main'
import { Icon } from '@iconify/react'
const MapAddNewPlace = () => {
  console.log()
  //get querystring
  const location = useRouter().query
  console.log(location)
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
        lat: location.lat,
        lng: location.lon,
      },
      zoom: 16,
    })
    maps.event.addListener(map, 'click', function (e: any) {})
  }

  return (
    <section className="w-full h-full">
      <GoogleMapReact
        style={{ width: '100%', height: '100%' }}
        bootstrapURLKeys={{ key: 'AIzaSyAXVy2ejGB5cOb_FPd0J2mhxaMjJ4It6JA' }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        onClick={(e) => {
          console.log(e)
        }}
        defaultCenter={{
          lat: Number(location.lat),
          lng: Number(location.lon),
        }}
        defaultZoom={14}
        options={{
          styles: styleGoogleMaps,
        }}
      ></GoogleMapReact>
    </section>
  )
}

export default MapAddNewPlace

