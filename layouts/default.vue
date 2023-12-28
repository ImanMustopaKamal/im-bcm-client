<template>
  <v-app dark>
    <v-app-bar style="height: 70px;" absolute color="white" elevate-on-scroll scroll-target="#scrolling-techniques-7">
      <v-toolbar-title class="text-h6">Business Continuity Management</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
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
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DefaultLayout',

  data() {
    return {
      model: 1,
      offset: true,
      items: [],
    }
  },
  computed: {
    ...mapGetters({
      data: 'menu/getData',
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
  }
}
</script>