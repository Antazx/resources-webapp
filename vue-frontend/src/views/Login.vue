<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="5" xl="4">
        <v-card>
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title color="error">Login form</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="login" ref="form" id="login-form">
              <v-text-field
                v-model="user.name"
                :rules="usernameRules"
                label="Login"
                name="login"
                prepend-icon="mdi-account"
                type="text"
                required
                clearable
              />

              <v-text-field
                v-model="user.password"
                :rules="passwordRules"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                required
                clearable
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn class="mb-1" color="primary" block type="submit" form="login-form">Login</v-btn>
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
    <v-row justify="center">
      <v-col cols="12" sm="9" md="8" lg="7" xl="6">
        <v-alert v-show="showError" type="error" dense>
          {{ errorMsg }}
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    user: { name: '', password: '' },
    usernameRules: [
      v => !!v || 'Name is required',
      v => /.+@.+\..+/.test(v) || 'Login must be a valid E-mail'
    ],
    passwordRules: [v => !!v || 'Password is required'],
    loading: false,
    errorMsg: '',
    showError: false
  }),
  methods: {
    login() {
      this.showError = false;
      if (!this.$refs.form.validate()) return;
      this.loading = true;
      this.axios
        .post('/login', this.user)
        .then(res => {
          console.log(res);
          if (res.data.accessToken)
            this.axios.defaults.headers.common['x-access-token'] = res.data.accessToken;
        })
        .catch(e => {
          console.log(e);
          this.errorMsg = 'Incorrect username or password';
          this.showError = true;
        });

      //this.loading = false;
    }
  },
  watch: {
    loading(val) {
      if (!val) return;
      setTimeout(() => (this.loading = false), 3000);
    }
  }
};
</script>
