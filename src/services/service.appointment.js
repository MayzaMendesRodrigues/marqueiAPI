import repositoryAppointment from "../repositories/repository.appointment.js"
async function Listar(id_user, dt_start, dt_end, id_pro) {
    try{
        const appointments = await repositoryAppointment.Listar(id_user, dt_start, dt_end, id_pro)
        return appointments
    } catch (error) {
        console.error("Erro ao listar agendamentos:", error);
        throw new Error("Erro ao buscar agendamentos.");
    } 
}

async function Inserir (id_user, id_pro, id_service, booking_hour, booking_date) {
    if (!id_user || !id_pro || !id_service || !booking_hour || !booking_date) {
        throw new Error("Todos os campos são obrigatórios para criar um agendamento.");
    }
    try{
        const appointment = await repositoryAppointment.Inserir(id_user, id_pro, id_service, booking_hour, booking_date)
        return appointment
    }catch (error){
        console.error("Erro ao inserir agendamento:", error);
        throw new Error("Erro ao criar agendamento.");
    }  
}


async function Delete (id_user, id_appointment) {
    if (!id_user || !id_appointment) {
        throw new Error("ID do usuário e ID do agendamento são obrigatórios para deletar um agendamento.");
    }try{
        const appointment = await repositoryAppointment.Excluir(id_user, id_appointment)
        return appointment
    }catch (error){
        console.error("Erro ao excluir agendamento:", error);
        throw new Error("Erro ao deletar agendamento.");
    }
   
}

export default{Listar, Inserir, Delete}


