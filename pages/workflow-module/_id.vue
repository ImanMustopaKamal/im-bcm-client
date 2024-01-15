<template>
  <div>
    <v-card elevation="2">
      <v-card-title>Edit Data</v-card-title>
      <v-card-subtitle>Workflow Module</v-card-subtitle>
      <v-card-text>
        <template>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field 
              v-model="data.code"
              label="Kode" 
              :rules="[v => !!v || 'Kode is required']"
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

            <!-- <v-autocomplete
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
            ></v-autocomplete> -->

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
export default {
  layout: 'main',
  data: () => ({
    id: null,
    valid: false,
    units: [],
    supervisors: [],
    data: {
      code: null,
      name: null,
    }
  }),
  computed: {
    
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    reset()  {
      this.$refs.form.reset()
    }
  },
  watch: {
    
  },
  mounted() {
    this.id = this.$route.params.id
  },
}
</script>