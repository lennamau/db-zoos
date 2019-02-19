const express = require('express');
const helmet = require('helmet');

const knex = require('knex')

const knexConfig = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection : {
        filename: './data/zoos.db3'
    } 
}

const db = knex(knexConfig)
const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.post('/api/zoos', (req, res) => {
  
});

const port = 4000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
