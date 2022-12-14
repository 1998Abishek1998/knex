import 'dotenv/config'
import App from './app'
import PersonRouter from './resources/user/user.route'
import { validateEnv } from './utils/validateEnv'

validateEnv()

const app = new App(
    [
      new PersonRouter()
    ],
    Number(process.env.SERVER_PORT)
)

app.listen()