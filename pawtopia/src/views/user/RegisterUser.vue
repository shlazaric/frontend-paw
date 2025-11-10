<template>
  <div class="register-container">
    <h2>Registracija korisnika</h2>

    <form @submit.prevent="handleSubmit">
      <label for="ime">Unesi ime:</label>
      <input type="text" id="ime" v-model="ime" required />

      <label for="prezime">Unesi prezime:</label>
      <input type="text" id="prezime" v-model="prezime" required />

      <label for="email">Unesi e-mail:</label>
      <input type="email" id="email" v-model="email" required />

      <label for="lozinka">Unesi lozinku:</label>
      <input type="password" id="lozinka" v-model="lozinka" required />

      <label for="ponoviLozinku">Ponovi lozinku:</label>
      <input type="password" id="ponoviLozinku" v-model="ponoviLozinku" required />

      <button type="submit">Registriraj se</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "RegisterUser",
  data() {
    return {
      ime: "",
      prezime: "",
      email: "",
      lozinka: "",
      ponoviLozinku: ""
    };
  },
  methods: {
    handleSubmit() {
      if (this.lozinka !== this.ponoviLozinku) {
        alert("Lozinke se ne podudaraju!");
        return;
      }

      alert(`Dobrodošao/la ${this.ime} ${this.prezime}! 🎉`);
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 50px auto;
  background-color: #fafaff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #2c2c74;
  margin-bottom: 25px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

label {
  color: #2c2c74;
  text-align: left;
  font-weight: 500;
}

input {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
}

button {
  background-color: #0095ff;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  padding: 10px;
  margin-top: 10px;
  cursor: pointer;
}

button:hover {
  background-color: #007bd6;
}
</style>
