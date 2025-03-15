const sql = require("mssql");

const config = {
    user: "",
    password: "",
    server: "localhost",
    database: "sql",
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

module.exports = config;
