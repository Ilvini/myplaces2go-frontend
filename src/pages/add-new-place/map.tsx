import React, { useEffect } from 'react'
import GoogleMapReact, { Position } from 'google-map-react'
import { useRouter } from 'next/router'
import styleGoogleMaps from '../../styles/googleMapsStyle/main'
import { Icon } from '@iconify/react'

interface Position {
  lat: number
  lon: number
}

const MapAddNewPlace = () => {
  const [location, setLocation] = React.useState<Position>({
    lat: 0,
    lon: 0,
  })

  let locationParams = useRouter().query
  console.log(locationParams)

  const CurrentLocationMarker = () => (
    <Icon
      icon="fa:map-marker"
      fontSize={32}
      className="-translate-x-2 -translate-y-2"
      color="red"
    />
  )

  function handleSetLocationOnNewPlace() {
    locationParams.lat = location.lat
    locationParams.lon = location.lon
    console.log(locationParams)
  }

  useEffect(() => {
    setLocation({
      lat: Number(locationParams.lat),
      lon: Number(locationParams.lon),
    })
  }, [])
  const handleApiLoaded = (map: any, maps: any) => {
    // use map and maps objects
    map.setOptions({
      disableDefaultUI: true,
      zoomControl: true,
      center: {
        lat: locationParams.lat,
        lng: locationParams.lon,
      },
      zoom: 16,
    })
    maps.event.addListener(map, 'click', function (e: any) {})
  }
  /*   useEffect(() => {
    let locationParams = useRouter().query
    locationParams.lat = location.lat
    locationParams.lon = location.lon
  }, [location]) */

  return (
    <section className="w-full h-full ">
      {locationParams.lat && locationParams.lon && (
        <GoogleMapReact
          style={{ width: '100%', height: '100%' }}
          bootstrapURLKeys={{ key: 'AIzaSyAXVy2ejGB5cOb_FPd0J2mhxaMjJ4It6JA' }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          onClick={(e) => {
            setLocation({
              lat: e.lat,
              lon: e.lng,
            })
            console.log(e)
          }}
          defaultCenter={{
            lat: Number(locationParams.lat),
            lng: Number(locationParams.lon),
          }}
          defaultZoom={14}
          options={{
            styles: styleGoogleMaps,
          }}
        >
          <CurrentLocationMarker lat={location.lat} lng={location.lon} />
        </GoogleMapReact>
      )}

      <button
        className="absolute bottom-0 text-xl px-4 py-6 w-full bg-brand-green-300 text-white"
        onClick={() => handleSetLocationOnNewPlace()}
      >
        Salvar Localização
      </button>
    </section>
  )
}

export default MapAddNewPlace

