<template>
  <div class="login-container">
    <h1 class="title">PawfectStay</h1>
    <p class="subtitle">Prijava korisnika</p>

    <form class="login-form" @submit.prevent="handleLogin">
      <label for="email">Unesi e-mail:</label>
      <input
        type="email"
        id="email"
        v-model="email"
        required
      />

      <label for="password">Unesi lozinku:</label>
      <input
        type="password"
        id="password"
        v-model="password"
        required
      />

      <button type="submit">Prijavi se</button>
    </form>

    <p class="register-text">
      Nemaš račun?
      <router-link to="/register">Registriraj se</router-link>
    </p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginUser",

  data() {
    return {
      email: "",
      password: ""
    };
  },

  methods: {
    async handleLogin() {
      try {
        const res = await axios.post("http://localhost:3000/login", {
          email: this.email,
          lozinka: this.password
        });

        alert(`Dobrodošao/la, ${res.data.user.email}!`);
        this.$router.push("/home");
      } catch (error) {
        if (error.response) {
          alert(error.response.data.message);
        } else {
          alert("Server nije dostupan");
        }
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #fafaff;
}

.login-form {
  display: flex;
  flex-direction: column;
  width: 300px;
}

input {
  margin-bottom: 15px;
  padding: 8px;
}

button {
  padding: 10px;
  background-color: #4a90e2;
  color: white;
  border: none;
}
</style>
