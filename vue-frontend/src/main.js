import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import axios from 'axios';
import VueAxios from 'vue-axios';
import '@babel/polyfill';

import Calendar from './components/Calendar.vue';
import Table from './components/Table.vue';
import Location from './components/Location.vue';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
axios.defaults.baseURL = 'http://localhost:3030';
axios.defaults.headers.common['x-access-token'] = '';

Vue.component('Calendar', Calendar);
Vue.component('Table', Table);
Vue.component('Location', Location);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
