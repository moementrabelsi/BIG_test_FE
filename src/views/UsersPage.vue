<template>
  <v-container>
    <v-row class="header" justify="center">
      <v-col cols="12">
        <h2>Users</h2>
        <hr class="solid-divider"> 
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
      perPage: 3, 
    };
  },
  computed: {
    ...mapGetters('users', ['allUsers']),
    displayedUsers() {
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
      this.loadDataForPage(this.currentPage);
    },
    async loadDataForPage(page) {
      try {
        setTimeout(() => {
          
          const data = generateExampleData(page, this.perPage);
          
          
          this.$store.commit('users/setUsers', data);
        }, 1000);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  },
  created() {
    this.fetchUsers();
  },
};


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
  overflow-x: auto; 
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