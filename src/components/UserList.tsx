import UserService, { User } from "../services/user-service";
import useUsers from "../hooks/useUsers";

// mount - fetch
// unmount - cancel
// mount - fetch

//CRUD  - Create, Read, Update, Delete

const UserList = () => {
  const { users, setUsers, error, isLoading } = useUsers();

  const delItem = (user: User) => {
    // Delete the data

    /*
    const person = {id: 1, name: "John"}

    const emp = {...person};

    emp.name = "james";
    */

    // copy the original user
    const originalUsers = [...users];

    // update the UI
    setUsers(users.filter((u) => u.id != user.id));

    // call the server
    UserService.delItem(user).catch((error) => {
      console.log(error.message);
      setUsers(originalUsers);
    });
  };

  const updateItem = (user: User) => {
    const originalUsers = [...users];

    const updatedUser = { ...user, name: user.name + " !" };

    setUsers(users.map((u) => (u.id == user.id ? updatedUser : u)));

    UserService.updateItem(updatedUser).catch((error) => {
      console.log(error.message);
      setUsers(originalUsers);
    });
  };

  const addItem = () => {
    const newUser = { id: 0, name: "Courseinn Academy" };

    const originalUsers = [...users];

    setUsers([newUser, ...users]);

    // persist the changes (sync the changes)
    //
    UserService.addItem(newUser)
      .then((response) => {
        console.log(response);
        setUsers([...users, response.data]);
      })
      .catch((error) => {
        console.log(error.message);
        0;
        setUsers(originalUsers);
      });
  };

  return (
    <>
      <h2 className="mt-3">User Data - updated</h2>

      <button className="btn btn-success mb-3" onClick={() => addItem()}>
        Add item
      </button>

      {isLoading && <div className="spinner-border"></div>}

      {error && <p className="text-danger">{error}</p>}
      <ul className="list-group">
        {users.map((user) => (
          <li className="list-group-item d-flex justify-content-between">
            {user.id} - {user.name}
            <div>
              <button
                className="btn btn-warning me-3"
                onClick={() => updateItem(user)}
              >
                Update
              </button>
              <button className="btn btn-danger" onClick={() => delItem(user)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default UserList;
