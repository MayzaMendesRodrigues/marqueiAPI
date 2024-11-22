import servicePro from '../services/service.pro.js'

async function Listar( req, res) {
    try{
        const name = req.query.name
        const pro = await servicePro.Listar(name)
    
        res.status(200).json(pro)
    } catch (error) {
        console.error("Erro ao listar profissionais:", error);
        res.status(500).json({ error: "Erro ao listar profissionais." });
    }
   
};

async function Inserir( req, res) {
    /*
    const name = req.body.name 
    const specialty = req.body.specialty
    const icon = req.body.icon
    */

    const {name, specialty, icon} = req.body
    if (!name || !specialty) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    } try {
        const pro = await servicePro.Inserir(name, specialty, icon)
        res.status(200).json(pro)
    }catch {
        console.error("Erro ao inserir profissional:", error);
        res.status(500).json({ error: "Erro ao inserir profissional." });
    }

};

async function Editar( req, res) {
    const id_pro = req.params.id_pro
    const {name, specialty, icon} = req.body
    if (!name || !specialty || !icon) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }
    try{
        const pro = await servicePro.Editar(id_pro, name, specialty, icon)
        res.status(200).json(pro);

    } catch (error) {
        console.error("Erro ao editar profissional:", error);
        res.status(500).json({ error: "Erro ao editar profissional." });
    }
};

async function Delete ( req, res) {
    const id_pro = req.params.id_pro
    try{
        const pro = await servicePro.Delete(id_pro)
        res.status(200).json(pro)
    } catch (error) {
        console.error("Erro ao deletar profissional:", error);
        res.status(500).json({ error: "Erro ao deletar profissional." });
    }
   
}


async function ListarServices( req, res) {
    const id_pro = req.params.id_pro
    try {
        const serv = await servicePro.ListarServices(id_pro);
        res.status(200).json(serv);
    }catch (error) {
        console.error("Erro ao listar serviços do profissional:", error);
        res.status(500).json({ error: "Erro ao listar serviços do profissional." });
    }


};
export default {Listar, Inserir, Editar, Delete, ListarServices}
