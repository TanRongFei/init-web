<template>
  <component :is="sidebarMode" />
</template>

<script>
import { mapGetters } from 'vuex'
import horizontal from './horizontal'
import vertical from './vertical'

export default {
  name: 'Sidebar',
  components: { horizontal, vertical },
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'sidebarMode'
    ])
  },
  created() {
  }
}
</script>
