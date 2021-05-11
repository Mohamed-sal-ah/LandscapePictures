import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import { config } from './configKeys'

// Your web app's Firebase configuration

const app = firebase.initializeApp(config)

export const auth = app.auth()
export const database = app.database();
export const storage = app.storage()

export default app