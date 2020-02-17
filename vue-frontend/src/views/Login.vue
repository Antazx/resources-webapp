<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="5" xl="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login form</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="user.name"
                :rules="usernameRules"
                label="Login"
                name="login"
                prepend-icon="mdi-account"
                type="text"
                required
              />

              <v-text-field
                v-model="user.password"
                :rules="passwordRules"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                required
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn class="mb-1" color="primary" block @click="login()">Login</v-btn>
          </v-card-actions>
          <v-progress-linear
            :active="loading"
            :indeterminate="loading"
            absolute
            bottom
            color="primary"
          ></v-progress-linear>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    user: { name: '', password: '' },
    usernameRules: [
      (v) => !!v || 'Name is required',
      (v) => v.length <= 10 || 'Name must be less than 10 characters'
    ],
    passwordRules: [(v) => !!v || 'Password is required'],
    loading: false
  }),
  methods: {
    login() {
      this.loading = true;
      this.axios
        .post('/login', this.user)
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
      this.loading = false;
    }
  }
};
</script>
