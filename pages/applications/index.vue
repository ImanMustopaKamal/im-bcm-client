<template>
  <div>
    <Search>
      <template v-slot:my-slot>
        <v-row align-md="center">
          <v-col cols="3" md="3">
            <v-text-field v-model="filter.code" label="Kode"></v-text-field>
          </v-col>
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
      </template>
    </Search>

    <Table 
      :headers="headers" 
      :items="items" 
      :loading="loading" 
      :dataLength="dataLength" 
      @update:options="handleUpdate"
      @delete:item="handleDelete"
      :mainroute="'/applications'"
      title="Data Aplikasi"
    />

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  layout: 'main',
  data() {
    return {
      filter: {
        code: '',
        name: '',
        is_active: true,
      },
      id: null,
      dialogDelete: false,
      items: [],
      loading: true,
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
      dataLength: 10,
      headers: [
        {
          text: 'Kode',
          align: 'start',
          value: 'code',
        },
        {
          text: 'Nama',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Severity', value: 'severity' },
        { text: 'Aktif', value: 'is_active' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
    }
  },
  computed: {
    ...mapGetters({
      data: 'refApp/getData',
      meta: 'refApp/getMeta',
    })
  },
  mounted() {
    this.search()
  },
  methods: {
    ...mapActions('refApp', ['fetchData', 'deleteData']),
    reset() {
      this.filter = {
        code: '',
        name: '',
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
        code: this.filter.code, 
        is_active: this.filter.is_active 
      })
    },
    handleUpdate(options) {
      this.loading = true
      this.options = options
      this.fetchData({ 
        perpage: options.itemsPerPage, 
        page: options.page, 
        name: this.filter.name, 
        code: this.filter.code,
        is_active: this.filter.is_active 
      });
    },
    handleDelete(id) {
      this.deleteData({
        id: id, 
        filter: { 
          perpage: this.options.itemsPerPage, 
          page: this.options.page, 
          name: this.filter.name, 
          code: this.filter.code,
          is_active: this.filter.is_active 
        }
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
    meta: {
      handler: function (val, oldVal) {
        this.dataLength = val?.data_count ?? 10
      },
      deep: true
    },
  }
}
</script>