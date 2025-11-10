<template>
  <div class="container">
    <img src="@/assets/dog.jpg" alt="Dog image" />
    <h1>Pawtopia</h1>
    <p>Dobrodošao/la u aplikaciju za vlasnike pasa!</p>

    <router-link to="/register">Registriraj se</router-link>
    <span>Već imaš račun?</span>
    <router-link to="/login">Prijavi se</router-link>
    
  </div>
</template>

<script>
export default {
  name: "WelcomeUser"
};
</script>

<style scoped>
.container {
  text-align: center;
  background-color: #fafaff;
  padding: 40px 20px;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 400px;
  margin: 50px auto;
}

img {
  width: 180px;
  height: 180px;
  border-radius: 10px;
  border: 3px solid #0095ff;
  margin-bottom: 20px;
}

h1 {
  color: #2c2c74;
  margin-bottom: 10px;
}

p {
  margin-bottom: 25px;
  color: #333;
}

a {
  display: block;
  color: #0095ff;
  text-decoration: none;
  font-weight: 500;
  margin: 8px 0;
}

a:hover {
  text-decoration: underline;
}

.admin {
  color: #0a994a;
  font-weight: bold;
  margin-top: 20px;
}
</style>
