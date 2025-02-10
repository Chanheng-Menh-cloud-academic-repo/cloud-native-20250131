var http = require('http');
//create a server object:
http.createServer(function (req, res) {
  res.write('My name is...  My name is...  Slim Shady!'); //write a response to the client
  res.end(); //end the response
}).listen(80) // the server object listens on port 80

const e1 = require('express');
var app = e1();

var bodyParser = require("body-parser");
app.use(bodyParser.json());


/*
create table empdetails ( empid int NOT NULL AUTO_INCREMENT, 
name varchar(50), emailid varchar(50), pass varchar(25), 
salary double, PRIMARY KEY (empid))

*/

/*
In the postman use the following URL
localhost:5000/reg

{
  "name":"Joe",
  "emailid":"a@gmail.com",
  "pass":"abc",
  "salary":3000
}

*/

//REG API
app.post('/reg', (req, res) => {
  const { name, emailid, pass, salary } = req.body;

  dbconnect.query('insert into empdetails (name, emailid, pass, salary) values (?, ?, ?, ?)', [name, emailid, pass, salary], (error, results) => {
      if (error) {
          console.error(error);
          res.status(500).send('Error creating user');
      } else {
          res.status(200).send('Emp Record inserted successfully');
      }
  });
});



/*
In the postman use the following URL
localhost:5000/reg

{
  "name":"Joe",
  "emailid":"a@gmail.com",
  "pass":"abc",
  "salary":3000
}
*/

//REG API
app.post('/reg', (req, res) => {
  const { name, emailid, pass, salary } = req.body;

  dbconnect.query('insert into empdetails (name, emailid, pass, salary) values (?, ?, ?, ?)', [name, emailid, pass, salary], (error, results) => {
      if (error) {
          console.error(error);
          res.status(500).send('Error creating user');
      } else {
          res.status(200).send('Emp Record inserted successfully');
      }
  });
});

/*
In the postman use the following URL :- Select GET
localhost:5000/view
*/

//VIEW ALL API GET
app.get('/view', (req, res) => {
  dbconnect.query('SELECT * FROM empdetails', (error, results) => {
      if (error) {
          console.error(error);
          res.status(500).send('Error retrieving users');
      } else {
          res.status(200).json(results);
      }
  });
});



/*
In the postman use the following URL
localhost:5000/reg

{
  "name":"Joe",
  "emailid":"a@gmail.com",
  "pass":"abc",
  "salary":3000
}
*/

//REG API
app.post('/reg', (req, res) => {
  const { name, emailid, pass, salary } = req.body;

  dbconnect.query('insert into empdetails (name, emailid, pass, salary) values (?, ?, ?, ?)', [name, emailid, pass, salary], (error, results) => {
      if (error) {
          console.error(error);
          res.status(500).send('Error creating user');
      } else {
          res.status(200).send('Emp Record inserted successfully');
      }
  });
});

/*
In the postman use the following URL :- Select GET
localhost:5000/view
*/

//VIEW ALL EMPLOYEE API GET
app.get('/view', (req, res) => {
  dbconnect.query('SELECT * FROM empdetails', (error, results) => {
      if (error) {
          console.error(error);
          res.status(500).send('Error retrieving users');
      } else {
          res.status(200).json(results);
      }
  });
});

/*
In the postman use the following URL :- Select GET
localhost:5000/search/1
*/

//SEARCH EMPLOYEE API GET
app.get('/search/:id', (req, res) => {
  const eid = req.params.id;
  dbconnect.query('select * from empdetails where empid=?', [eid], (error, results) => {
      if (error) {
          console.error(error);
          res.status(500).send('Error retrieving users');
      } else {
          res.status(200).json(results);
      }
  });
});



/*
In the postman use the following URL:- Select DELETE
localhost:5000/remove/2

*/

//Delete API
// Delete a user by ID
app.delete('/remove/:id', (req, res) => {
  const eid = req.params.id;

  dbconnect.query('delete from empdetails where empid = ?', [eid], (error, results) => {
      if (error) {
          console.error(error);
          res.status(500).send('Error deleting Employee');
  } else {
      res.status(200).send('Employee deleted successfully');
  }
  });
});



/*
In the postman use the following URL :- Select PUT
localhost:5000/update/1

{
  "name":"chan",
  "pass":"xyz"
}

*/

// Update a user by ID
app.put('/update/:id', (req, res) => {
  const eid = req.params.id;
  const { name, pass } = req.body;

  dbconnect.query('update empdetails set name = ?, pass = ? where empid = ?', [name, pass, eid], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error updating user');
    } else {
      res.status(200).send('Employee updated successfully');
    }
  })
});



// START THE EXPRESS SERVER. 5000 is the PORT NUMBER
app.listen(5000, () => console.log('EXPRESS Server Started at Port No: 5000'));
