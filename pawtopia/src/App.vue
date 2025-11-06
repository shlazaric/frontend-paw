<template>
  <div>
    <nav>
      <router-link to="/">User</router-link> |
      <router-link to="/admin">Admin</router-link>
    </nav>

    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style scoped>
nav {
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
}

a {
  text-decoration: none;
  color: #0095ff;
  margin: 0 8px;
}

a.router-link-active {
  font-weight: bold;
  color: #2c2c74;
}
</style>
