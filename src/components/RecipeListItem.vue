<template>
  <v-list-item disabled two-line>
    <v-list-item-content>
      <v-list-item-title>{{ recipe.title }}</v-list-item-title>
      <v-list-item-subtitle>{{ ingredients }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "RecipeListItem",
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  data: function() {
    return {
      recipeData: this.recipe
    };
  },
  computed: {
    ingredients: function() {
      return this.recipeData ? this.recipeData.ingredients.join(", ") : "";
    }
  }
};
</script>
