import React, { useState } from "react";
import { BLOG_API_URL } from "../../../../api";
import NavBar from "../NavBar";
import { useNavigate } from 'react-router-dom';
import './Search.css'


const Search = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch(`${BLOG_API_URL}/users/name/${name}/`);
      const data = await response.json();

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData) {
          throw new Error(`API request failed with status ${response.status}`);
        }
      } else {
        setUsers(data);
        console.log(data);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="wrapper">
        <form action="" onSubmit={handleSubmit}>
          <h1>Search for a user</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="part of the user name"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Search</button>

          {error && <p className="error">{error}</p>}
          <div className="scroll">
            {users.length > 0 ? (
              users.map((user) => (
                <p className="p-user" key={user.id} onClick={() => navigate(`/profile/${user.id}`)}>
                  @{user.username} - {user.first_name} {user.last_name}
                </p>
              ))
            ) : (
              <p className="p-not">Not Found</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Search;
