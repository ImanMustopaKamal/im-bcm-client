<template>
  <div>
    <v-card elevation="2">
      <v-card-title>Detail Data</v-card-title>
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
              disabled
              :rules="[v => !!v || 'Kode Organisasi is required']"
              label="Kode Organisasi"
              :item-text="(item) => `${item.id} - ${item.name}`"
              item-value="id"
            ></v-autocomplete>
            <v-text-field 
              v-model="data.npp"
              label="NPP" 
              :rules="[v => !!v || 'NPP is required']"
              disabled
              outlined
              required
            ></v-text-field>
            <v-text-field 
              v-model="data.name"
              label="Nama" 
              :rules="[v => !!v || 'Nama is required']"
              disabled
              outlined
              required
            ></v-text-field>
            <v-text-field 
              v-model="data.position"
              label="Posisi" 
              :rules="[v => !!v || 'Posisi is required']"
              disabled
              outlined
              required
            ></v-text-field>
            <v-text-field
              v-model="data.phone_number"
              label="Nomor HP" 
              disabled
              outlined
            ></v-text-field>
            <v-text-field 
              v-model="data.phone_home"
              label="Nomor Telepon Rumah"
              disabled
              outlined
            ></v-text-field>
            <v-textarea 
              v-model="data.address"
              label="Alamat" 
              disabled
              outlined
              required
            ></v-textarea>
            <v-text-field 
              v-model="data.employment_status"
              label="Status Karyawan"
              disabled
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
              disabled
              item-value="id"
            ></v-autocomplete>

            <v-btn to="/call-tree" color="primary" class="mr-4">
              Kembali
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
      callTreeDetail: 'callTree/gettersDetail',
      organization: 'organizations/getData',
      callTreeData: 'callTree/gettersData',
    }),
  },
  mounted() {
    this.fetchDetail({ id: this.$route.params.id })
    this.fetchOrganization()
    this.fetchCallTree({
      org_id: this.data.org_id,
      is_supervisor: 'true',
      perpage: 1000,
      page: 1,
    })
  },
  methods: {
    ...mapActions({
      fetchDetail: 'callTree/fetchDetail',
      fetchOrganization: 'organizations/fetchData',
      fetchCallTree: 'callTree/fetchData',
      updateCallTree: 'callTree/updateData',
    }),
    reset() {
      this.$refs.form.reset()
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.updateCallTree({
          id: this.$route.params.id,
          data: this.data,
        })
      } else {
        console.log('error')
      }
    }
  },
  watch: {
    callTreeDetail: {
      handler: function (val) {
        if(val.error) return
        this.data.npp = val.npp;
        this.data.name = val.name;
        this.data.position = val.position;
        this.data.supervisor_id = val.supervisor_id;
        this.data.phone_number = val.phone_number;
        this.data.phone_home = val.phone_home;
        this.data.address = val.address;
        this.data.employment_status = val.employment_status;
        this.data.org_id = val.org_id;
      },
      deep: true,  
    },
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