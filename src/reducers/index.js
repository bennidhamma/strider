const defaultState = {
  user: null
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case 'AUTH_CHANGE':
      return Object.assign({}, state, {
        user: action.user
      })
    default:
      return state
  }
}
