<template>
  <div class="dog-container">
    <button class="back-btn" @click="$router.push('/home')">← Natrag</button>

    <h1>Dodaj podatke o psu</h1>

    <form class="dog-form" @submit.prevent="saveDog">

      <div class="form-group">
        <label>Ime psa:</label>
        <input v-model="dogName" required />
      </div>

      <div class="form-group">
        <label>Vrsta psa:</label>
        <input v-model="dogBreed" required />
      </div>

      <div class="form-group">
        <label>Starost psa:</label>
        <div class="age-inputs">
          <input
            type="number"
            v-model.number="dogYears"
            min="0"
            placeholder="Godine"
            required
          />
          <input
            type="number"
            v-model.number="dogMonths"
            min="0"
            max="11"
            placeholder="Mjeseci"
            required
          />
        </div>
      </div>

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
      dogYears: 0,
      dogMonths: 0,
      successMessage: ""
    };
  },

  methods: {
    async saveDog() {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        const totalMonths = this.dogYears * 12 + this.dogMonths;

        await axios.post("http://localhost:3000/dogs", {
          name: this.dogName,
          breed: this.dogBreed,
          age: totalMonths,
          userId: user.id
        });

        this.successMessage = "Profil psa uspješno spremljen";

        setTimeout(() => {
          this.$router.push("/home");
        }, 2000);

      } catch (error) {
        alert("Greška pri spremanju psa");
      }
    }
  }
};
</script>

<style scoped>
.dog-container {
  max-width: 400px;
  margin: auto;
}

.back-btn {
  margin-bottom: 20px;
}

.dog-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.age-inputs {
  display: flex;
  gap: 10px;
}

.age-inputs input {
  width: 100%;
}

.success {
  margin-top: 15px;
  color: green;
}
</style>
