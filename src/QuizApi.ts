import * as express from 'express'
import * as bodyParser from 'body-parser'
import { auth, db } from './database/firebase'
import {
    createUser,
    getUserById
} from './controllers/users'

class QuizApi {
  public app
  constructor () {
    this.app = express()
    this.setMiddleware()
    this.mountRoutes()
  }

  private setMiddleware (): void {
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))
  }

  private mountRoutes (): void {
    const router = express.Router()

    router.post('/users', createUser)
    router.get('/users/:id', getUserById)

    this.app.use('/', router)
  }
}

export default new QuizApi().app
