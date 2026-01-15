<template>
  <div class="login-container">
    <h1 class="title">PawfectStay</h1>
    <p class="subtitle">Prijava korisnika</p>

    <form class="login-form" @submit.prevent="handleLogin">
      <label for="email">E-mail:</label>
      <input
        type="email"
        id="email"
        v-model="email"
        required
      />

      <label for="password">Lozinka:</label>
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

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginUser",

  data() {
    return {
      email: "",
      password: "",
      error: ""
    };
  },

  methods: {
    async handleLogin() {
      this.error = "";

      try {
        const res = await axios.post("http://localhost:3000/login", {
          email: this.email,
          lozinka: this.password
        });

      
        localStorage.setItem("user", JSON.stringify(res.data.user));

        this.$router.push("/home");
      } catch (err) {
        this.error =
          err.response?.data?.message || "Server nije dostupan";
      }
    }
  }
};
</script>


<style scoped>
.login-container {
  max-width: 380px;
  margin: auto;
  padding-top: 60px;
  text-align: center;
}

.title {
  font-size: 32px;
  margin-bottom: 10px;
}

.subtitle {
  margin-bottom: 25px;
}

.login-form {
  display: flex;
  flex-direction: column;
}

label {
  text-align: left;
  margin-top: 10px;
}

input {
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

button {
  margin-top: 20px;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
}

.error {
  color: red;
  margin-top: 15px;
}
</style>
