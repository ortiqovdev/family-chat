import { Router } from "express";
import { getIndex , getLogin , getChat , getExit,postLogin , postMessage} from "../controllers/controller";
const router = Router()

// All GET 
router.get('/' , getIndex)
router.get('/login' , getLogin)
router.get('/chat' , getChat)
router.get('/exit' , getExit)

// All posts
router.post('/login' ,postLogin )
router.post('/message' , postMessage )



export default router;