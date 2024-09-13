<template>
  <div>
    <!-- GridDotBackground will be rendered behind everything else -->
    <GridDotBackground />
    <div>
      <Navbar/>
      <div class="-mt-0"><card/> </div>       
    
      
      
      
    
    <div style="color: white;">
      <h1>{{ name }}</h1>
      <div v-if="pending">Loading... </div>
      <h1>Projects examples</h1>
      <ul>
        <li v-for="project in projects" :key="project.name">
          <h2>{{ project.name }}</h2>
          <p>{{ project._id }}</p>
          <p>{{ project.description }}</p>
        </li>
      </ul>
    </div>
    
    <div style="color: white;">
      <h1>Blogs example</h1>
      <ul>
        <li v-for="blog in blogs" :key="blog.title">
          <h2>{{ blog.title }}</h2>
          <p>{{ blog.content }}</p>
        </li>
      </ul>
    </div>

    <!-- Forms for creating, updating, and deleting projects -->
    <div>
      <h1 id="header"><u>Create a New Project</u></h1>
      <form @submit.prevent="createProject">
        <div>
          <label for="name">Project Names:</label>
          <input type="text" v-model="newProject.name" id="name" required />
        </div>
        <div>
          <label for="description">Description:</label>
          <textarea v-model="newProject.description" id="description" required></textarea>
        </div>
        <button type="submit">Create Project</button>
      </form>

      <h1 id="header"><u>Update a Project</u></h1>
      <form @submit.prevent="updateProject">
        <div>
          <label for="update-id">Project ID:</label>
          <input type="text" v-model="selectedProject.id" id="update-id" required />
        </div>
        <div>
          <label for="update-name">Update Project Name:</label>
          <input type="text" v-model="selectedProject.name" id="update-name" required />
        </div>
        <div>
          <label for="update-description">Update Project Description:</label>
          <textarea v-model="selectedProject.description" id="update-description" required></textarea>
        </div>
        <button type="submit">Update Project</button>
      </form>

      <h1 id="header"><u>Delete a Project</u></h1>
      <form @submit.prevent="deleteProject">
        <div>
          <label for="delete-id">Project ID:</label>
          <input type="text" v-model="deleteProjectId" id="delete-id" required />
        </div>
        <button type="submit">Delete Project</button>
      </form>
    </div>
  </div>
  </div>
</template>

<script setup>
// Import the GridDotBackground component
import GridDotBackground  from './components/GridDotBackground.vue';
import Navbar from './components/Navbar.vue';

import card from './components/card.vue';

const name = 'NETHMAL RAVIHANSA GUNAWARDHANA';
const { data: projects, pending, error } = useFetch('http://localhost:5000/projects');
const { data: blogs, pending: pendingBlogs, error: errorBlogs } = useFetch('http://localhost:5000/blogs');

const newProject = ref({
  name: '',
  description: ''
});

const selectedProject = ref({
  id: '',
  name: '',
  description: ''
});

const deleteProjectId = ref('');

const createProject = async () => {
  try {
    const response = await fetch('http://localhost:5000/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProject.value),
    });

    if (!response.ok) {
      throw new Error('Failed to create project');
    }

    const result = await response.json();
    projects.value.push(result);

    newProject.value.name = '';
    newProject.value.description = '';
  } catch (error) {
    console.error('Error:', error);
  }
};

const updateProject = async () => {
  try {
    const response = await fetch(`http://localhost:5000/projects/${selectedProject.value.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedProject.value),
    });

    if (!response.ok) {
      throw new Error('Failed to update project');
    }

    const data = await response.json();
    const index = projects.value.findIndex(project => project._id === data._id);
    projects.value[index] = data;

    selectedProject.value.id = '';
    selectedProject.value.name = '';
    selectedProject.value.description = '';
  } catch (error) {
    console.error('Error:', error);
  }
};

const deleteProject = async () => {
  try {
    const response = await fetch(`http://localhost:5000/projects/${deleteProjectId.value}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete project');
    }

    const data = await response.json();
    const index = projects.value.findIndex(project => project._id === data._id);
    projects.value.splice(index, 1);

    deleteProjectId.value = '';
  } catch (error) {
    console.error('Error:', error);
  }
};
</script>

<style scoped>
/* Same styles from your original CSS */
#text {
  color: white;
}
form {
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: auto;
  border: 2px solid #423f3f;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 2px 3px 10px #353131;
  max-width: 500px;
  background-color: #f9f9f9;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
}

button[type="submit"] {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #45a049;
}

#header {
  text-align: center;
}
</style>
