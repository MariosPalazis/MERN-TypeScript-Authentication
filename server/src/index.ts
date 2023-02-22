import express from 'express';
import * as mongoose from 'mongoose'
import * as dotenv from "dotenv";
import { MongooseOptions } from './interfacesMain';
import {userRoute} from './routes/users';
import bodyParser from 'body-parser';


dotenv.config();
const app = express()

app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const PORT = 9000

app.get('/', (req: express.Request, res: express.Response) => {
    res.setHeader('Content-Type', 'text/html')
    res.end('<h1>Hello World</h1>')
})
app.use('/users', userRoute);

const url:any = process.env.DB_CONNECT;
const options: MongooseOptions = {
    useNewUrlParser : true,
    useUnifiedTopology: true,
    dbName: 'TestAuth',
}
mongoose.connect(url, options)
  .then(() => {
    console.log('Connected to the Database.');
  })
  .catch(err => console.error(err));


app.listen(PORT, () => console.log(`app running on port ${PORT}`))