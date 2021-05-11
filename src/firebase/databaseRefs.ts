import { database } from './firebase'

export const userDatabase = (uid: string) => database.ref(`users/${uid}`)

export const usersDatabase = () => database.ref('users')

export const imagesFileDatabase = () => database.ref("files/images");
