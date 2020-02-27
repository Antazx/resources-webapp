<template>
  <v-app>
    <!-- <Login /> -->
    <Navigation />
  </v-app>
</template>

<script>
import Login from './views/Login';
import Navigation from './components/Navigation';
export default {
  name: 'App',

  components: {
    Login,
    Navigation
  },

  data: () => ({
    //
  })
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
