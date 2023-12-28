<template>
  <v-app dark>
    <!-- <v-main> -->
      
          <!-- <v-card elevation="2">
            <v-card-title v-if="error.statusCode === 404">{{ pageNotFound }}</v-card-title>
            <v-card-title v-else>{{ otherError }}</v-card-title>
            <NuxtLink to="/">
              Home page
            </NuxtLink>
          </v-card> -->
      
    <!-- </v-main> -->
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <NuxtLink to="/">
      Home page
    </NuxtLink>
  </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
