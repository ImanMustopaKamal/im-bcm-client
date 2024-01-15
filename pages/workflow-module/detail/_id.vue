<template>
  <div>
    <p>Edit - {{ id }}</p>
  </div>
</template>

<script>
export default {
  layout: 'main',
  data: () => ({
    id: null,
  }),
  computed: {
    
  },
  methods: {
    
  },
  watch: {
    
  },
  mounted() {
    this.id = this.$route.params.id
  },
}
</script>