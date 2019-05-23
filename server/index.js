const express = require('express')
require('dotenv').config()
const app = express()
const massive = require('massive')
const session = require('express-session')
const controller = require('./controller')
var cron= require('node-cron')
app.use(express.json())
const MessagingResponse = require('twilio').twiml.MessagingResponse
const bodyParser = require('body-parser')

const { SESSION_SECRET, SERVER_PORT, CONNECTION_STRING, TWILIO_PHONE_NUMBER, ACCOUNT_SID, AUTH_TOKEN } = process.env
const client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN)


app.use(session({


  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 100 * 60 * 60 * 24
  }

}))

app.use(bodyParser.urlencoded({extended: false}))
app.use( express.static( `${__dirname}/../build` ) );


// app.post('/api/sms',async (req, res)=>{
//   let user_id = 0
//   const twiml = new MessagingResponse();
//   const db = req.app.get('db')
//   console.log('recieved text')
//   let string = req.body.Body
//   console.log(typeof string)
//   let splitString = string.split(', ')
//   let username = splitString[0]
//   let sugar_level = splitString[1]
//   sugar_level = +sugar_level
//   let reading_date = splitString[2]
//   let reading_time = splitString[3]
//   let note = splitString[4]
//   console.log('getting userid')

//   console.log(sugar_level, reading_date, reading_time, note)
//   try{ db.getUserID({username}, user_id).then(data=>{
//     console.log(data)
//     user_id = data[0].user_id
//     user_id = +user_id
//     console.log(user_id)
//     db.addReading({sugar_level, reading_date,reading_time,note,user_id})
//     .then((data)=>{
//       console.log('reading added, ', data)
//       twiml.message('Reading Added, thank you for using Gluco-net')
//       res.end(twiml.toString())
//     }
    
  
//   )


//   })}catch(err){
//     twiml.message('Incorect username.  Please check your input and try again')
    
//     res.end(twiml.toString())
//   }

//     console.log('adding reading',sugar_level, reading_date,reading_time,note,user_id)

// })

// app.post('/api/schedule', (req,res)=>{
//   console.log('request recieved')
//   let { timeObjArr } = req.body
//   timeObjArr.map(time=>{
//     const { hour, minute } = time
//     console.log(`time scheduled for ${hour}:${minute}`)
    
//     cron.schedule(`${minute} ${hour} * * *`, ()=>{
      
      
//       client.messages.create({
//         body: `It's ${hour}:${minute}!  Time to test your bloodsugar!`,
//         from: TWILIO_PHONE_NUMBER,
//         to: MY_PHONE_NUMBER
//       }).then(() => { console.log('message sent') })
//       res.sendStatus(200)
//       console.log(`it is ${hour}:${minute}!`)
//     },
//     {
//       scheduled: true,
     
//     }
//     )}
// )

// res.sendStatus(200)}

// )


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
