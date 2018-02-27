import * as admin from 'firebase-admin'

import serviceAccount from './serviceAccountKey'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://quick-quizics.firebaseio.com'
})

export const db = admin.firestore()
export const auth = admin.auth()
