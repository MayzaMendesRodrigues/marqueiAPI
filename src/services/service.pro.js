import repositoryPro from '../repositories/repository.pro.js'


 async function Listar(name) {
     return await repositoryPro.Listar(name)  
}


async function Inserir (name, specialty, icon) {
 return await repositoryPro.Inserir(name, specialty, icon)

}

async function Editar (id_pro, name, specialty, icon) {
 
  return await repositoryPro.Editar(id_pro, name, specialty, icon)

  
}

async function Deletar (id_pro) {
 return await repositoryPro.Deletar(id_pro)

}


async function ListarServices(id_pro) {
    const serv = await repositoryPro.Listar(id_pro)

    return serv

  
}

export default {Listar, Inserir, Editar, Deletar, ListarServices}
