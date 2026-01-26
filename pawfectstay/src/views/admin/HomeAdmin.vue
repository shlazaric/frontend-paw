<template>
  <div class="admin-home">
    <h1>Dobrodošli!</h1>

    <div class="buttons">
      <router-link to="/admin-rezervacije">
        <button>Prikaz rezervacija</button>
      </router-link>

      <router-link to="/admin-psi">
        <button>Prikaz profila pasa</button>
      </router-link>

      <button class="logout-btn" @click="logout">Odjava</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeAdmin",

  methods: {
    logout() {
      localStorage.removeItem("adminToken");

      this.$router.push("/admin-login");
    }
  }
};
</script>

<style scoped>
.admin-home {
  text-align: center;
  padding-top: 40px;
}

button {
  margin: 15px;
  padding: 12px 20px;
  font-size: 18px;
  border-radius: 12px;
  cursor: pointer;
  background-color: #4a90e2;
  color: white;
  border: none;
  transition: 0.3s;
}

button:hover {
  background-color: #1d1b54;
}
</style>
