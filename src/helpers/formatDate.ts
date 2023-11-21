/* export function formatDate(data: Date) {
  const mesesAbreviados = [
    'JAN',
    'FEV',
    'MAR',
    'ABR',
    'MAI',
    'JUN',
    'JUL',
    'AGO',
    'SET',
    'OUT',
    'NOV',
    'DEZ',
  ]
  console.log(data)
  const dia = String(data.getUTCDate()).padStart(2, '0')
  const mesAbreviado = mesesAbreviados[data.getUTCMonth()]
  const ano = data.getUTCFullYear()

  return `${dia} ${mesAbreviado} ${ano}`
} */

//crie uma função que retorna ${dia} ${mesAbreviado} ${ano}, no paramentro seria enviado a data nesse formato 20-11-2023
export function formatarData(data: string) {
  // Divide a string da data em dia, mês e ano
  const [dia, mes, ano] = data.split('-')

  // Converte o mês para abreviação
  const mesesAbreviados = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ]
  const mesAbreviado = mesesAbreviados[parseInt(mes, 10) - 1]

  // Retorna a data formatada
  return `${dia} ${mesAbreviado} ${ano}`
}
