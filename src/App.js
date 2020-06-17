import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css';

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  function handleAddRepository(event) {
    event.preventDefault();

    if (!title) {
      document.getElementById('title').focus();
    } else {
      api.post('/repositories', { title }).then(response => {
        setRepositories([...repositories, response.data]);
        setTitle('');
      });
    }
  }

  function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then(response => {
      if (response.data.message === 'Success') {
        const repositoriesUpdate = repositories.filter(
          repository => repository.id !== id,
        );

        setRepositories(repositoriesUpdate);
      }
    });
  }

  return (
    <div>
      <h1>CRUD Repositories</h1>
      <div className="repositoriesContainer">
        {repositories.map(repository => (
          <div key={repository.id} className="repositoryContainer">
            <h3>{repository.title}</h3>
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remove repository
            </button>
          </div>
        ))}
      </div>

      <div className="containerFormRepository">
        <form>
          <input
            type="text"
            name="title"
            id="title"
            onChange={event => setTitle(event.target.value)}
            value={title}
          />
          <br />
          <button onClick={event => handleAddRepository(event)}>
            Create repository
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
