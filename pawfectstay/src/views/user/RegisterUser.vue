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
    async handleSubmit() {
      if (this.lozinka !== this.ponoviLozinku) {
        alert("Lozinke se ne podudaraju!");
        return;
      }
      try {
        const response = await fetch("http://localhost:3000/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ime: this.ime,
            prezime: this.prezime,
            email: this.email,
            lozinka: this.lozinka
          })
        });
        const data = await response.json();
        if (!response.ok) {
          alert(data.message || "Greška pri registraciji");
          return;
        }
        alert("Registracija uspješna! Možeš se prijaviti.");
        this.$router.push("/login");
      } catch (error) {
        console.error(error);
        alert("Server nije dostupan");
      }
    }
  }
};
</script>

<style scoped>
.register-container {
  max-width: 320px;
  margin: 20px auto;
  background-color: #fafaff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
h2 {
  text-align: center;
  color: #2c2c74;
  margin-bottom: 20px;
  font-size: 20px;
}
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
label {
  color: #2c2c74;
  text-align: left;
  font-weight: 500;
  font-size: 14px;
}
input {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
}
button {
  background-color: #0095ff;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  padding: 8px;
  margin-top: 10px;
  cursor: pointer;
  font-size: 14px;
}
button:hover {
  background-color: #007bd6;
}
@media (max-width: 400px) {
  .register-container {
    width: 90%;
    padding: 15px;
  }
  input, button {
    font-size: 13px;
    padding: 6px;
  }
}
</style>
