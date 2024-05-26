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
==> Make sure every planet is created with id and name.
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
Then, replace callback functions in routes (req: Request, res: Response) => with the functions above. (For example: the route /api/planets should use getAll function.)

Use
==> The dummy database of planets from the previous exercise.
==> Array.prototype.find higher-order function to Get One.
==> Spread operator ([...planets]) to Create.
==> Array.prototype.map higher-order function to Update.
==> Array.prototype.filter higher-order function to Delete.

Check
Use Postman to test the routes.

