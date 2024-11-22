import bcrypt from "bcrypt"
import repositoryUser from '../repositories/repository.user.js'
import jwt from '../token.js'

async function Inserir (name, email, password) {
    try{
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await repositoryUser.Inserir(name, email, hashPassword)
        user.token = jwt.CreateToken(user.id_user)
        return user
    }catch (error) {
        console.error("Error ao inserir ususario:", error)
        throw new Error("Error ao criar usuario")
    }
}

async function Login ( email, password) {
    try{
        const user = await repositoryUser.ListarbyEmail(email)
        if (!user) {
            console.log("usuario nao encontrado")
            return {error: "Usuario nao encontrado"}

            
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        console.log("Senha Valida", isPasswordValid)

        if(isPasswordValid){
            delete user.password
            user.token = jwt.CreateToken(user.id_user)
            return user

        }else{
                    console.log("Senha invalida")
                    return{error: "Senha invalida"}
                }
            
    }
  
     catch (error) {
       

        console.error("Erro no login do usuário:", error)

        throw new Error("Erro na autenticação do usuário.");


    }
}

    
 async function Profile(id_user) {
 try{
    const user = await repositoryUser.Profile(id_user)
    return user
 } catch (error) {
    console.error ("Erro ao buscar perfil do usuário:", error)
    throw new Error("Erro ao carregar perfil do usuário.")

 }
 
}

async function InserirAdm (name, email, password) {
    try{
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await repositoryUser.InserirAdm(name, email, hashPassword)
        user.token = jwt.CreateToken(user.id_user)
        return user
    }catch (error) {
        console.error("Error ao inserir ususario:", error)
        throw new Error("Error ao criar usuario")
    }
}

async function LoginAdm ( email, password) {
    try{
        const user = await repositoryUser.ListarbyEmailAdm(email)
        if (!user) {
            console.log("usuario nao encontrado")
            return {error: "Usuario nao encontrado"}

            
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        console.log("Senha Valida", isPasswordValid)

        if(isPasswordValid){
            delete user.password
            user.token = jwt.CreateToken(user.id_user)
            return user

        }else{
                    console.log("Senha invalida")
                    return{error: "Senha invalida"}
                }
            
    }
  
     catch (error) {
       

        console.error("Erro no login do usuário:", error)

        throw new Error("Erro na autenticação do usuário.");


    }
}
    
     
    

    



export default { Inserir, Login,Profile, InserirAdm, LoginAdm }
