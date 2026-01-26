<template>
  <div class="admin-container">
    <button class="back-btn" @click="$router.push('/admin-home')">← Natrag</button>
    <h1>Pregled rezervacija</h1>

    <p v-if="reservations.length === 0">Trenutno nema rezervacija.</p>

    <div v-else>
      <div class="reservation-card" v-for="r in reservations" :key="r._id">
        <h3>{{ r.petName }}</h3>
        <p>Trajanje: {{ r.duration }}</p>
        <p>Datum: {{ r.date }}</p>
        <p>Vrijeme: {{ r.time }}</p>
        <p v-if="r.note">Napomena: {{ r.note }}</p>
        <p>Status: <strong>{{ r.statusText }}</strong></p>

        <div class="btn-group">
          <button @click="updateStatus(r._id, 'accepted')">Prihvati</button>
          <button @click="updateStatus(r._id, 'declined')">Odbij</button>
          <button @click="deleteReservation(r._id)" class="delete-btn">Obriši</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminReservations",
  data() {
    return {
      reservations: []
    };
  },
  mounted() { this.fetchReservations(); },
  methods: {
    async fetchReservations() {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) throw new Error("Niste prijavljeni kao admin");

        const res = await axios.get("http://localhost:3000/admin/reservations", {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.reservations = res.data;
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || err.message || "Greška pri dohvaćanju rezervacija");
      }
    },
    async updateStatus(id, status) {
      try {
        const token = localStorage.getItem("adminToken");
        await axios.put(`http://localhost:3000/admin/reservations/${id}`, { status }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.fetchReservations();
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Greška pri ažuriranju statusa");
      }
    },
    async deleteReservation(id) {
      if (!confirm("Jesi li siguran da želiš obrisati rezervaciju?")) return;
      try {
        const token = localStorage.getItem("adminToken");
        await axios.delete(`http://localhost:3000/admin/reservations/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.fetchReservations();
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Greška pri brisanju rezervacije");
      }
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
