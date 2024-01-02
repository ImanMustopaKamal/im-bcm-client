<template>
  <div>
    <v-card elevation="2">
      <v-card-title>Tambah Data</v-card-title>
      <v-card-subtitle>Kejadian Bencana</v-card-subtitle>
      <v-card-text>
        <template>
          <v-form ref="form" v-model="valid" lazy-validation>
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
                <v-text-field 
                  outlined
                  v-model="location" 
                  :rules="locationRules" 
                  label="Lokasi Kejadian"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="6"
                md="6"
              >
                <v-select 
                  outlined
                  v-model="threat_types" 
                  :items="type" 
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
                  v-model="threat_types" 
                  :items="type" 
                  item-text="name" 
                  item-value="id"
                  :rules="[v => !!v || 'Ancaman Lv 2 is required']" required label="Ancaman Lv 2" 
                  persistent-hint
                  return-object
                  single-line
                ></v-select>
              </v-col>
              <v-col
                cols="7"
                md="7"
              >
                <v-textarea
                  outlined
                  name="input-7-4"
                  label="Outlined textarea"
                  value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
                  rows="3"
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row align="baseline">
              <v-col
                cols="3"
                md="3"
              >
                <v-select 
                  outlined
                  v-model="threat_types" 
                  :items="type" 
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
                  v-model="location" 
                  :rules="locationRules" 
                  label="Jumlah Pegawai"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="4"
                md="4"
              >
                <v-text-field 
                  outlined
                  v-model="location" 
                  :rules="locationRules" 
                  label="Nama Pegawai"
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
                  v-model="location" 
                  :rules="locationRules" 
                  label="Jumlah Keluarga"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="1"
                md="1"
              >
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  small
                  color="primary"
                >
                  <v-icon dark>
                    mdi-plus
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
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

export default {
  data: () => ({
    form: {
      date: new Date().toISOString().substr(0, 10),
      location: '',
    },
    valid: true,
    location: '',
    locationRules: [
      v => !!v || 'Lokasi Kejadian is required',
    ],
    is_active: false,
    threat_types: null,
    type: [],
  }),
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
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
  components: { DatePicker }
}
</script>