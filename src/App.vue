<template>
  <v-app>
    <v-app-bar app dark color="indigo">
      <v-toolbar-title>{{ appTitle }}</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    appTitle: "Lunch Recipes Suggestion"
  })
};
</script>
