<template>
  <div>
    <Table 
      :headers="headers" 
      :items="items" 
      :loading="loading" 
      :dataLength="dataLength" 
      @update:options="handleUpdate"
      @handle:switch="handleSwitch"
      @handle:change="handleChange"
      :mainroute="'/users'"
      :hideAddButton="true"
      :roles="roles"
      title="User"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  layout: 'main',
  data: () => ({
    items: [],
    loading: false,
    dataLength: 0,
    headers: [
      { text: 'Name', align: 'start', value: 'name', sortable: false },
      { text: 'Employee Number', align: 'start', value: 'employee_number', sortable: false },
      { text: 'Organization', align: 'start', value: 'organization_name', sortable: false },
      { text: 'Business Unit', align: 'start', value: 'business_unit_name', sortable: false },
      { text: 'Business Sub Unit', align: 'start', value: 'subunit_name', sortable: false },
      { text: 'Status', align: 'start', value: 'user_status_name', sortable: false },
      { text: 'Role', align: 'start', value: 'role_id', sortable: false },
      { text: 'Enabled', align: 'start', value: 'is_app_enabled', sortable: false },
    ],
    roles: [],
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
  methods: {
    ...mapActions({
      fetchData: 'user/fetchData',
      updateData: 'user/updateData',
      fetchRoles: 'user/fetchRoles',
      updateRole: 'user/updateRole',
    }),
    handleUpdate(options) {
      this.loading = true
      this.options = options
      this.fetchData({ 
        limit: options.itemsPerPage, 
        offset: (options.page - 1) * options.itemsPerPage, 
      });
    },
    handleSwitch(item, value) {
      this.updateData({
        id: item.id,
        status: value ? 'registerApp' : 'deregisterApp',
        filter: {
          limit: this.options.itemsPerPage,
          offset: (this.options.page - 1) * this.options.itemsPerPage,
        }
      })
    },
    handleChange(item, value) {
      this.updateRole({
        id: item.id,
        role_id: value,
        filter: {
          limit: this.options.itemsPerPage,
          offset: (this.options.page - 1) * this.options.itemsPerPage,
        }
      })
    },
    search() {
      this.loading = true
      this.fetchData({ 
        limit: this.options.itemsPerPage, 
        offset: 0, 
      });
    },
  },
  computed: {
    ...mapGetters({
      data: 'user/gettersData',
      dataRoles: 'user/gettersRoles',
    }),
  },
  watch: {
    data: {
      handler: function(val) {
        this.items = val.data
        this.dataLength = val.data_count
        this.loading = false
      },
    },
    dataRoles: {
      handler: function(val) {
        this.roles = val?.data ?? []
      },
    }
  },
  mounted() {
    this.fetchRoles()
    this.search()
  },
}
</script>