<template>
  <v-data-table 
    :headers="headers" 
    :items="items" 
    :loading="loading"
    :options.sync="dataOptions"
    :server-items-length="dataLength" 
    :footer-props="{ 'items-per-page-options': [5, 10, 25, 50, 100] }"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark :to="`${mainroute}/create`">
          Tambah Data
        </v-btn>
        <v-dialog 
          v-model="dialogDelete"
          max-width="350px"
        >
          <v-card>
            <v-card-title class="text-h5 mb-3">
              Are you sure you want to delete this item?
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" depressed @click="closeDelete">Cancel</v-btn>
              <v-btn color="error" depressed @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-btn icon color="yellow accent-4" :to="`${mainroute}/${item.id}`">
        <v-icon small>mdi-pencil</v-icon>
      </v-btn>
      <v-btn icon color="red accent-4" @click="deleteData(item)">
        <v-icon small>mdi-delete</v-icon>
      </v-btn>
    </template>

  </v-data-table>
</template>

<script>
  export default {
    props: {
      headers: {
        type: Array,
        required: true
      },
      items: {
        type: Array,
        required: true
      },
      loading: {
        type: Boolean,
        required: true
      },
      dataLength: {
        type: Number,
        required: true
      },
      mainroute: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      }
    },
    data: () => ({
      id: null,
      dataOptions: {},
      dialogDelete: false,
    }),
    methods: {
      deleteData(item) {
        this.dialogDelete = true
        this.id = item.id
      },
      closeDelete() {
        this.dialogDelete = false
      },
      deleteItemConfirm() {
        this.dialogDelete = false
        this.$emit("delete:item", this.id)
      },
    },
    watch: {
      dataOptions: {
        handler() {
          this.$emit('update:options', this.dataOptions)
        },
        deep: true
      }
    }
  }
</script>