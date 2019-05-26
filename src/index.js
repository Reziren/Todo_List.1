import React from "react";
import ReactDOM from "react-dom";
import db from "./firebase";
import "./styles.css";

//console.log(db);
function App() {
  let [todos, setTodos] = React.useState([]);
  let [txt, setTxt] = React.useState("");
  let [loading, setLoading] = React.useState(false);
  async function loadTodos() {
    setLoading(true);
    let snapshot = await db
      .collection("todos")
      .orderBy("created_at", "asc")
      .get();
    //console.log(snapshot.docs);
    //snapshot.docs.forEach(v => console.log(v.data));

    setTodos(snapshot.docs);
    setLoading(false);
  }

  async function onSubmit() {
    let newObj = { txt, created_at: new Date().getTime(), isDone: false };

    await db.collection("todos").add(newObj);

    loadTodos();
    setTxt("");
  }
  async function deleteTodo(id) {
    await db
      .collection("todos")
      .doc(id)
      .delete();
    loadTodos();
  }

  async function toggleDone(id) {
    let clone = {};
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === id) {
        console.log(todos[i].data().txt);
        clone = todos[i].data();
        await db
          .collection("todos")
          .doc(id)
          .delete();
      }
    }
    clone.isDone = !clone.isDone;
    await db.collection("todos").add(clone);
    loadTodos();
  }
  React.useEffect(() => {
    loadTodos();
  }, []);

  let doneStyle = {
    textDecoration: "line-through"
  };
  if (loading) return <div>Loading...</div>;
  return (
    <div className="div1">
      {todos.map(v => (
        <div style={v.data().isDone ? doneStyle : null} key={v.id}>
          {v.data().txt}
          <button className="button" onClick={() => toggleDone(v.id)}>
            done
          </button>
          <button className="button" onClick={() => deleteTodo(v.id)}>
            del
          </button>
        </div>
      ))}

      <hr />
      <div>
        <form
          className="form1"
          onSubmit={event => {
            event.preventDefault();
            onSubmit();
          }}
        >
          <input
            className="input1"
            type="text"
            value={txt}
            onChange={event => setTxt(event.target.value)}
          />
          <button className="button2">ADD</button>
        </form>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
