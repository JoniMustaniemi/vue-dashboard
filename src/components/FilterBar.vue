<script setup>
import SensoryTypeFilter from "@/components/SensoryTypeSelector.vue";
import DatePickerDialog from "@/components/DatePickerDialog.vue";
import DisplayAmountFilter from "./DisplayAmountFilter.vue";
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" class="d-flex align-center">
        <SensoryTypeFilter />
      </v-col>

      <v-col cols="12" md="4" class="d-flex align-center">
        <DisplayAmountFilter />
      </v-col>

      <v-col cols="12" md="4" class="d-flex align-center">
        <DatePickerDialog />
      </v-col>
    </v-row>
  </v-container>
</template>
