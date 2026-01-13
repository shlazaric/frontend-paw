<template>
  <div>
    <button @click="$router.push('/home')">← Natrag</button>

    <h1>Moje rezervacije</h1>

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
    const user = JSON.parse(localStorage.getItem("user"));
    const res = await axios.get(
      `http://localhost:3000/reservations/user/${user.id}`
    );
    this.reservations = res.data;
  }
};
</script>
