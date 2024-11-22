import {Router} from "express"
import controllerPro from "./controllers/controller.pro.js"
import controllerUser from "./controllers/controller.user.js"
import jwt from "./token.js"
import controllerAppointment from "./controllers/controller.appointment.js"

const router = Router ()

//profissionais
router.get("/pro", jwt.ValidateToken, controllerPro.Listar )
router.post("/pro",jwt.ValidateToken,  controllerPro.Inserir )
router.put("/pro/:id_pro", jwt.ValidateToken, controllerPro.Editar)
router.delete("/pro/:id_pro",jwt.ValidateToken,  controllerPro.Delete)

//users 
router.post("/users/register", controllerUser.Inserir )
router.post("/users/login", controllerUser.Login )
router.post("/users/Profile", jwt.ValidateToken, controllerUser.Profile )
 
//adm
router.post("/adm/register", controllerUser.InserirAdm )
router.post("/adm/login", controllerUser.LoginAdm )
router.get("adm/appointments", jwt.ValidateToken, controllerAppointment.Listar)


//services
router.get("/pro/:id_pro/services", jwt.ValidateToken, controllerPro.ListarServices)
//reservas 
router.get("/appointments", jwt.ValidateToken, controllerAppointment.ListarbyUser)
router.post("/appointments", jwt.ValidateToken, controllerAppointment.Inserir)
router.delete("/appointments/:id_appointment", jwt.ValidateToken, controllerAppointment.Delete)











export default router