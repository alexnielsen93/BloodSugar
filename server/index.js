const express = require('express')
require('dotenv').config()
const app = express()
const massive = require('massive')
const session = require('express-session')
const controller = require('./controller')
var cron= require('node-cron')
app.use(express.json())

const { SESSION_SECRET, SERVER_PORT, CONNECTION_STRING, TWILIO_PHONE_NUMBER, ACCOUNT_SID, AUTH_TOKEN, MY_PHONE_NUMBER } = process.env
const client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN)







app.post('/api/schedule', (req,res)=>{
  console.log('request recieved')
  let { timeObjArr } = req.body
  timeObjArr.map(time=>{
    const { hour, minute } = time
    console.log(`time scheduled for ${hour}:${minute}`)
    
    cron.schedule(`${minute} ${hour} * * *`, ()=>{
      
      
      client.messages.create({
        body: `It's ${hour}:${minute}!  Time to test your bloodsugar!`,
        from: TWILIO_PHONE_NUMBER,
        to: MY_PHONE_NUMBER
      }).then(() => { console.log('message sent') })
      res.sendStatus(200)
      console.log(`it is ${hour}:${minute}!`)
    },
    {
      scheduled: true,
     
    }
    )}
)

res.sendStatus(200)}

)

app.use(session({


  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 100 * 60 * 60 * 24
  }

}))

massive(CONNECTION_STRING).then((database) => {
  app.set('db', database)
  console.log('database set')
  console.log(database.listTables())
  app.listen(SERVER_PORT, () => { console.log(`listening on ${SERVER_PORT}`) })
})


app.get('/api/users', controller.getUsers)
app.post('/auth/register', controller.register)
app.post('/auth/login', controller.login)
app.delete('/auth/logout', controller.logout)
app.get('/api/bloodsugar/:reading_date', controller.getBloodSugar)
app.post('/api/addreading', controller.addBloodSugar)
app.get('/api/day', controller.getDay)
app.post('/api/delete', controller.deleteReading)
app.put('/api/edit', controller.editReading)
app.get('/api/lastday', controller.getLastDay)
app.get('/api/user', controller.getUserInfo)
app.put('/api/edituser', controller.editUserInfo)
