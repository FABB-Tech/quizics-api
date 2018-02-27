import { db, auth } from '../database/firebase'

export const createUser = (req, res, next) => {
  const { firstName, lastName, email, password, username } = req.body
  auth.createUser({
    email,
    password
  })
    .then(userRecord => {
      db.collection('users').doc(userRecord.uid).set({
        firstName,
        lastName,
        email,
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

export const getUserById = (req, res, next) => {
  const userId = req.params.id
  console.log('getting info for user with id', userId)
  db.collection('users').doc(userId).get()
    .then(snapshot => {res.json(snapshot.data())})
    .catch(e => {
      console.log('error getting user by id', userId)
      res.status(400)
      res.json(e)
    })
}

// Delete a document from cloud firestore
export const deleteUser = (req, res, next) => {
  const userId = req.params.id
  auth.deleteUser(userId)
  .then(() => {
    db.collection('users').doc(userId).delete()
  })
  .then(() => {
    console.log('User deleted: ', userId, ' with name: ', userId.email, ' ', userId.lastName)
    res.status(200)
    res.json('success')
  })
  .catch(e => {
    console.log('error deleting user by id', userId)
    res.status(402)
    res.json(e)
  })
}
