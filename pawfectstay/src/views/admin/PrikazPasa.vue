<template>
  <div class="admin-dogs">
    <button class="back-btn" @click="$router.push('/admin-home')">← Natrag</button>

    <h1>Prikaz svih pasa</h1>

    <p v-if="loading">Učitavanje pasa...</p>
    <p v-else-if="dogs.length === 0">Trenutno nema dodanih pasa.</p>

    <div v-else class="dog-list">
      <div class="dog-card" v-for="dog in dogs" :key="dog._id">
        <h3>{{ dog.name }}</h3>
        <p><strong>Vrsta:</strong> {{ dog.breed }}</p>
        <p><strong>Starost:</strong> {{ formatAge(dog.age) }}</p>
        <hr />
        <div v-if="dog.owner">
          <p><strong>Vlasnik:</strong> {{ dog.owner.ime }} {{ dog.owner.prezime }}</p>
          <p><strong>Email:</strong> {{ dog.owner.email }}</p>
        </div>
        <div v-else>
          <p><strong>Vlasnik:</strong> Nije definiran</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminDogs",
  data() {
    return {
      dogs: [],
      loading: true
    };
  },
  async mounted() {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      alert("Niste prijavljeni kao admin");
      this.$router.push("/admin-login");
      return;
    }

    try {
      const res = await axios.get("http://localhost:3000/dogs/all", {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log("API response:", res.data);

      this.dogs = Array.isArray(res.data) ? res.data : [];
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.message || "Greška pri dohvaćanju pasa");
    } finally {
      this.loading = false;
    }
  },
  methods: {
    formatAge(totalMonths) {
      if (totalMonths == null || totalMonths < 0) return "Nije definirano";

      const years = Math.floor(totalMonths / 12);
      const months = totalMonths % 12;

      const yearLabel = y => (y === 1 ? "godina" : y >= 2 && y <= 4 ? "godine" : "godina");
      const monthLabel = m => (m === 1 ? "mjesec" : m >= 2 && m <= 4 ? "mjeseca" : "mjeseci");

      if (years === 0) return `${months} ${monthLabel(months)}`;
      if (months === 0) return `${years} ${yearLabel(years)}`;
      return `${years} ${yearLabel(years)} i ${months} ${monthLabel(months)}`;
    }
  }
};
</script>

<style scoped>
.admin-dogs {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  font-family: "Poppins", sans-serif;
}

.back-btn {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #1d1b54;
}

h1 {
  text-align: center;
  color: #1d1b54;
  margin-bottom: 20px;
}

.dog-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.dog-card {
  background: #f0f4ff;
  padding: 15px;
  border-radius: 10px;
  border-left: 5px solid #1d1b54;
}

.empty {
  text-align: center;
  font-size: 18px;
  padding: 20px;
  color: #666;
}
</style>
