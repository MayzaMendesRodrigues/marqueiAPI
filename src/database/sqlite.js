import sqlite3 from "sqlite3";

const SQLite = sqlite3.verbose();

const db = new SQLite.Database("./src/database/banco.db", SQLite.OPEN_READWRITE, (err) => {
    if (err) {
        return console.log("Erro ao conectar com o banco de dados: " + err.message);
    }
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
});

function query(command, params = [], method = 'all') {
    return new Promise((resolve, reject) => {
        db[method](command, params, (error, result) => {
            error ? reject(error) : resolve(result);
        });
    });
}

export { db, query };
