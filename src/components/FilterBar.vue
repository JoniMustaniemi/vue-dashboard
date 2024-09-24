<script setup>
import SensoryTypeFilter from "@/components/SensoryTypeSelector.vue";
import DatePickerDialog from "@/components/DatePickerDialog.vue";
import DisplayAmountFilter from "./DisplayAmountFilter.vue";
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <SensoryTypeFilter />
      </v-col>

      <v-col cols="12" md="4">
        <DisplayAmountFilter />
      </v-col>

      <v-col cols="12" md="4">
        <DatePickerDialog />
      </v-col>
    </v-row>
  </v-container>
</template>
