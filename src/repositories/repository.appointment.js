import { query } from "../database/sqlite.js";

async function Listar(id_user, dt_start, dt_end, id_pro) {
    let filtro = []
    let sql = `
        SELECT 
            a.id_appointment, 
            s.description AS service, 
            p.name AS professional, 
            p.specialty, 
            a.booking_date, 
            a.booking_hour, 
            u.name AS user
        FROM appointments a
        JOIN services s ON s.id_service = a.id_service
        JOIN pro p ON p.id_pro = a.id_pro
        JOIN users u ON u.id_user = a.id_user
        JOIN pro_services ds ON ds.id_pro = a.id_pro AND ds.id_service = a.id_service
        WHERE a.id_appointment > 0 `

        if(id_user){
            filtro.push(id_user)
            sql = sql + "and a.id_user = ? "
        }

        if(dt_start){
            filtro.push(dt_start)
            sql = sql + "and a.booking_date >= ? "
        }

        if(dt_end){
            filtro.push(dt_end)
            sql = sql + "and a.booking_date <= ? "
        }

        if(id_pro){
            filtro.push(id_pro)
            sql = sql + "and a.id_pro = ? "
        }
        sql = sql + "order by a.booking_date, a.booking_hour"
    ;

    const appointments = await query(sql, filtro);
    return appointments;
}

async function Inserir(id_user, id_pro, id_service, booking_hour, booking_date) {
    let sql = `
        INSERT INTO appointments (id_user, id_pro, id_service, booking_hour, booking_date) 
        VALUES (?, ?, ?, ?, ?) 
        RETURNING id_appointment;
    `;
    const appointment = await query(sql, [id_user, id_pro, id_service, booking_hour, booking_date]);
    return appointment[0]; // Retorna o primeiro resultado (id_appointment)
}

async function Profile(id_user) {
    let sql = `SELECT id_user, name, email FROM users WHERE id_user = ?`;
    const user = await query(sql, [id_user]);
    return user[0]; // Retorna o primeiro resultado
}

async function Delete(id_user, id_appointment) {
    let sql = `DELETE FROM appointments WHERE id_appointment = ? AND id_user = ?`;
    await query(sql, [id_appointment, id_user]);
    return { message: "Agendamento excluído com sucesso" };
}

export default { Listar, Inserir, Profile, Delete };
