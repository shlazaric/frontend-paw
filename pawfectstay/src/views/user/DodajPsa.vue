<template>
  <div class="dog-container">
    <button class="back-btn" @click="$router.push('/home')">← Natrag</button>

    <h1>Dodaj podatke o psu</h1>

    <form class="dog-form" @submit.prevent="saveDog">
      <label>Ime psa:</label>
      <input v-model="dogName" required />

      <label>Vrsta psa:</label>
      <input v-model="dogBreed" required />

      <label>Starost psa:</label>
      <input type="number" v-model="dogAge" min="0" required />

      <button type="submit">Spremi profil psa</button>
    </form>

    <p v-if="successMessage" class="success">{{ successMessage }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DodajPsa",

  data() {
    return {
      dogName: "",
      dogBreed: "",
      dogAge: "",
      successMessage: ""
    };
  },

  methods: {
    async saveDog() {
      try {
        await axios.post("http://localhost:3000/dogs", {
          name: this.dogName,
          breed: this.dogBreed,
          age: this.dogAge
        });

        this.successMessage = "Profil psa je uspješno spremljen!";

        setTimeout(() => {
          this.$router.push("/home");
        }, 3000);
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
.dog-container {
  max-width: 420px;
  margin: auto;
  padding: 20px;
  font-family: "Poppins", sans-serif;
}

.back-btn {
  background: none;
  border: none;
  font-size: 16px;
  color: #1d1b54;
  cursor: pointer;
  margin-bottom: 10px;
}

.back-btn:hover {
  text-decoration: underline;
}

h1 {
  text-align: center;
  color: #1d1b54;
  margin-bottom: 20px;
}

.dog-form {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-top: 10px;
  color: #1d1b54;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 5px;
}

button {
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 10px;
  margin-top: 20px;
  cursor: pointer;
}

button:hover {
  background-color: #1d1b54;
}

.success {
  margin-top: 20px;
  color: green;
  font-weight: bold;
  text-align: center;
}
</style>
