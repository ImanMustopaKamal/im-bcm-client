<template>
  <v-app dark>
    <v-navigation-drawer dark class="light-blue darken-9" v-model="drawer" fixed app>
      <v-list v-for="(item, i) in items" :key="i">
        <v-list-item-group v-model="model" color="cyan darken-3">
          <v-tooltip top color="cyan darken-3">
            <template v-slot:activator="{ on, attrs }">
              <v-list-item v-if="item.sub === null" :to="item.to" v-bind="attrs" v-on="on" router exact link>
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <span>{{ item.title }}</span>
          </v-tooltip>

          <!-- <v-menu
            v-else
            top
            :offset-x="offset"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-list-item 
                v-bind="attrs"
                v-on="on"
                router exact link
                style="display: grid; padding: 10px; gap: 5px; height: 70px; width: 100px;"
              >
                <v-tooltip top color="indigo">
                  <template v-slot:activator="{ on, attrs }">
                    <v-list-item-icon 
                      style="margin: 0px;justify-content: center;"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                  </template>
                  <span>{{ item.title }}</span>
                </v-tooltip>
                <v-list-item-content 
                  style="text-align: center;"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>

            <v-list>
              <v-list-item
                v-for="(item, index) in item.sub" :to="item.to"
                :key="index"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu> -->
        </v-list-item-group>
      </v-list>
      <!-- <v-list v-for="(item, i) in items" :key="i">
        <v-list-item v-if="item.sub === null" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group v-else :prepend-icon="item.icon" :value="item?.value || false" no-action>
          <template v-slot:activator>
            <v-list-item-title>{{ item?.title || 'item name' }}</v-list-item-title>
          </template>
          <v-list-item v-for="(key, index) in item.sub" :key="index" :to="key.to" router exact>
            <v-list-item-icon>
              <v-icon v-text="key.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-title v-text="key.title"></v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list> -->
    </v-navigation-drawer>

    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="text-h6">Business Continuity Management</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'MainLayout',
  middleware: 'authenticated',
  data() {
    return {
      model: 1,
      offset: true,
      items: [],
      snackbarShow: false,
      snackbarMessage: '',
      snackbarColor: '',
      miniVariant: false,
      right: false,
      rightDrawer: false,
      title: 'BCM',
      clipped: false,
      drawer: true,
      fixed: true,
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.auth,
    }),
    ...mapGetters({
      data: 'menu/getData',
      alert: 'menu/getAlert',
    }),
  },
  mounted() {
    this.items = this.data
  },
  watch: {
    data: {
      handler: function (val) {
        this.items = val
      },
      deep: true,
    },
    alert: {
      handler: function (val) {
        if (val.show) {
          this.snackbarShow = val.show
          this.snackbarMessage = val.message
          this.snackbarColor = val.color
        }
      },
      deep: true,
    },
    snackbar: {
      handler: function (val) {
        if (!val.show) {
          this.snackbarShow = false
          this.snackbarMessage = ''
          this.snackbarColor = ''
          this.toggleAlert({ show: false, message: '', color: '' })
        }
      },
      deep: true,
    },
  }
}
</script>