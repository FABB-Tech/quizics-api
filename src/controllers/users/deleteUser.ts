import { db, auth } from '../../database/firebase'
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
