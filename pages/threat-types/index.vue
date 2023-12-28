<template>
  <div>
    <v-card class="mb-6">
      <v-card-title>Filter</v-card-title>
      <v-card-text>
        <template>
          <v-form ref="form" lazy-validation>
            <v-container>
              <v-row align-md="center">
                <v-col cols="3" md="3">
                  <v-text-field v-model="filter.name" label="Nama"></v-text-field>
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
            </v-container>
          </v-form>
        </template>
      </v-card-text>
    </v-card>

    <v-data-table :headers="headers" :items="items" :options.sync="options" :server-items-length="100" :loading="loading"
      class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Referensi Ancaman Lv 1</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="primary" dark to="/threat-types/create">
            Tambah Data
          </v-btn>

          <v-dialog v-model="dialogDelete" max-width="350px">
            <v-card>
              <v-card-title class="text-h5 mb-3">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" depressed @click="closeDelete">Cancel</v-btn>
                <v-btn color="error" depressed @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn icon color="yellow accent-4" :to="`/threat-types/${item.id}`">
          <v-icon small>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon color="red accent-4" @click="deleteData(item)">
          <v-icon small>mdi-delete</v-icon>
        </v-btn>
      </template>

    </v-data-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      filter: {
        name: '',
        is_active: true,
      },
      items: [],
      id: null,
      dialogDelete: false,
      loading: true,
      options: {},
      headers: [
        {
          text: 'Nama',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Aktif', value: 'is_active', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
    }
  },
  computed: {
    ...mapGetters({
      // data: 'refThreat/getData',
      types: 'refThreat/getTypes',
    })
  },
  mounted() {
    this.fetchTypes({ perpage: this.options.itemsPerPage, page: this.options.page, name: this.filter.name, is_active: this.filter.is_active });
    // this.fetchData({ perpage: this.options.itemsPerPage, page: this.options.page, name: this.filter.name, type_id: this.filter.type, is_active: this.filter.is_active })
  },
  methods: {
    ...mapActions('refThreat', ['fetchTypes', 'deleteType']),
    deleteData(item) {
      this.dialogDelete = true
      this.id = item.id
    },
    closeDelete() {
      this.dialogDelete = false
    },
    deleteItemConfirm() {
      this.dialogDelete = false
      this.$store.dispatch('refThreat/deleteData', this.id)
    },
    reset() {
      this.filter = {
        name: '',
        is_active: true,
      }
      this.search()
    },
    search() {
      this.loading = true
      this.fetchTypes({ perpage: this.options.itemsPerPage, page: this.options.page, name: this.filter.name, is_active: this.filter.is_active });
    }
  },
  watch: {
    // data: {
    //   handler: function (val, oldVal) {
    //     this.items = val
    //     this.loading = false
    //   },
    //   deep: true
    // },
    options: {
      handler: function (val, oldVal) {
        this.loading = true
        this.fetchTypes({ perpage: this.options.itemsPerPage, page: this.options.page, name: this.filter.name, is_active: this.filter.is_active });
        // this.fetchData({ perpage: val.itemsPerPage, page: val.page, name: this.filter.name, type_id: this.filter.type, is_active: this.filter.is_active })
      },
      deep: true
    },
    types: {
      handler: function (val, oldVal) {
        // this.type = val
        this.items = val
        this.loading = false
      },
      deep: true
    }
  }
}
</script>