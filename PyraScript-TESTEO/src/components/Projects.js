import React from 'react';

const Projects = () => {
  const projects = [
    { id: 1, name: 'Proyecto 1', description: 'Descripción del proyecto 1' },
    { id: 2, name: 'Proyecto 2', description: 'Descripción del proyecto 2' },
  ];

  return (
    <div>
      <h2>Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;