<template>
  <div class="reservation-container">
    <button @click="$router.push('/home')">← Natrag</button>

    <h1>Rezerviraj čuvanje psa</h1>

    <form @submit.prevent="handleSubmit" class="reservation-form">
      <div class="form-group">
        <label>Ime psa:</label>
        <input v-model="petName" required />
      </div>

      <div class="form-group">
        <label>Trajanje:</label>
        <select v-model="duration" required>
          <option disabled value="">-- Odaberi --</option>
          <option>1 sat</option>
          <option>3 sata</option>
          <option>5 sati</option>
          <option>Cijeli dan</option>
          <option>Noćenje</option>
        </select>
      </div>

      <div class="form-group">
        <label>Datum:</label>
        <input type="date" v-model="date" required />
      </div>

      <div class="form-group">
        <label>Vrijeme:</label>
        <input type="time" v-model="time" required />
      </div>

      <div class="form-group">
        <label>Napomena:</label>
        <textarea v-model="note"></textarea>
      </div>

      <button type="submit">Potvrdi</button>
    </form>

    <p v-if="successMessage">{{ successMessage }}</p>

    <!-- GUMB ZA STATUS -->
    <hr />

    <button @click="fetchReservations">
      Prikaži status rezervacije
    </button>

    <!-- STATUS REZERVACIJA -->
    <div v-if="reservations.length" class="status-box">
      <h2>Moje rezervacije</h2>

      <div
        v-for="r in reservations"
        :key="r._id"
        class="reservation-status"
      >
        <p><strong>Pas:</strong> {{ r.petName }}</p>
        <p><strong>Datum:</strong> {{ r.date }} u {{ r.time }}</p>
        <p><strong>Trajanje:</strong> {{ r.duration }}</p>

        <p>
          <strong>Status:</strong>
          <span
            :class="{
              pending: r.status === 'pending',
              approved: r.status === 'approved',
              rejected: r.status === 'rejected'
            }"
          >
            {{ r.statusText }}
          </span>
        </p>

        <hr />
      </div>
    </div>

    <p v-if="showStatus && reservations.length === 0">
      Trenutno nema rezervacija.
    </p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      petName: "",
      duration: "",
      date: "",
      time: "",
      note: "",
      successMessage: "",
      reservations: [],
      showStatus: false
    };
  },

  methods: {
    async handleSubmit() {
      const user = JSON.parse(localStorage.getItem("user"));

      await axios.post("http://localhost:3000/reservations", {
        petName: this.petName,
        duration: this.duration,
        date: this.date,
        time: this.time,
        note: this.note,
        userId: user.id
      });

      this.successMessage = "Rezervacija spremljena (Na čekanju)";

      // reset forme
      this.petName = "";
      this.duration = "";
      this.date = "";
      this.time = "";
      this.note = "";
    },

    async fetchReservations() {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await axios.get(
        `http://localhost:3000/reservations/user/${user.id}`
      );

      this.reservations = res.data;
      this.showStatus = true;
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
