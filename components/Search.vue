<template>
  <v-card class="mb-6">
    <v-card-title>Filter</v-card-title>
    <v-card-text>
      <template>
        <v-form ref="form" lazy-validation>
          <v-container>
            <slot name="my-slot" />
          </v-container>
        </v-form>
      </template>
    </v-card-text>
  </v-card>
</template>

<script>
export default {

}
</script>