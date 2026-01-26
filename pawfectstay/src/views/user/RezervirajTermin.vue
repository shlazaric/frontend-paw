<template>
  <div class="reservation-wrapper">
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

      <p v-if="successMessage" class="success">{{ successMessage }}</p>

      <hr />

      <button @click="fetchReservations">Prikaži status rezervacije</button>

      <div v-if="reservations.length" class="reservations-list">
        <h2>Moje rezervacije</h2>
        <div v-for="r in reservations" :key="r._id" class="reservation-item">
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
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ReservationForm",
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
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Niste prijavljeni!");
          return;
        }

        await axios.post(
          "http://localhost:3000/reservations",
          {
            petName: this.petName,
            duration: this.duration,
            date: this.date,
            time: this.time,
            note: this.note
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        this.successMessage = "Rezervacija spremljena (Na čekanju)";
        this.petName = "";
        this.duration = "";
        this.date = "";
        this.time = "";
        this.note = "";
      } catch (err) {
        console.error(err.response?.data || err);
        alert(err.response?.data?.message || "Greška pri spremanju rezervacije");
      }
    },
    async fetchReservations() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Niste prijavljeni!");
          return;
        }

        const res = await axios.get("http://localhost:3000/reservations/user", {
          headers: { Authorization: `Bearer ${token}` }
        });

        this.reservations = res.data;
        this.showStatus = true;
      } catch (err) {
        console.error(err.response?.data || err);
        alert(err.response?.data?.message || "Greška pri dohvaćanju rezervacija");
      }
    }
  }
};
</script>

<style scoped>
.reservation-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 5px;
  box-sizing: border-box;
}

.reservation-container {
  width: 100%;
  max-width: 360px;
  max-height: 85vh;
  overflow-y: auto;
  padding: 15px;
  border-radius: 10px;
  background-color: #fafaff;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.reservation-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
}

.form-group {
  display: flex;
  flex-direction: column;
  font-size: 14px;
}

input, select, textarea {
  margin-top: 4px;
  padding: 6px;
  font-size: 14px;
}

button {
  margin-top: 8px;
  padding: 8px;
  font-size: 14px;
  cursor: pointer;
}

.success {
  color: green;
  text-align: center;
  margin-top: 10px;
}

.reservations-list {
  margin-top: 15px;
  max-height: 200px;
  overflow-y: auto;
}

.reservation-item {
  margin-bottom: 8px;
}

.pending { color: orange; }
.approved { color: green; }
.rejected { color: red; }
</style>
