<template>
  <v-autocomplete
    v-model="model"
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    outlined
    clearable
    hide-no-data
    hide-selected
    :label="label"
    item-text="name"
    item-value="id"
    return-object
    @click:clear="clear()"
  ></v-autocomplete>
</template>

<script>
import DatePicker from '../../components/DatePicker.vue';
import { mapActions, mapGetters } from 'vuex'

export default {
  components: { DatePicker },
  data: () => ({
    entries: [],
    isLoading: false,
    model: null,
    search: null,
    valid: true,
    threat_type: null,
    threat_types: [],
    threat: null,
    threats: [],
    description: '',
    conditions: [],
    unitStatus: true,
    units: [],
    directlyAffected: [{
      unit: null,
      unitStatus: true,
    }],
    indirect_unit: [],
    arntDirectlyAffected: [{
      unit: null,
      segment: null,
    }],

    location: '',
    locationRules: [
      v => !!v || 'Lokasi Kejadian is required',
    ],
    is_active: false,
    cField: [{
      condition: null,
      num_employees: null,
      employee_name: null,
      num_families: null,
    }],
  }),
  mounted() {
    this.fetchTypes()
    this.fetchStafCondition()
    this.fetchData()
  },
  computed: {
    ...mapGetters({
      organization: 'organizations/getData',
      threatTypes: 'refThreat/getTypes',
      threatData: 'refThreat/getData',
      stafCondition: 'reference/getStafCondition'
    }),
    items () {
      return this.entries.map(entry => {
        return Object.assign({}, entry, { name: entry.name })
      })
    },
  },
  methods: {
    ...mapActions({
      fetchData: 'organizations/fetchData',
      fetchTypes: 'refThreat/fetchTypes',
      fetchThreats: 'refThreat/fetchData',
      fetchStafCondition: 'reference/fetchStafCondition'
    }),
    clear() {
      this.model = null
      this.entries = []
    },
    validate() {
      if (this.$refs.form.validate()) {
        console.log('success');
      }
      else {
        console.log('error');
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
  watch: {
    organization: {
      handler: function (val) {
        if(val.error) return
        this.units = val.data.data
        // this.isLoading = false
        // this.clear()
        // this.entries = val.data.data
        // this.count = val.dataCount
      },
      deep: true,
    },
    threatTypes: {
      handler: function (val, oldVal) {
        this.threats = []
        this.threat = null
        this.threat_types = val
      },
      deep: true
    },
    threat_type: {
      handler: function (val, oldVal) {
        this.fetchThreats({ is_active: true, type_id: val.id })
      },
      deep: true
    },
    threatData: {
      handler: function (val, oldVal) {
        this.threats = val
      },
      deep: true
    },
    stafCondition: {
      handler: function (val, oldVal) {
        this.conditions = val
      },
      deep: true
    },

    
    search (val) {
      if (val === null) return
      if (val.length < 3) {
        this.clear()
        return
      }
      if (this.items.length > 0) return
      if (this.isLoading) return
      this.isLoading = true
      this.fetchData({ name: val })
    },
        
  }
}
</script>