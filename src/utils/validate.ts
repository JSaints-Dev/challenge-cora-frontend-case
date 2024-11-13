import { allCharactersTheSame } from "./all-characters-the-same"

const validateCPF = (value: string) => {
  const valueSanitized = value.replace(/\D/g, '')
  if (valueSanitized === '') return false
  if (valueSanitized.length !== 11) return false
  if (allCharactersTheSame(valueSanitized)) return false

  function reducerCpfDigits(arr: number[], peso: number[]) {
    const result = arr.reduce((acc, el, id) => acc + el * peso[id], 0)
    return result
  }

  function isValid(cpf: string) {
    const size = cpf.length - 2
    const numbers = cpf.substring(0, size)
    const lastDigits = cpf.substring(size)
    const isValid = digitsChecker(numbers, lastDigits)
    return isValid
  }

  function calcLastDigits(valueInt: number) {
    const digit = valueInt % 11
    return digit < 2 ? 0 : 11 - digit
  }

  function digitsChecker(firstDigit: string, lastDigits: string) {
    const [firstVerifier, secondVerifier] = lastDigits
      .split('')
      .map((el) => +el)
    const numbersArr = firstDigit.split('').map((el) => +el)
    const peso = [10, 9, 8, 7, 6, 5, 4, 3, 2]
    const firstCalc = reducerCpfDigits(numbersArr, peso)
    const digit10 = calcLastDigits(firstCalc)
    if (digit10 !== firstVerifier) return false
    numbersArr.push(digit10)
    const peso2 = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]
    const secondCalc = reducerCpfDigits(numbersArr, peso2)
    const digit11 = calcLastDigits(secondCalc)
    return digit11 === secondVerifier
  }
  return isValid(valueSanitized)
}

export const validate = {
  cpf: validateCPF,
}
