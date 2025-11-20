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
        placeholder="Upiši svoj e-mail"
        required
      />

      <label for="password">Unesi lozinku:</label>
      <input
        type="password"
        id="password"
        v-model="password"
        placeholder="Upiši lozinku"
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
export default {
  name: "LoginUser",

  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    handleLogin() {
      if (!this.email || !this.password) {
        alert("Molimo popuni sva polja!");
        return;
      }

      console.log("Korisnik se pokušava prijaviti:", this.email);
      alert(`Dobrodošao/la natrag, ${this.email}!`);

      
      this.$router.push("/home");
    },
  },
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
  font-family: "Poppins", sans-serif;
}

.title {
  color: #1d1b54;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.subtitle {
  color: #1d1b54;
  font-size: 14px;
  margin-bottom: 30px;
}

.login-form {
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 300px;
}

label {
  color: #1d1b54;
  font-weight: 600;
  margin-bottom: 5px;
}

input {
  margin-bottom: 15px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

button {
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #1d1b54;
}

.register-text {
  margin-top: 20px;
  font-size: 14px;
}

.register-text a {
  color: #4a90e2;
  font-weight: bold;
  text-decoration: none;
}
</style>
