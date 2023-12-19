<template>
  <div class="mx-auto py-6">
    <v-card elevation="2">
      <v-card-title>Tambah Data</v-card-title>
      <v-card-subtitle>Aplikasi</v-card-subtitle>
      <v-card-text>
        <template>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="code" :counter="16" :rules="codeRules" label="Kode" required></v-text-field>
            <v-text-field v-model="name" :counter="225" :rules="nameRules" label="Nama" required></v-text-field>
            <v-select v-model="select" :items="severty" :rules="[v => !!v || 'Severty is required']" label="Severty"
              required></v-select>
            <v-checkbox v-model="checkbox" label="Aktif"></v-checkbox>

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
  name: 'CreateApplication',
  data: () => ({
    valid: true,
    code: '',
    codeRules: [
      v => !!v || 'Code is required',
      v => (v && v.length <= 16) || 'Code must be less than 16 characters',
    ],
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 225) || 'Name must be less than 225 characters',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    select: null,
    severty: [
      '1',
      '0',
    ],
    checkbox: false,
  }),

  methods: {
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
  },
}
</script>