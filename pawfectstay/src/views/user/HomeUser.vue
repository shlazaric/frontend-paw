<template>
  <div class="home-container">
    <h1>Dobrodošao/la u PawfectStay aplikaciju! </h1>

    <div class="buttons">
      <router-link to="/rezervacija">
        <button>Rezerviraj termin</button>
      </router-link>

      <router-link to="/dodaj-psa">
        <button>Dodaj psa</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeUser"
}
</script>

<style scoped>
.home-container {
  text-align: center;
  padding-top: 40px;
}

button {
  margin: 12px;
  padding: 12px 18px;
  font-size: 18px;
  border-radius: 10px;
  cursor: pointer;
}
</style>
