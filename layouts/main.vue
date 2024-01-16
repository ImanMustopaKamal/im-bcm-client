<template>
  <v-app dark>
    <v-navigation-drawer dark class="light-blue darken-9" v-model="drawer" fixed app>
      <v-list v-for="(item, i) in items" :key="i" shaped>
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

              <v-list-group v-else v-bind="attrs" v-on="on" :value="false" :prepend-icon="item.icon">
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                  </v-list-item-content>
                </template>

                <v-list-item v-for="sub in item.sub" :key="sub.title" link router :to="sub.to" style="padding-left: 40px;">
                  <v-list-item-content>
                    <v-list-item-title v-text="sub.title"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
            </template>
            <span>{{ item.title }}</span>
          </v-tooltip>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="text-h6">Business Continuity Management</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>HI, {{ this.$store?.state?.auth?.name ?? 'noname' }}</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-title>
              <v-btn
                color="error"
                left
                text
                @click="logout"
              >
                Logout
              </v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-sheet id="scrolling-techniques-7" class="overflow-y-auto" max-height="600"
        style="background-color: transparent;">
        <v-container>
          <Breadcrumbs />
          <Nuxt class="mx-auto py-6"/>
        </v-container>
      </v-sheet>
    </v-main>

    <v-snackbar
      v-model="snackbarShow"
      right
      bottom
      :color="snackbarColor"
      timeout="2000"
    >
      {{ snackbarMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbarShow = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'

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
  methods: {
    ...mapActions({
      logout: 'sso/logout',
    }),
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