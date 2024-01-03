<template>
  <v-app dark>
    <v-app-bar style="height: 70px;" absolute color="white" elevate-on-scroll scroll-target="#scrolling-techniques-7">
      <v-toolbar-title class="text-h6">Business Continuity Management</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer 
      absolute 
      floating 
      permanent 
      width="120px" 
      style="top: 70px; height: calc(100% - 70px);"
    >
      <v-list 
        v-for="(item, i) in items" :key="i"
        dense 
      >
        <v-list-item-group
          v-model="model"
          color="indigo"
          style="margin: 0 10px;"
        >
          
          <v-list-item 
            v-if="item.sub === null" :to="item.to" router exact
            link 
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

          <v-menu
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
          </v-menu>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

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
      timeout="3000"
    >
      {{ snackbarMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbar.show = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'DefaultLayout',
  middleware: 'authenticated',
  data() {
    return {
      model: 1,
      offset: true,
      items: [],
      snackbarShow: false,
      snackbarMessage: '',
      snackbarColor: '',
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
        if(val.show) {
          this.snackbarShow = val.show
          this.snackbarMessage = val.message
          this.snackbarColor = val.color
        }
      },
      deep: true,
    },
    snackbar: {
      handler: function (val) {
        if(!val.show) {
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