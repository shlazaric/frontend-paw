<template>
  <div class="reservation-container">
    
    
    <button class="back-btn" @click="$router.push('/home')">← Natrag</button>

    <h1>Rezerviraj čuvanje psa</h1>

    <form class="reservation-form" @submit.prevent="handleSubmit">

      <label for="petName">Ime psa:</label>
      <input
        type="text"
        id="petName"
        v-model="petName"
        placeholder="Npr. Max"
        required
      />

      <label for="duration">Trajanje čuvanja:</label>
      <select id="duration" v-model="duration" required>
        <option disabled value="">-- Odaberi trajanje --</option>
        <option>1 sat</option>
        <option>3 sata</option>
        <option>5 sati</option>
        <option>Cijeli dan</option>
        <option>Noćenje</option>
      </select>

      <label for="date">Datum dolaska:</label>
      <input type="date" id="date" v-model="date" required />

      <label for="time">Vrijeme dolaska:</label>
      <input type="time" id="time" v-model="time" required />

      <label for="note">Napomena (opcionalno):</label>
      <textarea
        id="note"
        v-model="note"
        placeholder="Npr. Pas je jako miran, ima lijekove u 15h..."
      ></textarea>

      <button type="submit">Potvrdi čuvanje</button>
    </form>

    <p v-if="successMessage" class="success">{{ successMessage }}</p>
  </div>
</template>

<script>
export default {
  name: "RezervirajCuvanje",

  data() {
    return {
      petName: "",
      duration: "",
      date: "",
      time: "",
      note: "",
      successMessage: "",
    };
  },

  methods: {
    handleSubmit() {
      if (!this.petName || !this.duration || !this.date || !this.time) {
        alert("Molimo ispuni sva obavezna polja!");
        return;
      }

      const reservation = {
        petName: this.petName,
        duration: this.duration,
        date: this.date,
        time: this.time,
        note: this.note,
        status: "pending",
        statusText: "Na čekanju"
      };

      let saved = JSON.parse(localStorage.getItem("reservations")) || [];
      saved.push(reservation);
      localStorage.setItem("reservations", JSON.stringify(saved));

      this.successMessage = `Uspješno si rezervirao čuvanje za ${this.petName} (${this.duration}). Dolazak: ${this.date} u ${this.time} h.`;

      setTimeout(() => {
        this.$router.push("/home");
      }, 5000);
    },
  },
};
</script>

<style scoped>
.reservation-container {
  max-width: 420px;
  margin: auto;
  padding: 20px;
  font-family: "Poppins", sans-serif;
}

h1 {
  text-align: center;
  color: #1d1b54;
  margin-bottom: 20px;
}


.back-btn {
  background-color: transparent;
  border: none;
  color: #1d1b54;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 10px;
}

.back-btn:hover {
  text-decoration: underline;
}

.reservation-form {
  display: flex;
  flex-direction: column;
}

label {
  margin-top: 10px;
  font-weight: 600;
  color: #1d1b54;
}

input,
select,
textarea {
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

textarea {
  min-height: 80px;
}

button {
  background-color: #4a90e2;
  color: white;
  padding: 10px;
  margin-top: 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

button:hover {
  background-color: #1d1b54;
}

.success {
  margin-top: 20px;
  color: green;
  font-weight: bold;
  text-align: center;
}
</style>
