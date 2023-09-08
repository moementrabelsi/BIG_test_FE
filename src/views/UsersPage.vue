<template>
  <v-container>
    <!-- Header -->
    <v-row class="header" justify="center">
      <v-col cols="12">
        <h2>Users</h2>
        <hr class="solid-divider"> <!-- Add a class for styling -->
      </v-col>
    </v-row>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Name</th>
            <th>Street Address</th>
            <th>City</th>
            <th>Zip Code</th>
            <th>Company Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in displayedUsers" :key="user.id">
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.address.street }}</td>
            <td>{{ user.address.city }}</td>
            <td>{{ user.address.zipcode }}</td>
            <td>{{ user.company.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <v-pagination
      v-model="currentPage"
      :length="totalPages"
      :per-page="perPage"
      @input="loadPage"
    />
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      currentPage: 1,
      perPage: 3, // Number of items per page
    };
  },
  computed: {
    ...mapGetters('users', ['allUsers']),
    displayedUsers() {
      // Calculate the range of users to display based on currentPage and perPage
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.allUsers.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.allUsers.length / this.perPage);
    },
  },
  methods: {
    ...mapActions('users', ['fetchUsers']),
    loadPage() {
      // Simulate data loading for the new page
      // Replace this with your actual data fetching logic
      this.loadDataForPage(this.currentPage);
    },
    async loadDataForPage(page) {
      try {
        // Simulate data loading using a timeout (replace with actual data fetching logic)
        setTimeout(() => {
          // Create some example data for the current page
          const data = generateExampleData(page, this.perPage);
          
          // Update the store with the new data (replace with your actual store update logic)
          this.$store.commit('users/setUsers', data);
        }, 1000); // Simulate a delay for data loading (remove in production)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  },
  created() {
    // Fetch users when the component is created
    this.fetchUsers();
  },
};

// Helper function to generate example data (replace with actual data source)
function generateExampleData(page, perPage) {
  const data = [];
  const startIndex = (page - 1) * perPage;
  for (let i = startIndex; i < startIndex + perPage; i++) {
    data.push({
      id: i + 1,
      username: `user${i + 1}`,
      email: `user${i + 1}@example.com`,
      name: `User ${i + 1}`,
      address: {
        street: `Street ${i + 1}`,
        city: `City ${i + 1}`,
        zipcode: `Zip ${i + 1}`,
      },
      company: {
        name: `Company ${i + 1}`,
      },
    });
  }
  return data;
}
</script>

<style scoped>
.header {
  padding: 30px;
  font-size: 40px;
  text-align: center;
  background: white;
}

.solid-divider {
  border-top: 1px solid #000;
  width: 30%;
  margin: 16px auto;
}

.table-container {
  overflow-x: auto; /* Add horizontal scroll on small screens */
}

table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
}

th, td {
  padding: 10px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

tr {
  border-bottom: 1px solid #ddd;
}

tr:hover {
  background-color: #f5f5f5;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 8px;
}
</style>