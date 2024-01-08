<template>
  <v-data-table 
    v-model="selected"
    :headers="headers" 
    :items="items" 
    :loading="loading"
    :options.sync="dataOptions"
    :server-items-length="dataLength" 
    :footer-props="{ 'items-per-page-options': [5, 10, 25, 50, 100] }"
    class="elevation-1"
    :show-select="showSelect"
  >
    <template #item.combine_threat="{ item }">
      {{ item?.threat?.threat_types?.name || '' }} - {{ item?.threat?.name || '' }}
    </template>
    <template #item.disaster_date="{ item }">
      {{ moment(item.disaster_date).format("DD MMM YYYY") }}
    </template>
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn v-if="selected.length > 0" class="mr-3" color="primary" dark :to="`${mainroute}/create`">
          Proses Data
        </v-btn>
        <v-btn v-if="!hideAddButton" color="primary" dark :to="`${mainroute}/create`">
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
      <v-btn v-if="!hideDetailButton" icon color="blue accent-4" :to="`${mainroute}/detail/${item.id}`">
        <v-icon small>mdi-magnify</v-icon>
      </v-btn>
      <v-btn v-if="!hideEditButton" icon color="yellow accent-4" :to="`${mainroute}/${item.id}`">
        <v-icon small>mdi-pencil</v-icon>
      </v-btn>
      <v-btn v-if="!hideDeleteButton ? item.delete_enable === 1 || item.delete_enable === undefined : 0" icon color="red accent-4" @click="deleteData(item)">
        <v-icon small>mdi-delete</v-icon>
      </v-btn>
    </template>

  </v-data-table>
</template>

<script>
  import moment from 'moment'
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
      },
      hideAddButton: {
        type: Boolean,
        default: false
      },
      hideDeleteButton: {
        type: Boolean,
        default: false
      },
      hideEditButton: {
        type: Boolean,
        default: false
      },
      hideDetailButton: {
        type: Boolean,
        default: false
      },
      showSelect: {
        type: Boolean,
        default: false
      },
    },
    data: () => ({
      id: null,
      dataOptions: {},
      dialogDelete: false,
      selected: [],
    }),
    methods: {
      moment: function (date) {
        return moment(date);
      },
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
      },
      selected: {
        handler() {
          // console.log("🚀 ~ file: Table.vue:144 ~ selected ~ this.selected", this.selected)
          // this.$emit('update:selected', this.selected)
        },
        deep: true
      }
    }
  }
</script>