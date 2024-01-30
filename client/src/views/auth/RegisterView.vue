<script setup lang="ts">
import { ref } from "vue";

const bgImage = 'https://source.unsplash.com/collection/94734566/1920x1080';


const valid = ref(false);
const loading = ref(false)

const username = ref('');
const usernameRules = [
  (value: string) => {
    if (value) return true

    return 'Name is required.'
  },
  (value: string) => {
    if (value?.length <= 10) return true

    return 'Name must be less than 10 characters.'
  },
];
      
const email = ref('');
const emailRules = [
  (value: string) => {
    if (value) return true

    return 'E-mail is requred.'
  },
  (value: string) => {
    if (/.+@.+\..+/.test(value)) return true

    return 'E-mail must be valid.'
  },
];

const password = ref('');
const passwordRules = [
  (value: string) => {
    if (value) return true

    return 'Password is required.'
  },
  (value: string) => {
    if (value?.length >= 8) return true

    return 'Password must be at least 8 characters.'
  },
  (value: string) => {
    if (/^(?=.*[0-9])(?=.*[!@#$%^&*])/.test(value)) return true

    return 'Password must contain at least one number and one special character.'
  },
];

const passwordConfirm = ref('');
const passwordConfirmRules = [
  (value: string) => {
    if (value) return true

    return 'Password confirmation is required.'
  },
  (value: string) => {
    if (value === password.value) return true

    return 'Passwords do not match.'
  },
];

async function submit (event:any) {
    loading.value = true
    const results = await event
    loading.value = false
    alert(JSON.stringify(results, null, 2))
}

</script>

<template>
  <v-container fluid class="pa-0 fill-height" :style="{ backgroundImage: 'url(' + bgImage + ')', backgroundSize: 'cover' }">
    <v-main>
      <v-row justify="center" class="fill-height align-center">
        <v-col cols="12" sm="8" md="4">

          <v-card class="px-3 pt-6 pb-3">

            <v-card-title class="text-h4 font-weight-bold mb-3 text-center">
              Create your account
            </v-card-title>

            <v-card-text>
              <v-form v-model="valid" @submit.prevent="submit">
                <v-text-field 
                  v-model="username" 
                  :rules="usernameRules"
                  label="Username" 
                  required
                  class="mb-2"
                ></v-text-field>
                <v-text-field
                  v-model="email" 
                  :rules="emailRules"
                  label="Email" 
                  required
                  class="mb-2"
                ></v-text-field>
                <v-text-field 
                  v-model="password" 
                  :rules="passwordRules"
                  type="password" 
                  label="Password" 
                  required 
                  class="mb-2"
                ></v-text-field>
                <v-text-field 
                  v-model="passwordConfirm" 
                  :rules="passwordConfirmRules"
                  type="password" 
                  label="Confirm Password" 
                  required
                ></v-text-field>

                <v-btn 
                  type="submit" 
                  block 
                  size="x-large" 
                  color="primary"
                  :loading="loading"
                  :disabled="!valid"
                >
                  Register
                </v-btn>

                <p class="text-center mt-4">
                  Already have an account? <router-link to="/login">Log in</router-link>
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
