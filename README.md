# NodeJS Part 2 

Exercise 1:: Set up a simple Express App

## Do

- Write simple Express server that listens on port `3000` (use dotenv to specify the port)
- Create a dummy "database" of `planets` using a `let` variable. (You will use this data in further exercises.)
- Configure your app (`app.use()`) to:
  - accept JSON from the Client
  - log the Client's requests

## Use

- Dummy database with initial data:

  ```js
  type Planet = {
    id: number,
    name: string,
  };

  type Planets = Planet[];

  let planets: Planets = [
    {
      id: 1,
      name: "Earth",
    },
    {
      id: 2,
      name: "Mars",
    },
  ];
  ```

- `express-async-errors`
- `morgan`
- 
Exercise 2:: CRUD with dummy database

Do
Write a router with the following routes:
==> GET /api/planets: return all planets (JSON) with 200
==> GET /api/planets/:id: return a planet (JSON) by id with 200
==> POST /api/planets: create a planet, return only 201 code and a success JSON with key msg
==> Make sure every planet is created with an ID and name.
==> PUT /api/planets/:id: update a planet by id, return only 200 code and a success JSON with key msg
==> DELETE /api/planets/:id: delete a planet by id, return only 200 code and a success JSON with key msg
==> Validate planet fields where appropriate.

Use
==> The dummy database of planets from the previous exercise.
==> joi library for validation.

Check
==> Use Postman to test the routes.
==> Paths POST and PUT should receive data in JSON format (req.body).

Exercise 3:: Add Controllers

Do
Add planets Controller (controllers/planets.ts) consisting of the following functions:
==> getAll
==> getOneById
==> create
==> updateById
==> deleteById.
Then, replace callback functions in routes (req: Request, res: Response) => with the functions above. (For example: the route /API/planets should use getAll function.)

Use
==> The dummy database of planets from the previous exercise.
==> Array.prototype.find higher-order function to Get One.
==> Spread operator ([...planets]) to Create.
==> Array.prototype.map higher-order function to Update.
==> Array.prototype.filter higher-order function to Delete.

Check
Use Postman to test the routes.

Exercise 4:: Add Mysql Db

Do
==> Using PgAdmin:
==> Create a MySQL DB.
==> Using a setupDb function:
==> Create planets table.
==> Populate the table with two planets (e.g. 'Earth' and 'Mars').
==> Connect your app to Postgres using Express (pg-promise). [https://github.com/vitaly-t/pg-promise]
==> Replace the dummy DB with the Postgres DB.
==> Rewrite all planet's controller functions. They should now work with the DB. (Use the SQL queries below.)

Use
==> SQL query to create the table:

DROP TABLE IF EXISTS planets;

CREATE TABLE planets(
  id SERIAL NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
);

==> Make sure all CRUD operations read from and write to MySQL (instead of the dummy db you've used in previous exercises).

GET /planets
Use this SQL query:
SELECT * FROM planets;

GET /planets/:id
Use this SQL query:
SELECT * FROM planets WHERE id=$1;
Make sure that $1 is id.

POST /planets
Use this SQL query:
INSERT INTO planets (name) VALUES ($1);
Make sure that $1 is the name.

PUT /planets/:id
Use this SQL query:
UPDATE planets SET name=$2 WHERE id=$1;
Make sure that $1 is id and $2 is name.

DELETE /planets/:id
Use this SQL query:
DELETE FROM planets WHERE id=$1;
Make sure that $1 is id.

Exercise 5:: Upload files

Do

==> Add image field to planets table in the DB.
==> Set POST /planets/:id/image route for file upload (planet's image).
==> Store the image file locally (on disk).
==> Save file path to DB (update the correct planet).

Use
==> Add image TEXT to your CREATE TABLE planets SQL query.

==> Use multer library to save files to /uploads folder.

==> Add image TEXT to CREATE TABLE planets SQL query (in your DB setup).

==> Use this SQL query to update planet's image:

UPDATE planets
SET image=$2
WHERE id=$1;
