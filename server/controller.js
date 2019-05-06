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
  }


}