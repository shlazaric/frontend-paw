<template> 

  <div class="admin-container">
    
    <button class="back-btn" @click="$router.push('/admin-home')">
      ← Natrag
    </button>

    <h1>Pregled rezervacija</h1>

    <p v-if="reservations.length === 0">
      Trenutno nema rezervacija.
    </p>

    <div v-else>
      <div
        class="reservation-card"
        v-for="r in reservations"
        :key="r._id"
      >
        <h3>{{ r.petName }}</h3>
        <p>Trajanje: {{ r.duration }}</p>
        <p>Datum: {{ r.date }}</p>
        <p>Vrijeme: {{ r.time }}</p>
        <p v-if="r.note">Napomena: {{ r.note }}</p>

        <p>Status: <strong>{{ r.statusText }}</strong></p>

        <button @click="acceptReservation(r._id)">Prihvati</button>
        <button @click="declineReservation(r._id)">Odbij</button>
        <button @click="deleteReservation(r._id)">Obriši</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      reservations: []
    };
  },

  mounted() {
    this.fetchReservations();
  },

  methods: {
    async fetchReservations() {
      const res = await axios.get("http://localhost:3000/admin/reservations");
      this.reservations = res.data;
    },

    async acceptReservation(id) {
      await axios.put(`http://localhost:3000/admin/reservations/${id}`, {
        status: "accepted",
        statusText: "Prihvaćeno"
      });
      this.fetchReservations();
    },

    async declineReservation(id) {
      await axios.put(`http://localhost:3000/admin/reservations/${id}`, {
        status: "declined",
        statusText: "Odbijeno"
      });
      this.fetchReservations();
    },

    async deleteReservation(id) {
      await axios.delete(`http://localhost:3000/admin/reservations/${id}`);
      this.fetchReservations();
    }
  }
};
</script>


<style scoped>
.admin-container {
  padding: 20px;
  max-width: 600px;
  margin: auto;
  font-family: "Poppins", sans-serif;
}

h1 {
  text-align: center;
  color: #1d1b54;
  margin-bottom: 20px;
}

.no-data {
  text-align: center;
  font-size: 18px;
  color: #666;
}

.reservation-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.reservation-card {
  background: #fafaff;
  padding: 15px;
  border-radius: 10px;
  border-left: 5px solid #4a90e2;
}


.status {
  margin-top: 10px;
  font-weight: bold;
}

.accepted {
  color: green;
}

.declined {
  color: crimson;
}

/* BUTTONS */
.buttons {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.accept {
  background: green;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.decline {
  background: orange;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.delete {
  background: crimson;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.accept:hover {
  background: darkgreen;
}

.decline:hover {
  background: darkorange;
}

.delete:hover {
  background: darkred;
}
</style>
