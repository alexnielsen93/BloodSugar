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
    console.log(req.session.user.user_id)
    const { session } = req
    let { user } = session
    let { user_id } = user
    console.log( typeof user_id )
    

    db.getBloodSugar({user_id}).then((data)=>{
      console.log(data[0].reading_date)
      res.status(200).send(data)
      
    }).catch((err)=>{console.log(`error ${err}`)})
  },
  addBloodSugar: async(req, res)=>{
    console.log('adding bloodsugar')
    const db = req.app.get('db')
    const {session} = req
    const {user_id} = session
    try{


    } catch(err){res.sendStatus(400)}
  }

}