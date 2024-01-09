<template>
  <div>
    <Search>
      <template #my-slot>
        <v-row align="baseline">
          <v-col cols="6" md="6">
            <v-autocomplete
              v-model="filter.org_id"
              :items="orgs"
              outlined
              clearable
              hide-no-data
              hide-selected
              label="Kode Organisasi"
              :item-text="(item) => `${item.id} - ${item.name}`"
              item-value="id"
            ></v-autocomplete>
          </v-col>
          <v-col cols="6" md="6">
            <v-autocomplete
              v-model="filter.parent_org_id"
              :items="orgs"
              outlined
              clearable
              hide-no-data
              hide-selected
              label="Kode Induk Organisasi"
              :item-text="(item) => `${item.id} - ${item.name}`"
              item-value="id"
            ></v-autocomplete>
          </v-col>
          
          <v-spacer></v-spacer>
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
      :mainroute="'/organization-structure'"
      title="Struktur Organisasi"
    />
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    layout: 'main',
    data: () => ({
      filter: {
        org_id: null,
        parent_org_id: null,
      },
      headers: [
        { text: 'Kode', align: 'center', value: 'org_id', sortable: false, },
        { text: 'Nama', align: 'left', value: 'org_name', sortable: false, },
        { text: 'Kode Induk', align: 'center', value: 'parent_org_id', sortable: false, },
        { text: 'Nama Induk', align: 'left', value: 'parent_org_name', sortable: false, },
        { text: 'Actions', align: 'center', value: 'actions', sortable: false }
      ],
      orgs: [],
      items: [],
      loading: false,
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
    }),
    computed: {
      ...mapGetters({
        data: 'organizations/getStructure',
        organization: 'organizations/getData',
      })
    },
    mounted() {
      this.fetchData()
      this.search()
    },
    methods: {
      ...mapActions({
        fetchData: 'organizations/fetchData',
        fetchStructure: 'organizations/fetchStructure',
        deleteStructure: 'organizations/deleteStructure',
      }),
      handleUpdate(options) {
        this.loading = true
        this.options = options
        this.fetchStructure({
          ...this.filter,
          perpage: options.itemsPerPage, 
          page: options.page,
        })
      },
      handleDelete(id) {
        this.deleteStructure({
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
          org_id: null,
          parent_org_id: null,
        }

        this.search()
      },
      search() {
        this.loading = true
        this.fetchStructure({ 
          ...this.filter,
          perpage: this.options.itemsPerPage, 
          page: 1, 
        }) 
      }
    },
    watch: {
      data: {
        handler: function (val, oldVal) {
          this.items = val.data
          this.dataLength = val.meta.data_count
          this.loading = false
        },
        deep: true
      },
      organization: {
        handler: function (val, oldVal) {
          if(val.error) return
          this.orgs = val.data.data
        },
        deep: true
      }
    }
  }
</script>