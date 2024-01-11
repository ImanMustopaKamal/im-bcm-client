<template>
  <div>
    <Search>
      <template #my-slot>
        <v-row align-md="center">
          <v-col cols="3" md="3">
            <v-text-field outlined dense v-model="filter.npp" label="NPP"></v-text-field>
          </v-col>
          <v-col cols="3" md="3">
            <v-select 
              outlined
              dense
              v-model="filter.org_id" 
              :items="units" 
              item-text="name" 
              item-value="id"
              persistent-hint
              single-line
              label="Unit Kerja"
            >
            </v-select>
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
      @handle:import="handleImport"
      :mainroute="'/call-tree'"
      title="Call Tree SDM"
    />
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
      
        <v-card-title style="color: #fff;" class="text-h5 light-blue darken-1 mb-2">
          Import Call Tree SDM
        </v-card-title>

        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          <template>
            <v-file-input
              v-model="files"
              class="mt-4"
              label="File input"
              outlined
              color="light-blue darken-1"
              dense
              chips
              show-size
              accept="text/csv, application/csv"
            ></v-file-input>
          </template>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="!files" style="color: #fff;" color="light-blue darken-1" @click="submitImport">
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  layout: 'main',
  data: () => ({
    files: null,
    dialog: false,
    headers: [
      {
        text: 'NPP',
        align: 'start',
        sortable: false,
        value: 'npp',
      },
      {
        text: 'Nama',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      {
        text: 'Posisi',
        align: 'start',
        sortable: false,
        value: 'position',
      },
      {
        text: 'NPP Atasan',
        align: 'start',
        sortable: false,
        value: 'call_tree_sdm.npp',
      },
      {
        text: 'No. HP',
        align: 'start',
        sortable: false,
        value: 'phone_number',
      },
      {
        text: 'No. Rumah',
        align: 'start',
        sortable: false,
        value: 'phone_home',
      },
      {
        text: 'Alamat',
        align: 'start',
        sortable: false,
        value: 'address',
      },
      {
        text: 'Status Karyawan',
        align: 'start',
        sortable: false,
        value: 'employment_status',
      },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
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
    filter: {
      npp: null,
      org_id: null,
    },
    units: [],
  }),
  computed: {
    ...mapGetters({
      data: 'callTree/gettersData',
      organization: 'organizations/getData',
    }),
  },
  mounted() {
    this.search()
    this.fetchOrganization()
  },
  methods: {
    ...mapActions({
      fetch: 'callTree/fetchData',
      fetchOrganization: 'organizations/fetchData',
      importData: 'callTree/importData',
      deleteData: 'callTree/deleteData',
    }),
    reset() {
      this.filter = {
        npp: null,
        org_id: null,
      }
      this.search()
    },
    search() {
      this.loading = true
      this.fetch({ 
        perpage: this.options.itemsPerPage, 
        page: 1, 
        npp: this.filter.npp, 
        org_id: this.filter.org_id 
      });
    },
    handleUpdate(options) {
      this.loading = true
      this.options = options
      this.fetch({ 
        ...this.filter,
        perpage: options.itemsPerPage, 
        page: options.page, 
      });
    },
    handleDelete(id) {
      this.deleteData({
        id,
        filter: this.filter
      })
    },
    handleImport() {
      this.dialog = !this.dialog
    },
    submitImport() {
      const data = new FormData();
      data.append('file', this.files);
      data.append('filter', this.filter);
      this.importData(data)
    }
  },
  watch: {
    data: {
      handler: function (val) {
        this.items = val.data
        this.dataLength = val.meta.data_count
        this.loading = false
      },
      deep: true,
    },
    organization: {
      handler: function (val) {
        if(val.error) return
        this.units = val.data.data
      },
      deep: true,
    }
  },
}
</script>