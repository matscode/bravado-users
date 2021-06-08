<script>
import Basic from '../mixins/Basic'
import SearchBar from './SearchBar'

export default {
  name: 'ProfileCards',
  mixins: [Basic],

  methods: {
    markAsSuitable(index) {
      this.users[index].isSuitable = true
    },
  },

  render(createElement, context) {
    return (
      <section class="profile-cards-container">
        <SearchBar />

        {this.users.length === 0 && !this.loadingUsers && (
          <div class="alert alert-warning text-center my-5 py-3">
            <h4>No User record</h4>
          </div>
        )}

        {this.loadingUsers ? (
          <div class="alert alert-info text-center my-5 py-3">
            <h4>Loading Users...</h4>
          </div>
        ) : (
          <ul class="profile-cards list-unstyled">
            <RecycleScroller
              scopedSlots={{
                default: ({ item: user, index }) => {
                  return (
                    <li key={user.email} class="list-item profile-card d-flex">
                      <div>
                        <img src={user.avatar} alt="" class="avatar" />
                      </div>

                      <div class="flex-grow-1 px-3 py-2">
                        <span
                          class="float-right text-muted small"
                          domPropsInnerHTML={user.email}
                        />
                        <h5 class="" domPropsInnerHTML={user.name}></h5>
                        <h6
                          class="font-weight-bold text-muted"
                          domPropsInnerHTML={user.title}
                        />

                        <p
                          class="text-muted small"
                          domPropsInnerHTML={`${user.address}, ${user.city}`}
                        />

                        <a
                          href="#"
                          class="text-uppercase text-success d-block mt-auto mt-sm-3"
                        >
                          {user.isSuitable ? (
                            <h6 className="">Skip Selection</h6>
                          ) : (
                            <a
                              href="#"
                              onClick={() => this.markAsSuitable(index)}
                            >
                              <h6 class="">Mark as Suitable</h6>
                            </a>
                          )}
                        </a>
                      </div>
                    </li>
                  )
                },
              }}
              class="scroller"
              items={this.users}
              itemSize={158}
              keyField="email"
            />
          </ul>
        )}
      </section>
    )
  },
}
</script>

<style lang="scss">
.profile-cards-container {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  padding: 24px 24px;
  max-width: 650px;
  width: 100%;
  min-width: 300px;
  margin: 30px auto;
  height: calc(100% - 60px);
  border-radius: 5px;
  display: flex;
  flex-direction: column;

  .profile-cards {
    overflow: auto;
    flex-grow: 1;
    height: 100%;

    .scroller {
      height: inherit;
    }

    .profile-card {
      background: #fafafa;
      height: 134px;
      border-radius: 5px;
      margin-bottom: 24px;
      overflow: hidden;

      &:last-of-type {
        margin-bottom: 0;
      }

      img.avatar {
        width: 130px;
        height: 100%;
        object-fit: cover;
        background: #ccc;
      }
    }
  }
}
</style>
