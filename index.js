const express = require('express');
const helmet = require('helmet');

const knex = require('knex')

const knexConfig = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection : {
        filename: './data/lambda.sqlite3'
    } 
}

const db = knex(knexConfig)
const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
const errors = {
  '19': 'Another record with that value exists',
};

//POST /api/zoos

server.post('/api/zoos', async (req, res) => {
  try {
    const [id] = await db('zoos').insert(req.body)

    const zoo = await db('zoos').where({ id }).first()
    res.status(201).json(zoo)
  } catch (error) {
    const message = errors[error.errno] || 'We ran into an error';
    res.status(500).json({ message, error });
  }
  
});
//GET /api/zoos

server.get('/api/zoos', async (req, res) => {
  try {
    const zoos = await db('zoos')
    res.status(200).json(zoos)
  } catch(error){
    const message = errors[error.errno] || 'We ran into an error';
    res.status(500).json({ message, error });
  }
});

  //GET /api/zoos/:id
  server.get('/api/zoos/:id', async (req, res) => {
    try {
      const zoo = await db('zoos')
        .where({ id: req.params.id })
        .first();
      res.status(200).json(zoo);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  //DELETE /api/zoos/:id




  //PUT /api/zoos/:id

const port = 4000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
