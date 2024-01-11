<template>
  <div>
    <v-card elevation="2">
      <v-card-title>Tambah Data</v-card-title>
      <v-card-subtitle>Call Tree SDM</v-card-subtitle>
      <v-card-text>
        <template>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-autocomplete
              v-model="data.org_id"
              :items="units"
              outlined
              clearable
              hide-no-data
              hide-selected
              required
              :rules="[v => !!v || 'Kode Organisasi is required']"
              label="Kode Organisasi"
              :item-text="(item) => `${item.id} - ${item.name}`"
              item-value="id"
            ></v-autocomplete>
            <v-text-field 
              v-model="data.npp"
              label="NPP" 
              :rules="[v => !!v || 'NPP is required']"
              outlined
              required
            ></v-text-field>
            <v-text-field 
              v-model="data.name"
              label="Nama" 
              :rules="[v => !!v || 'Nama is required']"
              outlined
              required
            ></v-text-field>
            <v-text-field 
              v-model="data.position"
              label="Posisi" 
              :rules="[v => !!v || 'Posisi is required']"
              outlined
              required
            ></v-text-field>
            <v-text-field
              v-model="data.phone_number"
              label="Nomor HP" 
              outlined
            ></v-text-field>
            <v-text-field 
              v-model="data.phone_home"
              label="Nomor Telepon Rumah"
              outlined
            ></v-text-field>
            <v-textarea 
              v-model="data.address"
              label="Alamat" 
              outlined
              required
            ></v-textarea>
            <v-text-field 
              v-model="data.employment_status"
              label="Status Karyawan"
              outlined
            ></v-text-field>
            <v-autocomplete
              v-model="data.supervisor_id"
              :items="supervisors"
              outlined
              clearable
              hide-no-data
              hide-selected
              label="Atasan"
              :item-text="(item) => `${item.npp} - ${item.name}`"
              item-value="id"
            ></v-autocomplete>

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
import { mapGetters, mapActions } from 'vuex'

export default {
  layout: 'main',
  data: () => ({
    valid: false,
    units: [],
    supervisors: [],
    data: {
      npp: null,
      name: null,
      position: null,
      supervisor_id: null,
      phone_number: null,
      phone_home: null,
      address: null,
      employment_status: null,
      org_id: null,
    }
  }),
  computed: {
    ...mapGetters({
      organization: 'organizations/getData',
      callTree: 'callTree/gettersData',
    }),
  },
  mounted() {
    this.fetchOrganization()
  },
  methods: {
    ...mapActions({
      fetchCallTree: 'callTree/fetchData',
      fetchOrganization: 'organizations/fetchData',
      storeCallTree: 'callTree/storeData',
    }),
    reset() {
      this.$refs.form.reset()
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.storeCallTree(this.data)
      } else {
        console.log('error')
      }
    }
  },
  watch: {
    organization: {
      handler: function (val) {
        if(val.error) return
        this.units = val.data.data
      },
      deep: true,
    },
    data: {
      handler: function (val) {
        if(val.org_id === null) {
          this.supervisors = [];
          this.data.supervisor_id = null;
        }else{
          this.fetchCallTree({
            org_id: val.org_id,
            is_supervisor: 'true',
            perpage: 1000,
            page: 1,
          });
        }
      },
      deep: true,
    },
    callTree: {
      handler: function (val) {
        if(val.error) return
        this.supervisors = val.data
      },
      deep: true,
    }
  }
}
</script>