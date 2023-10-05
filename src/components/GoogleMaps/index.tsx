import React, { useEffect } from 'react'
import GoogleMapReact, { Position } from 'google-map-react'
import { Icon } from '@iconify/react'
import toast from 'react-hot-toast'
import styleGoogleMaps from '../../styles/googleMapsStyle/main'
const GoogleMaps = () => {
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
        lat: currentPosition.latitude,
        lng: currentPosition.longitude,
      },
      zoom: 11,
    })
    maps.event.addListener(map, 'click', function (e: any) {
      console.log(e.latLng.lat())
      console.log(e.latLng.lng())
    })
  }
  const [currentPosition, setCurrentPosition] = React.useState({
    latitude: 0,
    longitude: 0,
  })

  const defaultProps = {
    center: {
      lat: -22.9436732,
      lng: -43.3777179,
    },
    zoom: 11,
    styles: styleGoogleMaps,
  }

  useEffect(() => {
    if (navigator.geolocation) {
      const currentPosition = navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setCurrentPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
          console.log(position)
        },
        (error: GeolocationPositionError) => {
          console.log(locationError(error))
          toast.error(locationError(error) as string, {
            duration: 5000,
          })
        }
      )
    }
  }, [])

  function locationError(error: any) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return 'Usuário negou a solicitação de geolocalização.'
      case error.POSITION_UNAVAILABLE:
        return ' Local informado indisponível.'
      case error.TIMEOUT:
        return 'O pedido de localização do usuário expirou.'
      case error.UNKNOWN_ERROR:
        return 'Erro Desconhecido.'
    }
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
        <CurrentLocationMarker
          lat={currentPosition.latitude}
          lng={currentPosition.longitude}
        />
      </GoogleMapReact>
    </div>
  )
}

export default GoogleMaps

