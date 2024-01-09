<template>
  <div>
    <Search>
      <template v-slot:my-slot>
        <v-row align-md="center">
          <v-col cols="3" md="3">
            <v-text-field v-model="filter.name" label="Nama"></v-text-field>
          </v-col>
          <v-col cols="3" md="3">
            <v-select v-model="filter.type" :items="type" item-text="name" item-value="id" persistent-hint return-object
              single-line label="Type">
            </v-select>
          </v-col>
          <v-col cols="3" md="3">
            <v-checkbox v-model="filter.is_active" label="Aktif"></v-checkbox>
          </v-col>

          <v-col cols="3" md="3">
            <v-btn color="error" @click="reset">
              Reset
            </v-btn>
            <v-btn color="primary" @click="search">
              Cari
            </v-btn>
          </v-col>

        </v-row>
      </template>
    </Search>

    <!-- <Table :headers="headers" :items="items" :loading="loading" :dataLength="dataLength" @update:options="handleUpdate"
      @delete:item="handleDelete" :mainroute="'/threats'" title="Referensi Ancaman Lv 2" /> -->
  </div>
</template>

<script>
export default {
  data: (() => {

  }),
}
</script>