<template>
  <div class="login-container">
    <h2>Admin prijava</h2>

    <form @submit.prevent="handleLogin">
      <label for="username">Unesi korisničko ime:</label>
      <input type="text" id="username" v-model="username" required />

      <label for="password">Unesi lozinku:</label>
      <input type="password" id="password" v-model="password" required />

      <button type="submit">Prijavi se</button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: "LoginAdmin",

  data() {
    return {
      username: "",
      password: "",
      error: "",
    };
  },

  methods: {
    handleLogin() {
      const correctUsername = "admin";
      const correctPassword = "admin123";

      if (this.username === correctUsername && this.password === correctPassword) {
        alert("Dobrodošao natrag, administratoru!");
        this.$router.push("/admin");
      } else {
        this.error = "Pogrešno korisničko ime ili lozinka!";
      }
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

form {
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 300px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

label {
  color: #1d1b54;
  margin-bottom: 5px;
}

input {
  margin-bottom: 15px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

button {
  background-color: #1d1b54;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease;
}

button:hover {
  background-color: #4a90e2;
}

.error {
  color: red;
  margin-top: 10px;
  font-weight: bold;
}
</style>
