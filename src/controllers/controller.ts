import { Request , Response ,NextFunction } from "express";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./data.db");

export function getIndex( req:Request , res:Response ,next:NextFunction){
   res.render('index',{
      title: "Famliy chat"
  })
}
export function getLogin( req:Request , res:Response ,next:NextFunction){
   res.render("login", {
      error: req.query.e,
      title:"Login page"
    })
}
export function getChat( req:Request , res:Response ,next:NextFunction){
   if (!req.cookies.username) {
      res.redirect('/login')
      return
  }

  db.all('SELECT * FROM messages', (error, rows) => {

      const messages = rows.map((row: any) => ({
          id: row.id,
          username: row.username,
          message: row.message,
          own: row.username == req.cookies.username
      }))

      res.render('chat', {
          username: req.cookies.username,
          messages,
          title:"Famliy chat"
      })
  })
}
export function getExit( req:Request , res:Response ,next:NextFunction){
  const username = req.body.username
 res
 .clearCookie('username', username)
 .redirect('/')
}
export function postLogin( req:Request , res:Response ,next:NextFunction){
   const username = req.body.username
   const password = req.body.password
   db.get("SELECT * FROM users WHERE username = ?",[username],(error, row: any) => {
       if (row) {
         if (row.password != password) {
           res.redirect("/login?e=Parol xato")
         } else {
              res
             .cookie('username', username)
              .redirect('/chat')
         }
       } else {
         db.run("INSERT INTO users (username, password ) VALUES( ?, ?)", [username, password],(error) => {
             res
             .cookie('username', username)
             .redirect('/chat')
         })}
     })
}
export function postMessage( req:Request , res:Response ,next:NextFunction){
   if (!req.cookies.username) {
      res.redirect('/login')
      return
  }

  const message = req.body.message
  const username = req.cookies.username

  db.run('INSERT INTO messages(username, message) VALUES (?, ?)', [username, message], (error) => {
      res.redirect('/chat')
  })
}