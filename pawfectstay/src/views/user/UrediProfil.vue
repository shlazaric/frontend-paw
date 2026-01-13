<template>
  <div class="edit-container">

    <button class="back-btn" @click="$router.push('/home')">
      ← Natrag
    </button>

    <h1>Uredi profil psa</h1>

    <div v-if="!dog">
      Učitavanje...
    </div>

    <form v-else @submit.prevent="updateDog">

      <div class="form-group">
        <label for="name">Ime:</label>
        <input
          id="name"
          type="text"
          v-model="dog.name"
          required
        />
      </div>

      <div class="form-group">
        <label for="breed">Vrsta:</label>
        <input
          id="breed"
          type="text"
          v-model="dog.breed"
          required
        />
      </div>

      <div class="form-group">
        <label for="age">Starost:</label>
        <input
          id="age"
          type="number"
          v-model.number="dog.age"
          min="0"
          required
        />
      </div>

      <button type="submit">
        Spremi
      </button>

    </form>

    <p v-if="successMessage">
      {{ successMessage }}
    </p>

  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "UrediProfil",

  data() {
    return {
      dog: null,
      successMessage: ""
    };
  },

  async mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    const dogId = this.$route.params.id;

    if (!user || !dogId) {
      this.$router.push("/home");
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:3000/dogs/${dogId}?userId=${user.id}`
      );

      this.dog = res.data;
    } catch {
      alert("Pas nije pronađen");
      this.$router.push("/home");
    }
  },

  methods: {
    async updateDog() {
      const user = JSON.parse(localStorage.getItem("user"));

      try {
        await axios.put(`http://localhost:3000/dogs/${this.dog._id}`, {
          userId: user.id,
          name: this.dog.name,
          breed: this.dog.breed,
          age: this.dog.age
        });

        this.successMessage = "Profil psa je ažuriran!";
      } catch {
        alert("Greška pri spremanju");
      }
    }
  }
};
</script>

<style scoped>
    .edit-container {
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

    h1 {
        text-align: center;
        color: #1d1b54;
        margin-bottom: 20px;
    }

    .edit-form {
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