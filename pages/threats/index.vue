<template>
  <div>
    <v-btn
      text
      color="primary"
      to="/threat-types"
    >
      Lv 1
    </v-btn>
    <Search>
      <template v-slot:my-slot>
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

    <Table 
      :headers="headers" 
      :items="items" 
      :loading="loading" 
      :dataLength="dataLength" 
      @update:options="handleUpdate"
      @delete:item="handleDelete"
      :mainroute="'/threats'"
      title="Referensi Ancaman Lv 2"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  layout: 'main',
  data: () => ({
    filter: {
      name: '',
      type: null,
      is_active: true,
    },
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
    type: [],
    items: [],
    dataLength: 0,
    options: {
      page: 1,
      itemsPerPage: 10,
      sortBy: [],
      sortDesc: [],
      groupBy: [],
      groupDesc: [],
      multiSort: false,
      mustSort: false,
    },
    loading: false,
    dataLength: 0,
  }),
  computed: {
    ...mapGetters({
      data: 'refThreat/getData',
      types: 'refThreat/getTypes',
      meta: 'refThreat/getMeta',
    })
  },
  mounted() {
    this.fetchTypes();
    this.search()
  },
  methods: {
    ...mapActions('refThreat', ['fetchData', 'fetchTypes']),
    handleUpdate(options) {
      this.loading = true
      this.options = options
      this.fetchData({ perpage: options.itemsPerPage, page: options.page, name: this.filter.name, type_id: this.filter.type, is_active: this.filter.is_active })
    },
    handleDelete(id) {
      this.$store.dispatch('refThreat/deleteData', {
        id: id, 
        filter: { 
          perpage: this.options.itemsPerPage, 
          page: this.options.page, 
          name: this.filter.name, 
          type_id: this.filter.type, 
          is_active: this.filter.is_active 
        }
      })
    },
    reset() {
      this.filter = {
        name: '',
        type: null,
        is_active: true,
      }
      this.search()
    },
    search() {
      this.loading = true
      this.fetchData({ 
        perpage: this.options.itemsPerPage, 
        page: 1, 
        name: this.filter.name, 
        type_id: this.filter.type, 
        is_active: 
        this.filter.is_active
      })
    },
  },
  watch: {
    data: {
      handler: function (val, oldVal) {
        this.items = val
        this.loading = false
      },
      deep: true
    },
    types: {
      handler: function (val, oldVal) {
        this.type = val
      },
      deep: true
    },
    meta: {
      handler: function (val, oldVal) {
        this.dataLength = val?.data_count ?? 10
      },
      deep: true
    },
  }
}
</script>
