import QuizApi from './QuizApi'

const port = process.env.PORT || 3000

QuizApi.listen(port, err => {
  if (err) {
    return console.log(err)
  }

  return console.log(`Quick Quizicks Api running in port ${port}`)
})
