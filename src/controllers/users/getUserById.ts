import { db, auth } from '../../database/firebase'

export const getUserById = (req, res, next) => {
  const userId = req.params.id
  console.log('getting info for user with id', userId)
  db.collection('users').doc(userId).get()
    .then(snapshot => {
      res.json(snapshot.data())
    }
    )
    .catch(e => {
      console.log('error getting user by id', userId)
      res.status(400)
      res.json(e)
    })
}
