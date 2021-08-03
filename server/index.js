const express = require("express");
const app = express();
const cors = require("cors"); // npm install cors --save
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

// ROUTES
// create todo
app.post("/todos", async (req, res) => {
  // await, for the function to complete
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get all todos
app.get("/todos", async (req, res) => {
  try {
    const allToDos = await pool.query("SELECT * FROM todo");
    res.json(allToDos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get specific todo

app.get("/todos/:id", async (req, res) => {
  try {
    //req.params
    const { id } = req.params;
    const specificTodo = await pool.query(
      "SELECT * FROM todo WHERE todo_id = $1",
      [id]
    );
    res.json(specificTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// update todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateToDo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.json("Todo was updated!");
  } catch (err) {
    console.error(err);
  }
});

// delete todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedToDo = await pool.query(
      "DELETE FROM todo WHERE todo_id = $1",
      [id]
    );
    res.json("Deleted Todo!");
  } catch (err) {
    console.error(err);
  }
});
app.listen(process.env.PORT, () => {
  console.log("server has started on port 5000");
});
