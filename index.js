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
  1: "There was a generic server error",
  2: "Internal logic error",
  3: "Access permission to the server was denied",
  4: "Callback routine requested an abort",
  5: "The database file is locked and cannot be accessed",
  6: "A table in the database is locked and cannot be accessed",
  7: "A malloc() has failed",
  8: "Attempt to write to a read-only database has failed",
  9: "The operation was terminated by sqlite3_interrupt",
  10: "A disk I/O error occurred while accessing the database",
  11: "The database disk image is malformed",
  12: "Unknown opcode in sqlite3_file_control()",
  13: "The insertion failed because the database is full",
  14: "Unable to open the database file",
  15: "The database lock threw a protocol error",
  16: "Internal use only",
  17: "The string or BLOB exceeds the size limit available to it",
  18: "The database scheme has changed",
  19: "The request aborted due to a constraint violation",
  20: "There was a data type mismatch",
  21: "The library was used incorrectly",
  22: "OS features were used that are not supported on the host",
  23: "Authorization for accessing the database was denied",
  24: "Not used",
  25: "The 2nd parameter to sqlite3_bind was out of range",
  26: "A file was opened that is not a database file",
  27: "Notifications from sqlite3_log()",
  28: "Warning from sqlite3_log()",
  100: "sqlite3_step() has another row ready",
  101: "sqlite3_step() has finished executing",
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
      const message = errors[error.errno] || 'We ran into an error';
      res.status(500).json({ message, error });
    }
  });

  //DELETE /api/zoos/:id
  server.delete('/api/zoos/:id', async (req, res) => {
    try {
      const count = await db('zoos')
        .where({ id: req.params.id })
        .del();
  
      if (count > 0) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: 'Records not found' });
      }
    } catch (error) {
      const message = errors[error.errno] || 'We ran into an error';
      res.status(500).json({ message, error });

    }
  });

  //PUT /api/zoos/:id

  server.put('/api/zoos/:id', async (req, res) => {
    try {
      const count = await db('zoos')
        .where({ id: req.params.id })
        .update(req.body);
  
      if (count > 0) {
        const zoo = await db('zoos')
          .where({ id: req.params.id })
          .first();
  
        res.status(200).json(zoo);
      } else {
        res.status(404).json({ message: 'Records not found' });
      }
    } catch (error) {
      const message = errors[error.errno] || 'We ran into an error';
      res.status(500).json({ message, error }); 
    }
  });
//////////////////////////////////////////////////BEARS////////////////////////////////////////
  //POST /api/bears

server.post('/api/bears', async (req, res) => {
  try {
    const [id] = await db('bears').insert(req.body)

    const bear = await db('bears').where({ id }).first()
    res.status(201).json(bear)
  } catch (error) {
    const message = errors[error.errno] || 'We ran into an error';
    res.status(500).json({ message, error });
  }
  
});
//GET /api/bears

server.get('/api/bears', async (req, res) => {
  try {
    const bears = await db('bears')
    res.status(200).json(bears)
  } catch(error){
    const message = errors[error.errno] || 'We ran into an error';
    res.status(500).json({ message, error });
  }
});

  //GET /api/bears/:id

  server.get('/api/bears/:id', async (req, res) => {
    try {
      const bear = await db('bears')
        .where({ id: req.params.id })
        .first();
      res.status(200).json(bear);
    } catch (error) {
      const message = errors[error.errno] || 'We ran into an error';
      res.status(500).json({ message, error });
    }
  });

  //DELETE /api/zoos/:id
  server.delete('/api/bears/:id', async (req, res) => {
    try {
      const count = await db('bears')
        .where({ id: req.params.id })
        .del();
  
      if (count > 0) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: 'Records not found' });
      }
    } catch (error) {
      const message = errors[error.errno] || 'We ran into an error';
      res.status(500).json({ message, error });

    }
  });

  //PUT /api/zoos/:id

  server.put('/api/bears/:id', async (req, res) => {
    try {
      const count = await db('bears')
        .where({ id: req.params.id })
        .update(req.body);
  
      if (count > 0) {
        const bear = await db('bearss')
          .where({ id: req.params.id })
          .first();
  
        res.status(200).json(bear);
      } else {
        res.status(404).json({ message: 'Records not found' });
      }
    } catch (error) {
      const message = errors[error.errno] || 'We ran into an error';
      res.status(500).json({ message, error }); 
    }
  });


  

const port = 4000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
