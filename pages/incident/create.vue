<template>
  <div>
    <v-card elevation="2">
      <v-card-title>Tambah Data</v-card-title>
      <v-card-subtitle class="mb-3">Kejadian Bencana</v-card-subtitle>
      <v-card-text>
        <template>
          <v-form ref="form" v-model="valid" lazy-validation>
            <div>
              <v-row>
                <v-col
                  cols="6"
                  md="6"
                >
                  <DatePicker label="Tanggal Kejadian" required />
                </v-col>
                <v-col
                  cols="6"
                  md="6"
                >
                <v-autocomplete
                  v-model="model"
                  :items="items"
                  :loading="isLoading"
                  :search-input.sync="search"
                  outlined
                  clearable
                  hide-no-data
                  hide-selected
                  label="Lokasi Kejadian"
                  item-text="name"
                  item-value="id"
                  return-object
                  @click:clear="clear()"
                ></v-autocomplete>
                </v-col>
              </v-row>
            </div>

            <div>
              <v-subheader>Jenis Bencana</v-subheader>
              <v-row>
                <v-col
                  cols="6"
                  md="6"
                >
                  <v-select 
                    outlined
                    v-model="threat_type" 
                    :items="threat_types" 
                    item-text="name" 
                    item-value="id"
                    :rules="[v => !!v || 'Ancaman Lv 1 is required']" required label="Ancaman Lv 1" 
                    persistent-hint
                    return-object
                    single-line
                  ></v-select>
                </v-col>
                <v-col
                  cols="6"
                  md="6"
                >
                  <v-select 
                    outlined
                    v-model="threat" 
                    :items="threats" 
                    item-text="name" 
                    item-value="id"
                    :rules="[v => !!v || 'Ancaman Lv 2 is required']" required label="Ancaman Lv 2" 
                    persistent-hint
                    return-object
                    single-line
                  ></v-select>
                </v-col>
              </v-row>
            </div>

            <div>
              <v-row>
                <v-col
                cols="7"
                md="7"
                >
                  <v-textarea
                    outlined
                    :v-model="description"
                    name="description"
                    label="Deskripsi"
                    value=""
                    rows="3"
                  ></v-textarea>
                </v-col>
              </v-row>
            </div>

            <div>
              <v-subheader>Kondisi Pegawai dan Keluarga</v-subheader>
              <v-row align="baseline" v-for="(items, i) in cField" :key="i">
                <v-col
                  cols="3"
                  md="3"
                >
                  <v-select 
                    outlined
                    v-model="items.condition" 
                    :items="conditions" 
                    item-text="name" 
                    item-value="id"
                    :rules="[v => !!v || 'Kondisi is required']" required label="Kondisi" 
                    persistent-hint
                    return-object
                    single-line
                  ></v-select>
                </v-col>
                <v-col
                  cols="2"
                  md="2"
                >
                  <v-text-field 
                    type="number"
                    outlined
                    label="Jumlah Pegawai"
                    v-model="items.num_employees" 
                    :value="items.num_employees"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="4"
                  md="4"
                >
                  <v-text-field 
                    outlined
                    label="Nama Pegawai"
                    v-model="items.employee_name" 
                    :value="items.employee_name"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="2"
                  md="2"
                >
                  <v-text-field 
                    type="number"
                    outlined
                    label="Jumlah Keluarga"
                    v-model="items.num_families" 
                    :value="items.num_families"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="1"
                  md="1"
                >
                  <v-btn
                    v-if="i === 0"
                    class="mx-2"
                    fab
                    dark
                    small
                    color="primary"
                    @click="cField.push({ condition: null, num_employees: null, employee_name: null, num_families: null })"
                  >
                    <v-icon dark>
                      mdi-plus
                    </v-icon>
                  </v-btn>
                  <v-btn
                    v-else
                    class="mx-2"
                    fab
                    dark
                    small
                    color="primary"
                    @click="cField.splice(i, 1)"
                  >
                    <v-icon dark>
                      mdi-delete
                    </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </div>

            <div>
              <v-row>
                <v-col
                  cols="7"
                  md="7"
                >
                  <v-text-field
                    outlined
                    label="Total Unit"
                    readonly
                    :value="cField.length"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>

            <div>
              <v-subheader>Unit Terdampak Langsung</v-subheader>
              <v-row align="baseline" v-for="(items, i) in cField" :key="i">
                <v-col
                  cols="5"
                  md="5"
                >
                  <v-text-field
                    outlined
                    label="Total Unit"
                    readonly
                    :value="cField.length"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="5"
                  md="5"
                >
                  <v-radio-group
                    v-model="unitStatus"
                    row
                  >
                    <v-radio
                      label="Beroperasi"
                      :value="true"
                    ></v-radio>
                    <v-radio
                      label="Tidak Beroperasi"
                      :value="false"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col
                  cols="2"
                  md="2"
                >
                  <v-btn
                    v-if="i === 0"
                    class="mx-2"
                    fab
                    dark
                    small
                    color="primary"
                    @click="cField.push({ condition: null, num_employees: null, employee_name: null, num_families: null })"
                  >
                    <v-icon dark>
                      mdi-plus
                    </v-icon>
                  </v-btn>
                  <v-btn
                    v-else
                    class="mx-2"
                    fab
                    dark
                    small
                    color="primary"
                    @click="cField.splice(i, 1)"
                  >
                    <v-icon dark>
                      mdi-delete
                    </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </div>

            <v-checkbox v-model="is_active" label="Aktif"></v-checkbox>

            <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
              Simpan
            </v-btn>
            <v-btn color="error" class="mr-4" @click="reset">
              Reset Form
            </v-btn>
          </v-form>
        </template>
      </v-card-text>
    </v-card>
  </div>
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
        this.isLoading = false
        this.clear()
        if(val.error) return
        this.entries = val.data.data
        this.count = val.dataCount
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