const http = require('http');
const mysql = require('mysql2');
const faker = require('faker');

const connection = mysql.createConnection({
  host: 'mysql_database',
  user: 'root',
  password: 'root',
  database: 'fullcycle_challenge'
}).promise();

const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer(async (req, res) => {
  await connection.execute('INSERT INTO `people` (`name`) VALUES (?)', [faker.name.findName()]);

  const [results] = await connection.query(
    'SELECT * FROM `people`'
  );

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');

  const response = `
    <h1>Full Cycle Rocks!</h1>
    ${ results.map(people => `- ${ people.name }<br>`).join('') }
  `;

  res.end(response);
});

server.listen(port, hostname, async () => {
  await connection.execute(`
    create table if not exists people (
      id int auto_increment primary key,
      name varchar(100)
    )
  `);

  console.log(`Server running at http://${hostname}:${port}/`);
});