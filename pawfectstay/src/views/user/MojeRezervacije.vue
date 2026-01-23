<template>
  <div>
    <button @click="$router.push('/home')">← Natrag</button>

    <h1>Moje rezervacije</h1>

    <div v-if="reservations.length === 0">
      <p>Nema rezervacija.</p>
    </div>

    <div v-for="r in reservations" :key="r._id">
      <p><strong>{{ r.petName }}</strong></p>
      <p>{{ r.date }} | {{ r.time }}</p>
      <p>Status: <strong>{{ r.statusText }}</strong></p>
      <hr />
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

  async mounted() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        this.$router.push("/login");
        return;
      }

      const res = await axios.get(
        "http://localhost:3000/reservations/user",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      this.reservations = res.data;
    } catch (err) {
      console.error(err);
      alert("Greška pri dohvaćanju rezervacija");
    }
  }
};
</script>
