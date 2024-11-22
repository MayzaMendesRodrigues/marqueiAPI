import jwt from "jsonwebtoken"
const secretToken =  "testeSecredo"

function CreateToken(id_user) {
    const token = jwt.sign({id_user}, secretToken, {
        expiresIn: 1234
    });
    return token
}
function ValidateToken(req, res, next){
    const authToken = req.headers.authorization

    if(!authToken)
        return res.status(401).json({ error: "token nao autorizado"})

    const [bearer, token] = authToken.split(" ")

    jwt.verify(token, secretToken, (err, decode)=> {
        if(err)
            return res.status(401).json({error: "token invalido"})

        req.id_user = decode.id_user
        next()
    })
}

export default {CreateToken, ValidateToken}
