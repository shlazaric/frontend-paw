<template>
  <div class="admin-dogs">

    <button class="back-btn" @click="$router.push('/admin-home')">← Natrag</button>

    <h1>Prikaz profila pasa</h1>

    <div v-if="dogs.length === 0" class="empty">
      Trenutno nema dodanih pasa.
    </div>

    <div v-else class="dog-list">
      <div class="dog-card" v-for="(dog, index) in dogs" :key="index">
        <h3>{{ dog.name }}</h3>
        <p><strong>Vrsta:</strong> {{ dog.breed }}</p>
        <p><strong>Starost:</strong> {{ dog.age }} godina</p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "PrikazPasa",

  data() {
    return {
      dogs: [],
    };
  },

  mounted() {
    const storedDogs = JSON.parse(localStorage.getItem("dogs")) || [];
    this.dogs = storedDogs;
  },
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
