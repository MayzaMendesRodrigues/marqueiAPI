import {query} from '../database/sqlite.js'

 async function Inserir(name, email, password) {
try{
    let sql = `INSERT INTO users(name, email, password) VALUES(?,?,?) returning id_user`;
    const user = await query(sql, [name, email, password]);

    console.log("Usuario inserido:", user[0])
    return user [0]
}catch {
    console.error("Erro ao inserir usuário:", error);
    throw new Error("Erro ao inserir usuário no banco de dados.");
}


  
}

async function ListarbyEmail(email) {
try{
    let sql = (`SELECT * FROM users WHERE email = ?`);
    
    const user = await query(sql, [email]);
    return user.length === 0 ? null : user [0]
} catch (error) {
    console.error("Erro ao buscar usuário por email:", error);
    throw new Error("Erro ao buscar usuário no banco de dados.");
}

}


async function InserirAdm(name, email, password) {
    try{
        let sql = `INSERT INTO admins(name, email, password) VALUES(?,?,?) returning id_admin`;
        const user = await query(sql, [name, email, password]);
    
        console.log("Usuario inserido:", user[0])
        return user [0]
    }catch {
        console.error("Erro ao inserir usuário:", error);
        throw new Error("Erro ao inserir usuário no banco de dados.");
    }
    
    
      
    }
    
    async function ListarbyEmailAdm(email) {
    try{
        let sql = (`SELECT * FROM admins WHERE email = ?`);
        
        const user = await query(sql, [email]);
        return user.length === 0 ? null : user [0]
    } catch (error) {
        console.error("Erro ao buscar usuário por email:", error);
        throw new Error("Erro ao buscar usuário no banco de dados.");
    }
    
    }
    

export default {Inserir, ListarbyEmail, ListarbyEmailAdm, InserirAdm }