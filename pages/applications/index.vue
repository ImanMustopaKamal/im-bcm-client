<template>
  <div>
    <v-data-table :headers="headers" :items="items" :options.sync="options" :server-items-length="items.length"
      :loading="loading" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Data Aplikasi</v-toolbar-title>
          <!-- <v-divider class="mx-4" inset vertical></v-divider> -->
          <v-spacer></v-spacer>
          <v-btn color="primary" dark to="/referensi-aplikasi/create">
            Tambah Data
          </v-btn>
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn
          icon
          color="pink"
          :to="`/referensi-aplikasi/${item.id}`"
        >
          <v-icon small>mdi-pencil</v-icon>
        </v-btn>
        <v-icon small>
          mdi-delete
        </v-icon>
      </template>

    </v-data-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      items: [],
      loading: true,
      options: {},
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
        { text: 'Severty', value: 'severty' },
        { text: 'Aktif', value: 'is_active' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
    }
  },
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
  },
  watch: {
    data: {
      handler: function (val, oldVal) {
        this.items = val
        this.loading = false
      },
      deep: true
    }
  }
}
</script>