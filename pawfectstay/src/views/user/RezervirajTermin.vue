<template>
  <div class="reservation-container">
    <button class="back-btn" @click="$router.push('/home')">← Natrag</button>

    <h1>Rezerviraj čuvanje psa</h1>

    <form class="reservation-form" @submit.prevent="handleSubmit">
      <label>Ime psa:</label>
      <input v-model="petName" required />

      <label>Trajanje:</label>
      <select v-model="duration" required>
        <option disabled value="">-- Odaberi --</option>
        <option>1 sat</option>
        <option>3 sata</option>
        <option>5 sati</option>
        <option>Cijeli dan</option>
        <option>Noćenje</option>
      </select>

      <label>Datum:</label>
      <input type="date" v-model="date" required />

      <label>Vrijeme:</label>
      <input type="time" v-model="time" required />

      <label>Napomena:</label>
      <textarea v-model="note"></textarea>

      <button type="submit">Potvrdi</button>
    </form>

    <p v-if="successMessage" class="success">{{ successMessage }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RezervirajCuvanje",

  data() {
    return {
      petName: "",
      duration: "",
      date: "",
      time: "",
      note: "",
      successMessage: ""
    };
  },

  methods: {
    async handleSubmit() {
      try {
        await axios.post("http://localhost:3000/reservations", {
          petName: this.petName,
          duration: this.duration,
          date: this.date,
          time: this.time,
          note: this.note
        });

        this.successMessage = "Rezervacija uspješno spremljena";

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
.reservation-container {
  max-width: 420px;
  margin: auto;
  padding: 20px;
}

.reservation-form {
  display: flex;
  flex-direction: column;
}

input, select, textarea {
  margin-top: 5px;
  padding: 8px;
}

button {
  margin-top: 15px;
  padding: 10px;
}

.success {
  color: green;
  text-align: center;
  margin-top: 20px;
}
</style>
