import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"
import { env } from "@/env.mjs"

const firebase = {
  apiKey: env.NEXT_PUBLIC_API_KEY,
  authDomain: env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: env.NEXT_PUBLIC_APP_ID,
}

const app = initializeApp(firebase)
export const imageDb = getStorage(app)
export default firebase
