<template>
  <div>
    <v-card elevation="2">
      <v-card-title>Edit Data</v-card-title>
      <v-card-subtitle>Ancaman Lv 1</v-card-subtitle>
      <v-card-text>
        <template>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="name" :counter="225" :rules="nameRules" label="Nama" required></v-text-field>

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
  layout: 'main',
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 225) || 'Name must be less than 225 characters',
    ],
    is_active: false,
  }),
  computed: {
    ...mapGetters({
      // data: 'refThreat/getData',
      types: 'refThreat/getTypes',
    })
  },
  mounted() {
    this.fetchTypeDetail({ id: this.$route.params.id })
  },
  methods: {
    ...mapActions('refThreat', ['fetchTypeDetail', 'updateType']),

    validate() {
      if (this.$refs.form.validate()) {
        this.updateType({
          id: this.$route.params.id,
          data: {
            name: this.name,
            is_active: this.is_active,
          },
        })
      } else {
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
    types: {
      handler: function (val, oldVal) {
        this.name = val.name
        this.is_active = val.is_active
      },
      deep: true
    }
  }
}
</script>