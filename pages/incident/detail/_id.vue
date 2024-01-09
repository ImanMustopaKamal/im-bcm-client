<template>
  <div>
    <v-card elevation="2">
      <v-card-title>Detail Data</v-card-title>
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
                  <DatePicker :defaultDate="disaster.disaster_date" label="Tanggal Kejadian" :disabled="true" required @update:date="updateDate" />
                </v-col>
                <v-col
                  cols="6"
                  md="6"
                >
                  <v-autocomplete
                    v-model="disaster.disaster_location"
                    :items="units"
                    outlined
                    clearable
                    readonly
                    hide-no-data
                    hide-selected
                    label="Lokasi Kejadian"
                    item-text="name"
                    item-value="id"
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
                    readonly
                    label="Ancaman Lv 1" 
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
                    v-model="disaster.threat_id" 
                    :items="threats" 
                    item-text="name" 
                    item-value="id"
                    readonly
                    label="Ancaman Lv 2" 
                    persistent-hint
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
                    name="description"
                    label="Deskripsi"
                    v-model="disaster.disaster_chronology"
                    readonly
                    rows="3"
                  ></v-textarea>
                </v-col>
              </v-row>
            </div>

            <div>
              <v-subheader>Kondisi Pegawai dan Keluarga</v-subheader>
              <v-row align="baseline" v-for="(items, i) in disaster_staff" :key="i">
                <v-col
                  cols="3"
                  md="3"
                >
                  <v-select 
                    outlined
                    v-model="items.staff_condition_id" 
                    :items="conditions" 
                    item-text="name" 
                    item-value="id"
                    readonly
                    label="Kondisi Pegawai" 
                    persistent-hint
                    single-line
                  ></v-select>
                </v-col>
                <v-col
                  cols="2"
                  md="2"
                >
                  <v-text-field 
                    type="number"
                    step="any"
                    min="0"
                    ref="input"
                    v-model.number="items.total"
                    outlined
                    label="Jumlah Pegawai"
                    :value="items.total"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="4"
                  md="4"
                >
                  <v-text-field 
                    outlined
                    label="Nama Pegawai"
                    v-model="items.name" 
                    :value="items.name"
                    readonly
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
                    step="any"
                    min="0"
                    ref="input"
                    v-model.number="items.total_family"
                    :value="items.total_family"
                    readonly
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
                    @click="disaster_staff.push({ staff_condition_id: null, total: null, name: null, total_family: null, })"
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
                    @click="disaster_staff.splice(i, 1)"
                  >
                    <v-icon dark>
                      mdi-delete
                    </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </div>

            <div>
              <v-subheader>Unit Terdampak Langsung</v-subheader>
              <v-row align="baseline" v-for="(items, i) in disaster_direct_unit" :key="i">
                <v-col
                  cols="5"
                  md="5"
                >
                  <v-autocomplete
                    v-model="items.location_org_id"
                    :items="units"
                    outlined
                    :rules="[v => !!v || 'Unit is required']"
                    required
                    clearable
                    hide-no-data
                    hide-selected
                    label="Unit"
                    item-text="name"
                    item-value="id"
                  ></v-autocomplete>
                </v-col>
                <v-col
                  cols="5"
                  md="5"
                >
                  <v-radio-group
                    v-model="items.is_operating"
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
                    @click="disaster_direct_unit.push({ location_org_id: null, is_operating: true })"
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
                    @click="disaster_direct_unit.splice(i, 1)"
                  >
                    <v-icon dark>
                      mdi-delete
                    </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </div>

            <div>
              <v-subheader>Estimasi Kerugian</v-subheader>
              <v-row>
                <v-col
                  cols="7"
                  md="7"
                >
                  <div style="display: inline-flex; gap: 5px; width: 100%;">
                    <div class="currencyfield">
                      <v-select 
                        outlined
                        v-model="disaster.estimated_lost_currency" 
                        :items="currency" 
                        item-text="name" 
                        item-value="code"
                        persistent-hint
                        single-line
                      ></v-select>
                    </div>
                    <v-text-field
                      outlined
                      step="any"
                      min="0"
                      ref="input"
                      v-model.number="disaster.estimated_lost"
                      :rules="[v => !!v || 'Nominal is required']"
                      required
                      type="number"
                      label="Nominal"
                    ></v-text-field>
                  </div>
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
                    name="recoveryPlan"
                    label="Rencana Pemulihan Pasca Bencana"
                    v-model="disaster.recovery_plan"
                    rows="3"
                  ></v-textarea>
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
                    name="temporaryMeasures"
                    label="Tindakan Sementara yang Telah Dilakukan"
                    v-model="disaster.temp_action_plan"
                    rows="3"
                  ></v-textarea>
                </v-col>
              </v-row>
            </div>

            <v-btn type="button" :disabled="!valid" to="/incident" color="success" class="mr-4">
              Kembali
            </v-btn>
          </v-form>
        </template>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'

export default {
  layout: 'main',
  data: () => ({
    id: null,
    valid: true,
    conditions: [],
    threat_types: [],
    threat_type: null,
    threats: [],
    units: [],
    currency: [],
    disaster: {
      org_id: null,
      threat_id: null,
      disaster_chronology: '',
      disaster_date: new Date().toISOString().substring(0, 10),
      disaster_location: null,
      estimated_lost_currency: '360',
      estimated_lost: null,
      temp_action_plan: '',
      recovery_plan: '',
    },
    disaster_staff: [{
      staff_condition_id: null,
      total: null,
      name: null,
      total_family: null,
    }],
    disaster_direct_unit : [
      {
        location_org_id : null,
        is_operating : true
      }
    ],
  }),
  mounted() {
    this.fetchDetail({ id: this.$route.params.id })
    this.fetchData()
    this.fetchTypes()
    this.fetchStafCondition()
    this.fetchIndirectUnit()
    this.fetchReffCurrency()
  },
  computed: {
    ...mapGetters({
      organization: 'organizations/getData',
      threatTypes: 'refThreat/getTypes',
      threatData: 'refThreat/getData',
      stafCondition: 'reference/getStafCondition',
      indirectUnit: 'reference/getIndirectUnit',
      reffCurrency: 'reference/getReffCurrency',
      data: 'incident/getData',
    }),
  },
  methods: {
    moment: function (date) {
      return moment(date);
    },
    ...mapActions({
      fetchData: 'organizations/fetchData',
      fetchTypes: 'refThreat/fetchTypes',
      fetchThreats: 'refThreat/fetchData',
      fetchStafCondition: 'reference/fetchStafCondition',
      fetchIndirectUnit: 'reference/fetchIndirectUnit',
      fetchReffCurrency: 'reference/fetchReffCurrency',
      doCreate: 'incident/storeData',
      fetchDetail: 'incident/fetchDetail',
    }),
    validate() {
      if (this.$refs.form.validate()) {
        this.disaster.org_id = this.disaster.disaster_location
        const data = {
          disaster: this.disaster,
          disaster_staff: this.disaster_staff,
          disaster_direct_unit: this.disaster_direct_unit,
        }
        console.log("🚀 ~ file: create.vue:427 ~ validate ~ data:", data)
        
        this.doCreate(data)
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
    updateDate(val) {
      this.disaster.disaster_date = new Date(val).toISOString().substr(0, 10)
    },
  },
  watch: {
    organization: {
      handler: function (val) {
        console.log("🚀 ~ val.data.data", val.data.data)
        if(val.error) return
        this.units = val.data.data
      },
      deep: true,
    },
    threatTypes: {
      handler: function (val, oldVal) {
        this.threats = []
        this.disaster.threat_id = null
        this.threat_types = val
      },
      deep: true
    },
    threat_type: {
      handler: function (val, oldVal) {
        this.fetchThreats({ is_active: true, type_id: val?.id ?? val })
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
    indirectUnit: {
      handler: function (val, oldVal) {
        this.indirect_unit = val
      },
      deep: true
    },
    reffCurrency: {
      handler: function (val, oldVal) {
        this.currency = val
      },
      deep: true
    },  
    data: {
      handler: function (val, oldVal) {
        if(!val) return
        this.disaster.org_id = val.disaster.org_id
        this.disaster.disaster_location = val.disaster.disaster_location
        this.disaster.disaster_date = new Date(val.disaster.disaster_date).toISOString().substr(0, 10)
        this.threat_type = val.disaster.threat.threat_types.id
        this.disaster.disaster_chronology = val.disaster.disaster_chronology
        this.disaster.estimated_lost = val.disaster.estimated_lost
        this.disaster.estimated_lost_currency = val.disaster.estimated_lost_currency
        this.disaster.recovery_plan = val.disaster.recovery_plan
        this.disaster.temp_action_plan = val.disaster.temp_action_plan
        this.disaster_staff = val.disaster_staff_affected
        this.disaster_direct_unit = val.disaster_direct_unit
      },
    }
  }
}
</script>

<style>
.currencyfield {
  width: 100px !important;
  max-width: 100px !important;
}
</style>