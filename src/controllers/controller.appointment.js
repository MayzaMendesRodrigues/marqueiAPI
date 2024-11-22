import serviceAppointment from "../services/service.appointment.js";

async function ListarbyUser(req, res) {
    const id_user = req.id_user;

 try{
    const appointments = await serviceAppointment.Listar(id_user, "","","")

res.status(200).json(appointments)
 } catch (error) {
    console.error (error)
    res.status(500).json({ error: "Erro ao listar agendamentos." });

 }


  
}

async function Inserir( req, res) {
 
    const id_user = req.id_user
    const {
        id_pro,
        id_service,
        booking_date, booking_hour
    } = req.body


if (!id_pro || !id_service || !booking_date || !booking_hour) {
    return res.status(400).json({
        error: "Todos os campos (id_pro, id_service, booking_date, booking_hour) são obrigatórios."})
    } try {
        const appointment = await serviceAppointment.Inserir(id_user, id_pro, id_service, booking_hour, booking_date)
        res.status(200).json(appointment)

    } catch (error) {
        res.status(500).json({ error: "Erro ao inserir agendamento." });
    }
};


async function Delete( req, res) {
 
    const id_user = req.id_user
    const id_appointment = req.params.id_appointment
 try {
    const appointment = await serviceAppointment.Delete(id_user, id_appointment)
    res.status(200).json({ message: "Agendamento deletado com sucesso.", appointment })
 }catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar agendamento." });
}

};

async function Listar(req, res) {
    const dt_start = req.query.dt_Start;
    const dt_end = req.query.dt_End
    const id_pro = req.query.id_pro

 try{
    const appointments = await serviceAppointment.Listar(0, dt_start, dt_end, id_pro)

res.status(200).json(appointments)
 } catch (error) {
    console.error (error)
    res.status(500).json({ error: "Erro ao listar agendamentos." });

 }


  
}

export default {ListarbyUser, Inserir,Delete, Listar}