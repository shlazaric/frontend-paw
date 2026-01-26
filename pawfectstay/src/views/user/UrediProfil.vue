<template>
  <div class="edit-container">
    <button class="back-btn" @click="$router.push('/home')">← Natrag</button>
    <h1>Uredi profil psa</h1>

    <div v-if="!dog">Učitavanje...</div>

    <form v-else @submit.prevent="updateDog">
      <div class="form-group">
        <label>Ime psa:</label>
        <input type="text" v-model="dog.name" required />
      </div>

      <div class="form-group">
        <label>Vrsta psa:</label>
        <input type="text" v-model="dog.breed" required />
      </div>

      <div class="form-group">
        <label>Starost psa:</label>
        <div class="age-inputs">
          <input type="number" v-model.number="years" min="0" placeholder="Godine" required />
          <input type="number" v-model.number="months" min="0" max="11" placeholder="Mjeseci" required />
        </div>
        <small class="age-text">{{ ageText }}</small>
      </div>

      <div class="btn-group">
        <button type="submit">Spremi</button>
        <button type="button" class="delete-btn" @click="deleteDog">Obriši psa</button>
      </div>
    </form>

    <p v-if="successMessage" class="success">{{ successMessage }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UrediProfil",
  data() {
    return {
      dog: null,
      years: 0,
      months: 0,
      successMessage: ""
    };
  },
  async mounted() {
    const token = localStorage.getItem("token");
    const dogId = this.$route.params.id;
    if (!token || !dogId) {
      this.$router.push("/login");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:3000/dogs/${dogId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      this.dog = res.data;
      this.years = Math.floor(this.dog.age / 12);
      this.months = this.dog.age % 12;
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Pas nije pronađen");
      this.$router.push("/home");
    }
  },
  computed: {
    ageText() {
      if (!this.years && !this.months) return "0 mjeseci";
      if (!this.years) return `${this.months} mjeseci`;
      if (!this.months) return `${this.years} godina`;
      return `${this.years} godina i ${this.months} mjeseci`;
    }
  },
  methods: {
    async updateDog() {
      const token = localStorage.getItem("token");
      const totalMonths = this.years * 12 + this.months;
      if (!this.dog.name || !this.dog.breed) {
        alert("Unesite ime i vrstu psa!");
        return;
      }
      try {
        await axios.put(`http://localhost:3000/dogs/${this.dog._id}`, {
          name: this.dog.name,
          breed: this.dog.breed,
          age: totalMonths
        }, { headers: { Authorization: `Bearer ${token}` } });
        this.successMessage = "Profil psa je uspješno ažuriran!";
      } catch (error) {
        console.error(error);
        alert(error.response?.data?.message || "Greška pri spremanju profila psa");
      }
    },
    async deleteDog() {
      if (!confirm("Jesi li siguran/na da želiš obrisati psa?")) return;
      const token = localStorage.getItem("token");
      try {
        await axios.delete(`http://localhost:3000/dogs/${this.dog._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert("Pas je obrisan");
        this.$router.push("/home");
      } catch (error) {
        console.error(error);
        alert(error.response?.data?.message || "Greška pri brisanju psa");
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

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

label {
  font-weight: 600;
  margin-bottom: 5px;
  color: #1d1b54;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.age-inputs {
  display: flex;
  gap: 10px;
}

.age-text {
  margin-top: 6px;
  font-size: 14px;
  color: #666;
  font-style: italic;
}

button {
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 10px;
  margin-top: 10px;
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
