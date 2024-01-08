<template>
  <v-dialog 
    ref="dialog" 
    v-model="modal" 
    :return-value.sync="date" 
    persistent 
    width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <!-- prepend-icon="mdi-calendar"  -->
      <v-text-field 
        v-model="date" 
        :label="label" 
        readonly 
        v-bind="attrs"
        v-on="on"
        outlined
        :required="required"
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="modal = false">
        Cancel
      </v-btn>
      <v-btn text color="primary" @click="$refs.dialog.save(date)">
        OK
      </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: 'Tanggal',
    },
    required: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      modal: false,
      date: null,
    }
  },
  watch: {
    date(val) {
      const date = new Date(val).toISOString();
      this.$emit('update:date', date, this.modelValue)
    },
  },
}
</script>