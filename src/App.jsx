import { useState, useEffect, useRef } from "react";
import { UsersResults } from "./Service/api";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [showColor, setShowColor] = useState(false);
  const [sort, setSort] = useState(false);
  const [filterByCountry, setFilterBycountry] = useState("");
  const [sortByName, setSortByName] = useState(false);
  const [sortByLastName, setSortByLastName] = useState(false);

  const Original = useRef([]);

  useEffect(() => {
    const getUsers = async () => {
      const users = await UsersResults();
      setUsers(users);
      Original.current = users;
    };
    getUsers();
  }, []);

  const filterUsers = filterByCountry
    ? users.filter((user) =>
        user.location.country
          .toLowerCase()
          .includes(filterByCountry.toLowerCase())
      )
    : users;

  let data = users;

  const sortByCountry = filterUsers.toSorted((a, b) => {
    return a.location.country.localeCompare(b.location.country);
  });

  const sortName = filterUsers.toSorted((a, b) => {
    return a.name.first.localeCompare(b.name.first);
  });

  const sortLastName = filterUsers.toSorted((a, b) => {
    return a.name.last.localeCompare(b.name.last);
  });

  if (sortByName) data = sortName;
  if (sortByLastName) data = sortLastName;
  if (sort) data = sortByCountry;

  const handleDelete = (id) => {
    const newUser = users.filter((user) => user.login.uuid !== id);
    setUsers(newUser);
  };

  return (
    <div className="App">
      <header>
        <h1>Table of Users</h1>
        <div className="buttons">
          <button onClick={() => setShowColor(!showColor)}>
            Coloring Files
          </button>
          <button onClick={() => setSort((prev) => !prev)}>
            {sort ? "Not Sorted" : "Sort by Contry"}
          </button>
          <button onClick={() => setUsers(Original.current)}>Reset</button>
          <span>
            <input
              type="text"
              value={filterByCountry}
              placeholder="Filter by Country"
              onChange={(e) => setFilterBycountry(e.target.value)}
            />
          </span>
        </div>
      </header>
      <main>
        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th onClick={() => setSortByName((prev) => !prev)}>Firts Name</th>
              <th onClick={() => setSortByLastName((prev) => !prev)}>
                Last Name
              </th>
              <th onClick={() => setSort((prev) => !prev)}>Country</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => {
              const backgroundColor = index % 2 === 0 ? "#333" : "#555";
              const styleColor = showColor ? backgroundColor : "";
              return (
                <tr
                  key={user.login.uuid}
                  style={{ backgroundColor: styleColor }}
                >
                  <td>
                    <img src={user.picture.thumbnail} alt={user.name.first} />
                  </td>
                  <td>{user.name.first}</td>
                  <td>{user.name.last}</td>
                  <td>{user.location.country}</td>
                  <td>
                    <button onClick={() => handleDelete(user.login.uuid)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default App;
