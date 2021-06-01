<script>
import { debounce } from 'lodash'
import Basic from '../mixins/Basic'

export default {
  name: 'SearchBar',
  mixins: [Basic],
  layout: 'default',
  data() {
    return {
      search: '',
    }
  },
  watch: {
    search: debounce(function (e) {
      const searchValue = e.trim().toLowerCase()
      this.$store.dispatch('user/searchUsers', searchValue).then(() => {
        if (searchValue) {
          this.$router.push({ name: 'search.q', params: { q: searchValue } })
        } else {
          this.$router.push({ name: 'index' })
        }
      })
    }, 1000),
  },
  mounted() {
    const searchQuery = this.$route.params.q || ''
    this.search = searchQuery
    if (searchQuery) {
      // put focus back on the search input if there is a search
      this.$refs.searchInput.focus()
    }
  },

  render(createElement, context) {
    return (
      <section class="search-bar mb-2">
        <div class="form-group shadow rounded">
          <div class="d-flex align-items-center">
            <span class="p-2 text-muted">
              <span class="material-icons-round">&#xe8b6;</span>
            </span>

            <div class="flex-grow-1">
              <input
                ref="searchInput"
                vModel={this.search}
                type="text"
                class="form-control form-control-lg border-0"
                placeholder="Search user..."
              />
            </div>
            <div class="users-count p-2">
              <h5 class="m-0">{this.users.length} users</h5>
            </div>
          </div>
        </div>
      </section>
    )
  },
}
</script>
