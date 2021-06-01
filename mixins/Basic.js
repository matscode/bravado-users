import { mapGetters } from 'vuex'

export default {
  mounted() {
    if (this.userStore.length === 0) {
      this.$store.dispatch('user/loadUsers')
    }
  },

  computed: {
    ...mapGetters({
      userStore: 'user/userStore',
      users: 'user/users',
      loadingUsers: 'user/loadingUsers',
    }),
  },
}
