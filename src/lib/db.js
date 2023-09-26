import { Pool } from "pg";

let conn;
  conn = new Pool({
    user: "postgres",
    password: "Ranirakesh",
    host: "localhost",
    port: 5432,
    database: "db",
  });


export default conn ;


