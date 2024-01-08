<template>
  <div class="text-center ma-2">
    <v-btn
      dark
      @click="snackbar = true"
    >
      Open Snackbar
    </v-btn>
    <v-snackbar
      v-model="snackbar"
      right
      bottom
      color="success"
      timeout="2000"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
  export default {
    layout: 'main',
    data: () => ({
      snackbar: false,
      text: `Hello, I'm a snackbar`,
    }),
  }
</script>