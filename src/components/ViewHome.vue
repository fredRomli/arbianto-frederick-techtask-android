<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" xl="6" lg="7" md="8">
        <v-dialog
          persistent
          ref="datepicker"
          v-model="datePickerShown"
          :return-value.sync="date"
          width="300px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              outlined
              readonly
              label="Lunch Date"
              prepend-icon="event"
              v-model="date"
              v-on="on"
            ></v-text-field>
</template>
          <v-date-picker scrollable v-model="date">
            <v-spacer></v-spacer>
            <v-btn text @click="closeDatePicker">Cancel</v-btn>
            <v-btn text color="primary" @click="setDate(date)">OK</v-btn>
          </v-date-picker>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row v-if="goodIngredients.length" justify="center">
      <v-col cols="12" xl="6" lg="7" md="8">
        <v-card>
          <v-card-title>Available Ingredients</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-list-item-group multiple v-model="selectedIngredients">
              <v-list-item
                v-for="(ingredient, i) in goodIngredients"
                :key="i"
                :value="ingredient.title"
              >
                <template v-slot:default="{ active }">
                  <v-list-item-action>
                    <v-checkbox v-model="active"></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>{{
                      ingredient.title
                    }}</v-list-item-title>
                    <v-list-item-subtitle
                      >Expired on:
                      {{ ingredient["use-by"] }}</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </template>
              </v-list-item>
            </v-list-item-group>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text
              :disabled="0 === selectedIngredients.length"
              @click="fetchPossibleRecipes"
              >View possible recipes</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog persistent v-model="recipeListShown" max-width="480">
      <v-card>
        <v-card-title>Possible Recipes</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="max-height: 80vh;">
          <recipe-list-item
            v-for="(recipe, i) in recipes"
            :key="i"
            :recipe="recipe"
          ></recipe-list-item>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeRecipeList">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import RecipeListItem from "./RecipeListItem";

export default {
  name: "ViewHome",
  components: {
    "recipe-list-item": RecipeListItem
  },
  data: () => ({
    date: '',
    datePickerShown: false,
    ingredients: [],
    goodIngredients: [],
    selectedIngredients: [],
    recipes: [],
    recipeListShown: false
  }),
  mounted: function() {
    this.fetchIngredients();
  },
  computed: {
    now: function() {
      return new Date().toISOString().substring(0, 10);
    }
  },
  watch: {
    date: function(newDate, oldDate) {
      if (oldDate !== newDate) {
        const best = new Date(newDate);
        this.goodIngredients = this.ingredients.filter(ingredient => {
          const parsedDate = new Date(ingredient["use-by"]);
          return best <= parsedDate;
        });
      }
    }
  },
  methods: {
    closeDatePicker() {
      this.datePickerShown = false;
    },
    closeRecipeList() {
      this.recipeListShown = false;
    },
    setDate(value) {
      this.$refs.datepicker.save(value);
      this.closeDatePicker();
    },
    fetchIngredients() {
      this.$http
        .get("/ingredients")
        .then(response => {
          this.ingredients = response.data;
          this.date = this.now; // initialize the date to today date by default
        })
        .catch(rejected => {
          console.log(rejected.response.status, rejected.response.data);
        });
    },
    fetchPossibleRecipes() {
      const paramValues = this.selectedIngredients.join();
      this.$http
        .get(`/recipes?ingredients=${paramValues}`)
        .then(response => {
          this.recipes = response.data;
          this.recipeListShown = true;
        })
        .catch(rejected => {
          console.log(rejected.response.status, rejected.response.data);
        });
    }
  }
};
</script>
