<template>
  <div>
    <h1 id="header">Admin Dashboard</h1>

    <!-- Display projects -->
    <div style="color: black;">
      <h1>{{ name }}</h1>
      <div v-if="pending">Loading... </div>
      <h1>Projects examples</h1>
      <ul>
        <li v-for="project in projects" :key="project.name">
          <h2>{{ project.name }}</h2>
          <p>ID: {{ project._id }}</p>
          <p>Description: {{ project.description }}</p>
          <p>GitHub: <a :href="project.github" target="_blank">{{ project.github }}</a></p>
          <p>Demo: <a :href="project.demo" target="_blank">{{ project.demo }}</a></p>
          <img v-if="project.image" :src="project.image" alt="Project image" style="max-width: 200px;" />
        </li>
      </ul>
    </div>
    
    <!-- Blogs display (unchanged) -->
    <div style="color: black;">
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
          <label for="name">Project Name:</label>
          <input type="text" v-model="newProject.name" id="name" required />
        </div>
        <div>
          <label for="description">Description:</label>
          <textarea v-model="newProject.description" id="description" required></textarea>
        </div>
        <div>
          <label for="github">GitHub URL:</label>
          <input type="url" v-model="newProject.github" id="github" required />
        </div>
        <div>
          <label for="demo">Demo URL:</label>
          <input type="url" v-model="newProject.demo" id="demo" required />
        </div>
        <div>
          <label for="image">Project Image:</label>
          <input type="file" @change="handleImageUpload" id="image" accept="image/*" required />
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
        <div>
          <label for="update-github">Update GitHub URL:</label>
          <input type="url" v-model="selectedProject.github" id="update-github" required />
        </div>
        <div>
          <label for="update-demo">Update Demo URL:</label>
          <input type="url" v-model="selectedProject.demo" id="update-demo" required />
        </div>
        <div>
          <label for="update-image">Update Project Image:</label>
          <input type="file" @change="handleUpdateImageUpload" id="update-image" accept="image/*" />
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

    <!-- Back to Top Button -->
    <button
      v-if="showBackToTop"
      @click="scrollToTop"
      class="back-to-top"
    >
      Back to Top
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const { data: projects, pending, error } = useFetch('http://localhost:5000/projects');
const { data: blogs, pending: pendingBlogs, error: errorBlogs } = useFetch('http://localhost:5000/blogs');

const newProject = ref({
  name: '',
  description: '',
  github: '',
  demo: '',
  image: null
});

const selectedProject = ref({
  id: '',
  name: '',
  description: '',
  github: '',
  demo: '',
  image: null
});

const deleteProjectId = ref('');

const handleImageUpload = (event) => {
  newProject.value.image = event.target.files[0];
};

const handleUpdateImageUpload = (event) => {
  selectedProject.value.image = event.target.files[0];
};

const createProject = async () => {
  try {
    const formData = new FormData();
    formData.append('name', newProject.value.name);
    formData.append('description', newProject.value.description);
    formData.append('github', newProject.value.github);
    formData.append('demo', newProject.value.demo);
    formData.append('image', newProject.value.image);

    const response = await fetch('http://localhost:5000/projects', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to create project');
    }

    const result = await response.json();
    projects.value.push(result);

    // Reset form
    newProject.value = { name: '', description: '', github: '', demo: '', image: null };
  } catch (error) {
    console.error('Error:', error);
  }
};

const updateProject = async () => {
  try {
    const formData = new FormData();
    formData.append('name', selectedProject.value.name);
    formData.append('description', selectedProject.value.description);
    formData.append('github', selectedProject.value.github);
    formData.append('demo', selectedProject.value.demo);
    if (selectedProject.value.image) {
      formData.append('image', selectedProject.value.image);
    }

    const response = await fetch(`http://localhost:5000/projects/${selectedProject.value.id}`, {
      method: 'PATCH',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to update project');
    }

    const data = await response.json();
    const index = projects.value.findIndex(project => project._id === data._id);
    projects.value[index] = data;

    // Reset form
    selectedProject.value = { id: '', name: '', description: '', github: '', demo: '', image: null };
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

    projects.value = projects.value.filter(project => project._id !== deleteProjectId.value);

    deleteProjectId.value = '';
  } catch (error) {
    console.error('Error:', error);
  }
};

const showBackToTop = ref(false);

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 200;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
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
.back-to-top {
  position: fixed;
  bottom: 40px;
  right: 40px;
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  display: none;
  z-index: 1000;
  transition: opacity 0.3s;
}

.back-to-top:hover {
  background-color: #45a049;
}

.back-to-top[style*="display: block;"] {
  opacity: 1;
}

</style>
