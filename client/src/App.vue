<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBarVue from './components/NavBar.vue';
import SideBarVue from './components/SideBar.vue';
</script>

<template>
    <v-app>
      <!-- <NavBarVue />
  
      <SideBarVue /> -->
      
        <!-- <v-container> -->
          <router-view></router-view>
        <!-- </v-container> -->
    </v-app>
</template>

