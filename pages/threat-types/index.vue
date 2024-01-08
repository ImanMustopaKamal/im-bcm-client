<template>
  <div>
    <v-btn
      text
      color="primary"
      to="/threats"
    >
      Lv 2
    </v-btn>
    <Search>
      <template v-slot:my-slot>
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
      </template>
    </Search>

    <Table 
      :headers="headers" 
      :items="items" 
      :loading="loading" 
      :dataLength="dataLength" 
      @update:options="handleUpdate"
      @delete:item="handleDelete"
      :mainroute="'/threat-types'"
      title="Referensi Ancaman Lv 1"
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
        name: '',
        is_active: true,
      },
      items: [],
      id: null,
      dialogDelete: false,
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
      types: 'refThreat/getTypes',
      meta: 'refThreat/getMeta',
    })
  },
  mounted() {
    this.search()
  },
  methods: {
    ...mapActions('refThreat', ['fetchTypes', 'deleteType']),
    handleUpdate(options) {
      this.loading = true
      this.options = options
      this.fetchTypes({ 
        perpage: options.itemsPerPage, 
        page: options.page, 
        name: this.filter.name, 
        is_active: this.filter.is_active 
      });
    },
    handleDelete(id) {
      this.$store.dispatch('refThreat/deleteType', {
        id: id, 
        filter: { 
          perpage: this.options.itemsPerPage, 
          page: this.options.page, 
          name: this.filter.name, 
          is_active: this.filter.is_active  
        }
      })
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
      this.fetchTypes({ perpage: this.options.itemsPerPage, page: 1, name: this.filter.name, is_active: this.filter.is_active });
    }
  },
  watch: {
    types: {
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