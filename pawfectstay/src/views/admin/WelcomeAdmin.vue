<template>
  <div class="container">
    <img src="@/assets/dog.jpg"/>
    <h1>PawfectStay</h1>
    <p>Dobrodošli!</p>

    <router-link to="/admin-login">Prijavi se</router-link>
  </div>
</template>

<script>
export default {
  name: "WelcomeAdmin"
};
</script>

<style scoped>
.container {
  text-align: center;
  background-color: #fff8f8;
  padding: 40px 20px;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 400px;
  margin: 50px auto;
}

h1 {
  color: #a83232;
}

a {
  color: #a83232;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
