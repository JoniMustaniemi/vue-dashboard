<script setup>
import { ref } from "vue";
import moment from "moment";
import { useFilterStore } from "@/stores/useFilterStore";

const filterStore = useFilterStore();
const modal = ref(false);
const selectedDates = ref(filterStore.selectedDates || []);

const saveDates = () => {
  filterStore.setSelectedDates(selectedDates.value);
  modal.value = false;
};

const removeDate = (date) => {
  selectedDates.value = selectedDates.value.filter(
    (d) => !moment(d).isSame(date, "day")
  );
  filterStore.setSelectedDates(selectedDates.value);
};

const clearAll = () => {
  selectedDates.value = [];
  filterStore.setSelectedDates([]);
};

const formatDate = (date) => {
  return moment(date).format("DD-MM-YYYY");
};
</script>

<template>
  <v-dialog v-model="modal" persistent width="290px">
    <template v-slot:activator="{ on, attrs }">
      <v-container>
        <v-btn
          v-bind="attrs"
          v-on="on"
          :size="$vuetify.breakpoint.smAndDown ? 'x-small' : 'small'"
          class="teal lighten-5"
        >
          Filter by Dates
        </v-btn>
        <v-container class="d-flex align-center">
          <template v-if="$vuetify.breakpoint.smAndDown">
            <span class="mx-1"
              >{{ filterStore.selectedDates.length }} selected</span
            >
            <v-btn
              v-if="filterStore.selectedDates.length > 0"
              text
              color="red"
              @click.stop="clearAll"
              class="mx-1"
            >
              Clear All
            </v-btn>
          </template>
          <template v-else>
            <v-row class="flex-wrap" no-gutters>
              <v-col
                v-for="(date, index) in filterStore.selectedDates"
                :key="index"
                cols="auto"
                class="d-flex"
              >
                <v-chip
                  color="teal"
                  class="my-2 ml-1 mr-1"
                  @click="removeDate(date)"
                  outlined
                >
                  {{ formatDate(date) }}
                  <v-icon small class="ml-2" @click.stop="removeDate(date)">
                    mdi-close
                  </v-icon>
                </v-chip>
              </v-col>
            </v-row>
          </template>
        </v-container>
      </v-container>
    </template>

    <v-date-picker v-model="selectedDates" multiple scrollable color="#00695C">
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
      <v-btn text color="primary" @click="saveDates">OK</v-btn>
    </v-date-picker>
  </v-dialog>
</template>
