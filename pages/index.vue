<template>
  <div>
    <v-card elevation="2">
      <v-card-title>Dashboard</v-card-title>
      <v-card-subtitle>sub</v-card-subtitle>
      <div v-for="(item, i) in data" :key="i">
        <p>{{ item.name }}</p>
      </div>
    </v-card>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    data: () => ({
      
    }),
    computed: {
      ...mapGetters({
        data: 'refApp/getData'
      })
    },
    mounted() {
      this.fetchData()
    },
    methods: {
      ...mapActions('refApp', ['fetchData'])
    }
  }
</script>
