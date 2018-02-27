import { db } from '../database/firebase'

export const createQuestion = (req, res, next) => {
  const {
    quizId,
    topicId,
    text,
    variables,
    answers,
    pictures
  } = req.body

  db.collection('quizzes').doc(quizId)
      .collection('topics').doc(topicId)
      .collection('questions')
      .add({
        text,
        variables,
        answers,
        pictures
      })
  res.json({
    quesiton: {
      quizId,
      topicId,
      text,
      variables,
      answers,
      pictures
    }
  })
      .then(() => {
        console.log('Document successfully written!')
      })
      .then(e => {
        console.log('Some error happened!', e)
        res.status(402)
        res.json(e)
      })
}
