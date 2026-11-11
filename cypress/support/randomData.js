// Gera dados aleatórios usando só as opções que o demoqa aceita
// (os selects de estado/cidade, matérias e hobbies têm valores fixos).
const pick = (list) => list[Math.floor(Math.random() * list.length)]
const digits = (n) => Array.from({ length: n }, () => Math.floor(Math.random() * 10)).join('')

const FIRST_NAMES = ['Ana', 'Bruno', 'Carla', 'Diego', 'Elisa', 'Felipe', 'Gabriela', 'Hugo']
const LAST_NAMES = ['Silva', 'Souza', 'Lima', 'Costa', 'Rocha', 'Alves', 'Melo', 'Barros']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const STATES = {
  NCR: ['Delhi', 'Gurgaon', 'Noida'],
  'Uttar Pradesh': ['Agra', 'Lucknow', 'Merrut'],
  Haryana: ['Karnal', 'Panipat'],
  Rajasthan: ['Jaipur', 'Jaiselmer']
}

export const randomStudent = () => {
  const firstName = pick(FIRST_NAMES)
  const lastName = pick(LAST_NAMES)
  const state = pick(Object.keys(STATES))
  const day = String(1 + Math.floor(Math.random() * 28)).padStart(2, '0')
  const year = 1970 + Math.floor(Math.random() * 35)

  return {
    firstName,
    lastName,
    email: `${firstName}.${lastName}.${digits(5)}@teste.com`.toLowerCase(),
    gender: pick(['Male', 'Female', 'Other']),
    mobile: `9${digits(9)}`,
    birthDate: `${day} ${pick(MONTHS)} ${year}`,
    subject: pick(['Maths', 'English', 'Physics', 'Chemistry', 'Computer Science']),
    hobby: pick(['Sports', 'Reading', 'Music']),
    file: 'upload.txt',
    address: `Rua ${pick(LAST_NAMES)}, ${digits(3)} - Recife/PE`,
    state,
    city: pick(STATES[state])
  }
}
