<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBarVue from './components/NavBar.vue';
import SideBarVue from './components/SideBar.vue';
</script>

<template>
  <v-app>
    <NavBarVue />

    <!-- <SideBarVue /> -->
    
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

