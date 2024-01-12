<template>
    <v-app-bar app>
      <v-toolbar >
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <!-- <v-img src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg" max-height="40" /> -->


        <v-toolbar-title>Vuetify</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn>
            <router-link to="/login">Login</router-link>
        </v-btn>
        <v-btn>
            <router-link to="/register">Register</router-link>
        </v-btn>
        <v-menu :location="'bottom'">
            <template v-slot:activator="{ props }">
                <v-btn append-icon="mdi-menu-down" v-bind="props">
                    User
                </v-btn>
            </template>

            <v-list>
                <v-list-item>
                    <v-list-item-title>
                        <router-link to="/">Home</router-link>
                    </v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>
                        <router-link to="/user">Account</router-link>
                    </v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>
                        <router-link to="/logout">Logout</router-link>
                    </v-list-item-title>
                </v-list-item>
            </v-list>
            </v-menu>
      </v-toolbar>
    </v-app-bar>
</template>

<script setup lang="ts">
import { mdiAccount } from '@mdi/js'
</script>
