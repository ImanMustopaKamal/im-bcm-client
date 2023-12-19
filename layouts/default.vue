<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" fixed app>
      <v-list-item class="brand-container">
        <v-list-item-content class="brand-content">
          <v-list-item-title class="text-h6">
            Business Continuity
          </v-list-item-title>
          <v-list-item-subtitle>
            Management
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <!-- <v-divider></v-divider> -->

      <v-list v-for="(item, i) in items" :key="i">
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
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app>
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-spacer />
      <!-- <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <!-- <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <!-- <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: true,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Dashboard',
          to: '/',
          sub: null
        },
        {
          icon: 'mdi-apps',
          title: 'Data Kejadian Bencana',
          to: '/event-disasters',
          sub: null
        },
        {
          icon: 'mdi-apps',
          title: 'Monitoring Kejadian Bencana',
          to: '/monitoring-event',
          sub: null
        },
        {
          icon: 'mdi-apps',
          title: 'Call Tree',
          to: '/call-tree',
          sub: null
        },
        {
          icon: 'mdi-apps',
          title: 'Pengkinian Dokumen',
          to: '/call-tree',
          sub: null
        },
        {
          icon: 'mdi-apps',
          title: 'Pengujian Aplikasi',
          to: '/call-tree',
          sub: null
        },
        {
          icon: 'mdi-apps',
          title: 'Persetujuan Pengujian Aplikasi',
          to: '/call-tree',
          sub: null
        },
        {
          icon: 'mdi-apps',
          title: 'Persetujuan Data Kejadian Bencana',
          to: '/call-tree',
          sub: null
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Referensi',
          to: '/references',
          sub: [
            {
              icon: 'mdi-chart-bubble',
              title: 'Aplikasi',
              to: '/references/applications',
              value: false
            },
            {
              icon: 'mdi-chart-bubble',
              title: 'Direksi',
              to: '/references/directors',
              value: false
            },
            {
              icon: 'mdi-chart-bubble',
              title: 'Ancaman',
              to: '/references/threats',
              value: false
            },
          ]
        },
        {
          icon: 'mdi-apps',
          title: 'Settings',
          to: '/settings',
          sub: null
        },
      ],
      miniVariant: false,
      right: false,
      rightDrawer: false,
      title: 'BCM',
    }
  }
}
</script>