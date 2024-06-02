import mysql from 'mysql2/promise'

export const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "planest_db"
});

export async function setupDb() {
  const connection = await mysql.createConnection(pool);

  await connection.query(`
    DROP TABLE IF EXISTS planets;
    CREATE TABLE planets (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    );
  `);

  await connection.query(`
    INSERT INTO planets (name) VALUES ('Earth'), ('Mars');
  `);

  connection.end();
}