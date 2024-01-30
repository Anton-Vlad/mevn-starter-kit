<script setup lang="ts">
const bgImage = 'https://source.unsplash.com/collection/94734566/1920x1080';
</script>

<template>
  <v-container fluid class="pa-0 fill-height" :style="{ backgroundImage: 'url(' + bgImage + ')', backgroundSize: 'cover' }">
    <v-main>
      <v-row justify="center" class="fill-height align-center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="px-3 pt-6 pb-3">
            <v-card-title class="text-h4 font-weight-bold mb-3 text-center">
              Welcome back
            </v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field label="Email" required></v-text-field>
                <v-text-field type="password" label="Password" required></v-text-field>
                <v-btn type="submit" block size="x-large" color="primary">Login</v-btn>

                <p class="text-center mt-4">
                  Don't have an account? <router-link to="/register">Sign up</router-link>
                </p>

                <!-- <p class="d-flex align-center ga-4">
                  <v-divider></v-divider>
                  or
                  <v-divider></v-divider>
                </p> -->
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-main>
  </v-container>
</template>
