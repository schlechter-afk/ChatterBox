import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Todo({ todo, index, markTodo, removeTodo }) {
  return (
    <div
      className="todo"     
    >
      <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo.text}</span>
      <div>
        <Button variant="outline-success" onClick={() => markTodo(index)}>✓</Button>{' '}
        <Button variant="outline-danger" onClick={() => removeTodo(index)}>✕</Button>
      </div>
    </div>
  );
}

function FormTodo({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };
  return (
    <Form onSubmit={handleSubmit}> 
    <Form.Group>
      <Form.Label><b>Add Todo</b></Form.Label>
      <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Add new todo" />
    </Form.Group>
    <Button variant="primary mb-3" type="submit">
      Submit
    </Button>
  </Form>
  );
}

return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">Todo List</h1>
        <FormTodo addTodo={addTodo} />
        <div>
          {todos.map((todo, index) => (
            <Card>
              <Card.Body>
                <Todo
                key={index}
                index={index}
                todo={todo}
                markTodo={markTodo}
                removeTodo={removeTodo}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}



// const initialFollowers = [
//   { id: 1, name: "John Doe" },
//   { id: 2, name: "Jane Smith" },
//   { id: 3, name: "Bob Johnson" }
// ];

// function FollowersDropdown() {
//   const [followers, setFollowers] = useState(initialFollowers);

//   function handleDelete(id) {
//     const updatedFollowers = followers.filter(follower => follower.id !== id);
//     setFollowers(updatedFollowers);
//   }

//   return (
//     <div>
//       <select>
//         {followers.map((follower, index) => (
//           <option key={index}>
//             {follower.name}
//             <button onClick={() => handleDelete(follower.id)}>Delete</button>
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

<div>
<select>
  {followers.map((follower, index) => (
    <option key={index} value={follower.name}>
      {follower.name}
    </option>
  ))}
</select>
<br />
<br />
{followers.map((follower, index) => (
  <div key={index}>
    <span>{follower.name}</span>
    <button onClick={() => handleDelete(follower.id)}>Delete</button>
  </div>
))}
</div>


////

function FollowersDropdown() {
    const [followers, setFollowers] = useState(initialFollowers);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFollower, setSelectedFollower] = useState("Select a follower");
  
    function handleDelete(id) {
      const updatedFollowers = followers.filter(follower => follower.id !== id);
      setFollowers(updatedFollowers);
      setSelectedFollower("Select a follower");
    }
  
    function handleSelect(follower) {
      setSelectedFollower(follower);
      setIsOpen(false);
    }
  
    return (
      <div className="dropdown-container">
        <div className="selected-follower" onClick={() => setIsOpen(!isOpen)}>
          {selectedFollower}
        </div>
        <div className={`dropdown-options ${isOpen ? "open" : ""}`}>
          {followers.map((follower, index) => (
            <div
              key={index}
              className="dropdown-option"
              onClick={() => handleSelect(follower.name)}
            >
              {follower.name}
              <button onClick={() => handleDelete(follower.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    );
}

////