import React, { useState, useEffect } from 'react';

import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: 'Front-end com ReactJS',
      owner: 'Bernardo Generoso',
      url: 'https://github.com/bernardogeneroso',
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);

    if (response.data.message === 'Success') {
      const repository = repositories.filter(
        repository => repository.id !== id,
      );

      setRepositories(repository);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Create</button>
    </div>
  );
}

export default App;
