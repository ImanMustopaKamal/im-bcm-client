<template>
  <div>
    <Search>
      <template v-slot:my-slot>
        <v-row align="baseline">
          <v-col cols="3" md="3">
            <v-text-field v-model="filter.code" outlined dense label="Kode"></v-text-field>
          </v-col>
          <v-col cols="3" md="3">
            <v-text-field v-model="filter.name" outlined dense label="Nama"></v-text-field>
          </v-col>
        </v-row>
        <v-row align="baseline">
          <v-col cols="3" md="3">
            <v-checkbox v-model="filter.is_active" label="Aktif"></v-checkbox>
          </v-col>
        </v-row>
        <v-row align="baseline">
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
      :mainroute="'/workflow-module'"
      title="Workflow Module"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  layout: 'main',
  data: () => ({
    filter: {
      code: null,
      is_active: null,
      name: null,
    },
    headers: [
      {
        text: 'Kode',
        align: 'start',
        sortable: false,
        value: 'code',
      },
      {
        text: 'Nama',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    items: [],
    loading: false,
    dataLength: 10,
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
  }),
  computed: {
    ...mapGetters({
      data: 'workflowModule/gettersData',
    }),
  },
  methods: {
    ...mapActions({
      fetchData: 'workflowModule/fetchData',
    }),
    reset() {
      this.filter = {
        code: null,
        is_active: null,
        name: null,
      }
      this.search()
    },
    search() {
      this.loading = true
      this.fetchData({ 
        perpage: this.options.itemsPerPage, 
        page: 1, 
        code: this.filter.code, 
        is_active: this.filter.is_active,
        name: this.filter.name,
      });
    },
    handleUpdate() {
      console.log('update')
    },
    handleDelete() {
      console.log('delete')
    }
  },
  mounted() {
    this.search()
  },
  watch: {
    data: {
      handler: function(val) {
        this.loading = false
        this.items = val.data
        this.dataLength = val?.meta?.data_count ?? 10
      },
      deep: true,
    }
  },
};
</script>