export default {
  isAuthenticated: state => state.isAuthenticated,

  currentUser: state => state.user,

  username: state => state.user.nome,

  userIsLoaded: (state) => {
    return function () {
      return state.user !== ''
    }
  },
}
