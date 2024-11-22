import serviceUser from "../services/service.user.js"

async function Inserir( req, res) {
    const { name, email, password} = req.body
    if (!name|| !email || !password) {
        return res.status(400).json({
            error: "Todos os campos são obrigatórios." 
        })
    }
    try{
        const user = await serviceUser.Inserir(name, email, password)
        res.status(200).json(user)
    }catch(error) {
        console.error(error)
        res.status(500).json({error: "Erro ao criar o usuário."})
    }
};

async function Login( req, res) {
    const { email, password} = req.body

    try{
        const user = await serviceUser.Login( email, password)
        if (!user || user.length === 0) {
            res.status(401).json({error:"Email ou senha inválidos"})
         }else {
             res.status(200).json(user)
         }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro interno do servidor." });
    }

}
async function Profile( req, res) {
 const id_user = req.id_user
 try{
    const user = await serviceUser.Profile(id_user)
    if(!user) {
        res.status(404).json({error: "Perfil do usuario nao encontrado."})
    }


    res.status(200).json(user)
 } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao carregar o perfil do usuário." })
 }

}

async function InserirAdm( req, res) {
    const { name, email, password} = req.body
    if (!name|| !email || !password) {
        return res.status(400).json({
            error: "Todos os campos são obrigatórios." 
        })
    }
    try{
        const user = await serviceUser.InserirAdm(name, email, password)
        res.status(200).json(user)
    }catch(error) {
        console.error(error)
        res.status(500).json({error: "Erro ao criar o usuário."})
    }
};

async function LoginAdm( req, res) {
    const { email, password} = req.body

    try{
        const user = await serviceUser.LoginAdm( email, password)
        if (!user || user.length === 0) {
            res.status(401).json({error:"Email ou senha inválidos"})
         }else {
             res.status(200).json(user)
         }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro interno do servidor." });
    }

}
export default { Inserir, Login, Profile, InserirAdm, LoginAdm}
