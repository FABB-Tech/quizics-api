import { db, auth } from '../database/firebase'

export const createUser = (req, res, next) => {
    const { name, email, password, username } = req.body
    auth.createUser({
        email,
        password
    })
    .then(userRecord => {
        db.collection('users').doc(userRecord.uid).set({
            name,
            email,
            username
        })
        res.json({
            user: {
                id: userRecord.uid,
                name,
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