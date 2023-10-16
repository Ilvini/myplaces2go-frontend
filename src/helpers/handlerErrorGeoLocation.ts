export default function locationError(error: any) {
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
