import { db, auth } from '../../database/firebase'

export const createUser = (req, res, next) => {
  const { firstName, lastName, email, emailVerified, phoneNumber, password, username } = req.body
  auth.createUser({
    email,
    password
  })
    .then(userRecord => {
      db.collection('users').doc(userRecord.uid).set({
        firstName,
        lastName,
        email,
        emailVerified : 'false',
        username
      })
      res.json({
        user: {
          id: userRecord.uid,
          firstName,
          lastName,
          email,
          username
        }
      })
    })
    .catch(e => {
      console.log('something shitty happened', e)
      res.status(400)
      res.json(e)
    })
}
