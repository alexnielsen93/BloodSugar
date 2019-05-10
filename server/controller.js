const bcrypt = require('bcryptjs')

module.exports={
  getUsers: (req,res)=>{
    const db = req.app.get('db')
    db.getAllUsers().then((data)=>{
      res.status(200).send(data)
    })
  },
  register: async(req,res)=>{
    const db = req.app.get('db')
    const {registerEmail, registerFirstName, registerLastName, registerUsername, registerPassword} = req.body
    const { session } = req
    //so it works with the check e-mail sql query 
    let email = registerEmail
    let emailTaken = await(db.checkEmail({email}))
    emailTaken = +emailTaken[0].count
    if (emailTaken!==0){
      return res.sendStatus(409)
    }
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(registerPassword, salt)

    const user_id = await db.registerUser({registerEmail, registerFirstName, registerLastName, registerUsername, hash})
    session.user={
      registerUsername,
      hash,
      login_id: user_id[0]
      
    }
    res.sendStatus(200)
  },
  login: async(req,res)=>{
    console.log('login starting')
    const db = req.app.get('db')
    const {session} = req
    const {loginUsername : username} = req.body
    try{
      let user = await db.login({username})
      console.log(username)

      session.user = user[0]
      console.log(user[0])
      const authenticated = bcrypt.compareSync(req.body.loginPassword, user[0].password)
      if (authenticated){
        res.status(200).send(({authenticated, user_id: user[0].user_id}))
      }
    }
    catch(err){
      res.sendStatus(401)
    }
  },
  logout: (req,res)=>{
    req.session.destroy()
    res.sendStatus(200)
  },
  getBloodSugar:  (req,res)=>{
    console.log('getting bloodsugar')
    const db = req.app.get('db')
    // console.log(req.session.user.user_id)
    let { user_id } = req.session.user
    const { reading_date }= req.params
    console.log( req.params )
    
    if(reading_date ===""){
    db.getBloodSugar({user_id}).then((data)=>{
      console.log(data[0].reading_date)
      return res.status(200).send(data)
      
    }).catch((err)=>{console.log(`error ${err}`)})
  }
    else{
      db.getDaysReadings({user_id, reading_date}).then((data)=>{
        console.log(data)
        return res.status(200).send(data)
      }).catch(err=>{console.log(`error, ${err}`)})
    }},
  addBloodSugar: async(req, res)=>{
    console.log('adding bloodsugar')
    const db = req.app.get('db')

    let {user_id} = req.session.user
    user_id = +user_id
    let {sugar_level, reading_date, reading_time, note} = req.body
    sugar_level = +sugar_level
    console.log(typeof sugar_level)
    console.log(user_id)
    try{
      console.log(sugar_level, reading_date,reading_time,note,user_id)
      db.addReading({sugar_level, reading_date,reading_time,note,user_id}).then((data)=>{
        console.log('query came back')
        res.status(200).send(data)
      })


    } catch(err){res.sendStatus(400)}
  },
  getDay: (req,res)=>{
    console.log('getDay starting')
    const db = req.app.get('db')
    let { user_id } = req.session.user
    user_id = +user_id
    db.getDate({user_id}).then((data)=>{
      console.log(data)
      res.status(200).send(data)
    }).catch(err=>{console.log(`error ${err}`)})

  },

  deleteReading: (req, res)=>{
    console.log('delete starting')
    const db = req.app.get('db')
    let {reading_id} = req.body
    let {user_id} = req.session.user
    user_id = +user_id
    reading_id = +reading_id
    console.log( reading_id)
    db.deleteReading({reading_id, user_id}).then(data=>{
      res.status(200).send(data)
    }).catch(err=>{
      console.log(`error ${err}`)
    })
  },

  editReading: (req, res)=>{
    console.log('edit starting ')
    const db = req.app.get('db')
    let {reading_id, note, sugar_level, reading_date, reading_time} = req.body
    reading_id = +reading_id
    sugar_level = +sugar_level
    console.log(reading_id)
    db.editReading({reading_id, note, sugar_level, reading_date, reading_time}).then(()=>{
      res.sendStatus(200)
    }).catch(err=>{
      console.log(`error ${err}`)
    })

  }

}