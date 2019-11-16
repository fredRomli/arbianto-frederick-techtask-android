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
  </v-container>
</template>

<script>
export default {
  name: "ViewHome",
  data: () => ({
    date: '',
    datePickerShown: false,
  }),
  methods: {
    closeDatePicker() {
      this.datePickerShown = false;
    },
    setDate(value) {
      this.$refs.datepicker.save(value);
      this.closeDatePicker();
    },
  }
};
</script>
