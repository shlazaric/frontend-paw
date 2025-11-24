<template>
  <div class="admin-container">
    <h1>Pregled rezervacija</h1>

    <div v-if="reservations.length === 0" class="no-data">
      Trenutno nema rezervacija.
    </div>

    <div v-else class="reservation-list">
      <div
        class="reservation-card"
        v-for="(r, index) in reservations"
        :key="index"
      >
        <h3>{{ r.petName }}</h3>

        <p><strong>Trajanje:</strong> {{ r.duration }}</p>
        <p><strong>Datum:</strong> {{ r.date }}</p>
        <p><strong>Vrijeme:</strong> {{ r.time }} h</p>

        <p v-if="r.note"><strong>Napomena:</strong> {{ r.note }}</p>

       
        <p class="status" :class="r.status">
          Status: <strong>{{ r.statusText }}</strong>
        </p>

       
        <div class="buttons">
          <button class="accept" @click="acceptReservation(index)">
            Prihvati
          </button>

          <button class="decline" @click="declineReservation(index)">
            Odbij
          </button>

          <button class="delete" @click="deleteReservation(index)">
            Obriši
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminReservations",

  data() {
    return {
      reservations: [],
    };
  },

  mounted() {
    const saved = JSON.parse(localStorage.getItem("reservations")) || [];
    this.reservations = saved;
  },

  methods: {
    save() {
      localStorage.setItem("reservations", JSON.stringify(this.reservations));
    },

    acceptReservation(index) {
      this.reservations[index].status = "accepted";
      this.reservations[index].statusText = "Prihvaćeno";
      this.save();
    },

    declineReservation(index) {
      this.reservations[index].status = "declined";
      this.reservations[index].statusText = "Odbijeno";
      this.save();
    },

    deleteReservation(index) {
      this.reservations.splice(index, 1);
      this.save();
    },
  },
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
