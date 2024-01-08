<template>
  <div>
    <Search>
      <template #my-slot>
        <v-row align-md="center">
          <v-col cols="3" md="3">
            <v-text-field outlined dense v-model="filter.name" label="Jenis Bencana"></v-text-field>
          </v-col>
          <v-col cols="3" md="3">
            <v-select 
              outlined
              dense
              v-model="filter.type" 
              :items="type" 
              item-text="name" 
              item-value="id"
              persistent-hint
              return-object
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
              <DatePicker label="Tanggal Awal" required />
            </v-col>
            <v-col cols="3" md="3">
              <DatePicker label="Tanggal Akhir" required />
            </v-col>
          </v-row>
        </div>
        <v-row align="baseline">
          <v-col cols="12" md="12">
            <v-radio-group
              v-model="status"
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
      :mainroute="'/observe-incident'"
      title="Monitoring Kejadian Bencana"
      :hideAddButton="true"
      :hideDeleteButton="true"
      :hideEditButton="true"
      :hideDetailButton="false"
    />
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
      type: [],
      status: 1,
      headers:[
        {
          text: 'Jenis Bencana',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Tanggal Bencana',
          align: 'start',
          sortable: false,
          value: 'date',
        },
        {
          text: 'Lokasi Bencana',
          align: 'start',
          sortable: false,
          value: 'location',
        },
        { text: 'Actions', align: 'center', value: 'actions', sortable: false }
      ],
      items: [{
        name: 'Bencana Banjir',
        date: '2021-01-01',
        location: 'Jakarta',
        actions: true,
      }],
      loading: false,
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
      handleUpdate() {

      },
      handleDelete(){
        
      }
    },
  }
</script>