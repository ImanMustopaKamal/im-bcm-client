<template>
  <div>
    <v-card elevation="2">
      <v-card-title>Tambah Data</v-card-title>
      <v-card-subtitle>Struktur Organisasi</v-card-subtitle>
      <v-card-text>
        <template>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-autocomplete
              v-model="child"
              :items="orgs"
              outlined
              clearable
              hide-no-data
              hide-selected
              required
              :rules="[v => !!v || 'Kode Organisasi is required']"
              label="Kode Organisasi"
              :item-text="(item) => `${item.id} - ${item.name}`"
              item-value="id"
              return-object
            ></v-autocomplete>
            <v-autocomplete
              v-model="parent"
              :items="orgs"
              outlined
              clearable
              hide-no-data
              hide-selected
              label="Kode Induk Organisasi"
              :item-text="(item) => `${item.id} - ${item.name}`"
              item-value="id"
              return-object
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
import { mapActions, mapGetters } from 'vuex'

export default {
  layout: 'main',
  data: () => ({
    valid: true,
    orgs: [],
    child: {
      id: null,
      name: null,
    },
    parent: {
      id: null,
      name: null,
    },
  }),
  computed: {
    ...mapGetters({
      organization: 'organizations/getData',
    }),
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    ...mapActions({
      fetchData: 'organizations/fetchData',
      createStructure: 'organizations/createStructure',
    }),
    validate () {
      if (this.$refs.form.validate()) {
        this.createStructure({
          org_id: this.child.id,
          org_name: this.child.name,
          parent_org_id: this.parent?.id || null,
          parent_org_name: this.parent?.name || null,
        })
      }
    },
    reset () {
      this.$refs.form.reset()
    },
  },
  watch: {
    organization: {
      handler: function (val) {
        if(val.error) return
        this.orgs = val.data.data
      },
      deep: true,
    },
  },
}
</script>