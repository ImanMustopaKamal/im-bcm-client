<template>
  <div>
    <Search>
      <template #my-slot>
        <v-row align-md="center">
          <v-col cols="3" md="3">
            <v-text-field outlined dense v-model="filter.threat" label="Jenis Bencana"></v-text-field>
          </v-col>
          <v-col cols="3" md="3">
            <v-select 
              outlined
              dense
              v-model="filter.location" 
              :items="units" 
              item-text="name" 
              item-value="id"
              persistent-hint
              single-line
              label="Lokasi Bencana"
            >
            </v-select>
          </v-col>
        </v-row>
        <div>
          <v-subheader>Tanggal Kejadian</v-subheader>
          <v-row>
            <v-col cols="3" md="3">
              <DatePicker label="Tanggal Awal" modelValue="from" required @update:date="updateDate" />
            </v-col>
            <v-col cols="3" md="3">
              <DatePicker label="Tanggal Akhir" modelValue="to" required @update:date="updateDate" />
            </v-col>
          </v-row>
        </div>
        <v-row align="baseline">
          <v-col cols="12" md="12">
            <v-radio-group
              v-model="filter.status"
              row
            >
              <v-radio
                label="Draft"
                :value="1"
              ></v-radio>
              <v-radio
                label="Proses Persetujuan"
                :value="2"
              ></v-radio>
              <v-radio
                label="Proses Persetujuan Lanjutan"
                :value="3"
              ></v-radio>
              <v-radio
                label="Disetujui"
                :value="4"
              ></v-radio>
              <v-radio
                label="Ditolak"
                :value="5"
              ></v-radio>
              <v-radio
                label="Semua"
                :value="0"
              ></v-radio>
            </v-radio-group>
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
      :dataLength="100" 
      @update:options="handleUpdate"
      @delete:item="handleDelete"
      :mainroute="'/incident'"
      title="Data Kejadian Bencana"
      :showSelect="true"
      :hideEditButton="true"
      :hideDeleteButton="true"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  layout: 'main',
  data: () => ({
    filter: {
      status: 1,
      threat: '',
      location: null,
      from: null,
      to: null,
    },
    headers: [
      {
        text: 'Jenis Bencana',
        align: 'start',
        sortable: false,
        value: 'combine_threat',
      },
      {
        text: 'Tanggal Bencana',
        align: 'start',
        sortable: false,
        value: 'disaster_date',
      },
      {
        text: 'Lokasi Bencana',
        align: 'start',
        sortable: false,
        value: 'disaster_location_name',
      },
      {
        text: 'Unit Pencatatan',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      {
        text: 'Status',
        align: 'center',
        sortable: false,
        value: 'wf_status_id',
      },
      { text: 'Actions', align: 'center', value: 'actions', sortable: false }
    ],
    type: [],
    units: [],
    items: [],
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
      data: 'incident/getData',
      organization: 'organizations/getData',
    })
  },
  async mounted () {
    await this.fetchOrganization()
    await this.search()
  },
  methods: {
    ...mapActions({
      fetchData: 'incident/fetchData',
      deleteData: 'incident/deleteData',
      fetchOrganization: 'organizations/fetchData',
    }),
    handleUpdate(options) {
      this.loading = true
      this.options = options
      this.fetchData({
        ...this.filter,
        perpage: options.itemsPerPage, 
        page: options.page,
      })
    },
    handleDelete(id) {
      this.deleteData({
        id: id, 
        filter: { 
          ...this.filter,
          perpage: this.options.itemsPerPage, 
          page: this.options.page,
        }
      })
    },
    reset() {
      this.filter = {
        status: 1,
        threat: '',
        location: null,
        from: null,
        to: null,
      }
      this.search()
    },
    search() {
      this.loading = true
      this.fetchData({ 
        ...this.filter,
        perpage: this.options.itemsPerPage, 
        page: 1, 
      })
    },
    updateDate(date, params) {
      if(params === 'from') {
        this.filter.from = date
      } else {
        this.filter.to = date
      }
    }
  },
  watch: {
    data: {
      handler: function (val, oldVal) {
        this.items = val
        this.loading = false
      },
      deep: true
    },
    organization: {
      handler: function (val) {
        if(val.error) return
        this.units = val.data.data
      },
      deep: true,
    },
  }
}
</script>
