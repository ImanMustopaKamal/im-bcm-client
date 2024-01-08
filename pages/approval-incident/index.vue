<template>
  <div>
    <Search>
      <template #my-slot>
        <v-row align-md="center">
          <v-col cols="3" md="3">
            <v-text-field v-model="filter.name" label="Nama"></v-text-field>
          </v-col>
          <v-col cols="3" md="3">
            <v-select 
              v-model="filter.type" 
              :items="type" 
              item-text="name" 
              item-value="id"
              persistent-hint
              return-object
              single-line
              label="Type"
            >
            </v-select>
          </v-col>
          <v-col cols="3" md="3">
            <v-checkbox v-model="filter.is_active" label="Aktif"></v-checkbox>
          </v-col>

          <v-col cols="3" md="3">
            <v-btn color="error" @click="reset">
              Reset
            </v-btn>
            <v-btn color="primary" @click="search">
              Cari
            </v-btn>
          </v-col>

        </v-row>
      </template>
    </Search>
  </div>
</template>

<script>
  export default {
    layout: 'main',
    data: () => ({
      filter: {
        name: '',
        type: null,
        is_active: true,
      },
      type: []
    }),
    methods: {
      async search() {
        await this.$store.dispatch('incident/search', this.filter)
      },
      reset() {
        this.filter = {
          name: '',
          type: null,
          is_active: true,
        }
        this.search()
      },
    },
  }
</script>