<template>
  <div class="d-flex">
    <v-spacer></v-spacer>
    <v-breadcrumbs :items="breadCrumbs">
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item
          :to="item.href"
          :disabled="item.disabled"
        >
          {{ item.text.toUpperCase() }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    items: [],
  }),
  mounted() {
    this.items = this.data
  },
  computed: {
    ...mapGetters({
      data: 'menu/getData',
    }),
    breadCrumbs() {
      let path = ''
      var crumbs = [];
      this.$route.matched.forEach((item, i, { length }) => {
        const pathName = item.path.split("/");
        pathName.forEach((name, i, { length }) => {
          const crumb = {};
          if(name) {
            path = `${path}/${name}`;
            crumb.href = path;
            const index = this.items.findIndex((item) => item.to === path);
            if(index !== -1) {
              crumb.text = this.items[index].title;
            }else{
              crumb.text = name.replace(/-/g, ' ');
            }
          }else{
            crumb.text = "Home";
            crumb.href = `/`;
          }
          crumb.disabled = length - 1 === i;
          crumb.exact = true;
          crumbs.push(crumb)
        })
      });
      return crumbs
    },
  },
  watch: {
    data: {
      handler: function (val) {
        this.items = val
      },
      deep: true,
    },
  }
};
</script>