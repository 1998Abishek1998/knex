import 'dotenv/config'
import App from './app'
import LocationRouter from './resources/location/location.route'
import PersonRouter from './resources/person/person.route'
import { validateEnv } from './utils/validateEnv'

validateEnv()

const app = new App(
    [
      new PersonRouter(),
      new LocationRouter()
    ],
    Number(process.env.SERVER_PORT)
)

app.listen()