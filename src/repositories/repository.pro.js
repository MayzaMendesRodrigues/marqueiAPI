import {query} from '../database/sqlite.js'
// Função para listar registros com filtro opcional por nome

 async function Listar(name) {
 let filtro = []
 let sql = "SELECT * FROM pro";

// Adiciona filtro de nome se fornecido

if (name) {
    sql += " WHERE name LIKE ?"
    filtro.push('%' + name +'%')
}
sql += " order by name"
const pro = await query(sql, filtro);
return pro

  
};
// Função para inserir um novo registro e retornar o ID

 async function Inserir(name, specialty, icon) {
let sql = `INSERT INTO pro(name, specialty, icon) VALUES (?,?,?) RETURNING id_pro`;
const pro = await query(sql, [name, specialty, icon]);
return pro [0] // Retorna o primeiro resultado (id_pro)
}


async function Editar(name, specialty, icon, id_pro) {

    let sql = `UPDATE pro SET name=?, specialty=?, icon=? WHERE id_pro`;
    
await query(sql, [name, specialty, icon, id_pro]);
    
    
        return (id_pro)
    
      
    }
 async function Deletar ( id_pro) {

        let sql = `delete from pro where id_pro ?`;
        
    await query(sql, [ id_pro]);
        
        
            return (id_pro)
        
          
        }
        
        async function ListarServices (id_pro) {
            let sql = `SELECT p.id_service, s.description, p.price 
             FROM pro_services p 
             JOIN services s ON  s.id_service = p.id_service
             WHERE p.id_pro = ?
             ORDER BY s.description`;
           
           const serv = await query(sql, [id_pro]);
           return serv
           
             
           };
export default {Listar, Inserir, Editar, Deletar, ListarServices }