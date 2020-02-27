<template>
  <v-container>
    <v-row justify="start">
      <v-col cols="2">
        <v-navigation-drawer
          v-model="drawer"
          color="primary"
          :expand-on-hover="miniVariant"
          :mini-variant="miniVariant"
          permanent
          absolute
          dark
        >
          <v-list nav class="py-0">
            <v-list-item two-line :class="miniVariant && 'px-0'">
              <v-list-item-avatar>
                <img src="https://randomuser.me/api/portraits/women/13.jpg" />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Application</v-list-item-title>
                <v-list-item-subtitle>Subtext</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item
              v-for="item in items"
              :key="item.title"
              link
              @click="selectTab(item.title)"
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <template v-slot:append>
            <!-- <v-switch v-model="miniVariant" label="Mini"></v-switch> -->
            <div class="pa-2">
              <v-btn block>Logout</v-btn>
            </div>
          </template>
        </v-navigation-drawer>
      </v-col>
      <v-col class="flex-grow-1 flex-shrink-0">
        <keep-alive>
          <component v-bind:is="currentTabComponent"></component>
        </keep-alive>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Calendar from '../components/Calendar';
import Table from './Table';
import Location from './Location';

export default {
  data: () => {
    return {
      name: 'Navigation',
      components: {
        Calendar,
        Table,
        Location
      },
      drawer: true,
      expandOnHover: false,
      items: [
        { title: 'Calendar', icon: 'mdi-calendar' },
        { title: 'List', icon: 'mdi-table-large' },
        { title: 'Location', icon: 'mdi-map-marker' }
      ],
      miniVariant: false,
      currentTabComponent: 'Calendar'
    };
  },
  methods: {
    selectTab(item) {
      console.log(item);
      if (item === 'Calendar') {
        this.currentTabComponent = 'Calendar';
      } else if (item === 'List') {
        this.currentTabComponent = 'Table';
      } else if (item === 'Location') {
        this.currentTabComponent = 'Location';
      }
    }
  }
};
</script>
