<template>
  <div>
    <v-card elevation="2">
      <v-card-title>Edit Data</v-card-title>
      <v-card-subtitle>Aplikasi</v-card-subtitle>
      <v-card-text>
        <template>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="code" :counter="16" :rules="codeRules" label="Kode" required></v-text-field>
            <v-text-field v-model="name" :counter="225" :rules="nameRules" label="Nama" required></v-text-field>
            <v-select v-model="select" :items="severity" :rules="[v => !!v || 'Severity is required']" label="Severity"
              required></v-select>
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
import { mapActions, mapGetters } from 'vuex'

export default {
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
    severity: [1, 2, 3, 4, 5],
    is_active: false,
  }),
  computed: {
    ...mapGetters({
      data: 'refApp/getData'
    })
  },
  mounted() {
    this.fetchDetail({ id: this.$route.params.id })
  },
  methods: {
    ...mapActions('refApp', ['fetchDetail', 'updateData']),

    validate() {
      if(this.$refs.form.validate()) {
        this.updateData({
          id: this.$route.params.id,
          data: {
            code: this.code,
            name: this.name,
            severity: Number(this.select),
            is_active: this.is_active,
          }
        })
      }else{
        console.log('error')
      }
      
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
  },
  watch: {
    data: {
      handler: function (val, oldVal) {
        this.code = val.code
        this.name = val.name
        this.select = val.severity
        this.is_active = val.is_active
      },
      deep: true
    }
  }
}
</script>