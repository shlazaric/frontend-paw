<template>
  <div class="home-container">

    <button class="logout-btn" @click="logout">
      Odjava
    </button>
    
    <h1>Dobrodošao/la u PawfectStay aplikaciju!</h1>

    <div class="buttons">
      <router-link to="/rezervacija">
        <button>Rezerviraj termin</button>
      </router-link>

      <router-link to="/dodaj-psa">
        <button>Dodaj psa</button>
      </router-link>
    </div>

    <h2>Moji psi</h2>

    <p v-if="dogs.length === 0">
      Nema dodanih pasa.
    </p>

    <div v-else class="dog-list">
      <div
        class="dog-card"
        v-for="dog in dogs"
        :key="dog._id"
      >
        <p><strong>Ime:</strong> {{ dog.name }}</p>
        <p><strong>Vrsta:</strong> {{ dog.breed }}</p>
        <p>
          <strong>Starost:</strong>
          {{ formatAge(dog.age) }}
        </p>

        <router-link :to="`/uredi-profil/${dog._id}`">
          <button class="edit">
            Uredi profil psa
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HomeUser",

  data() {
    return {
      dogs: []
    };
  },

  async mounted() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Niste prijavljeni");
      this.$router.push("/login");
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:3000/dogs?userId=${user.id}`
      );
      this.dogs = res.data;
    } catch {
      alert("Greška pri dohvaćanju pasa");
    }
  },

  methods: {
    formatAge(totalMonths) {
      const years = Math.floor(totalMonths / 12);
      const months = totalMonths % 12;

      const yearLabel = (y) => {
        if (y === 1) return "godina";
        if (y >= 2 && y <= 4) return "godine";
        return "godina";
      };

      const monthLabel = (m) => {
        if (m === 1) return "mjesec";
        if (m >= 2 && m <= 4) return "mjeseca";
        return "mjeseci";
      };

      if (years === 0) {
        return `${months} ${monthLabel(months)}`;
      }

      if (months === 0) {
        return `${years} ${yearLabel(years)}`;
      }

      return `${years} ${yearLabel(years)} i ${months} ${monthLabel(months)}`;
    },

    logout() {
      localStorage.removeItem("user");
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.home-container {
  text-align: center;
  padding: 40px;
}

.buttons {
  margin-bottom: 30px;
}

button {
  margin: 10px;
  padding: 12px 18px;
  font-size: 16px;
  border-radius: 10px;
  cursor: pointer;
}

.dog-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.dog-card {
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 20px;
  margin: 12px;
  width: 250px;
}

.edit {
  margin-top: 10px;
}

.logout-btn {
  position: fixed;
  top: 16px;
  right: 16px;
  background: transparent;
  color: #1d1b54;
  border: 1px solid #1d1b54;
  padding: 4px 10px;
  font-size: 13px;
  border-radius: 20px;
  cursor: pointer;
}

.logout-btn:hover {
  background: #1d1b54;
  color: white;
}

</style>
