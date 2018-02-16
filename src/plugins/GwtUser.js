let user = null

const Plugin = {
  install(Vue, options) {
    console.log('installing Vue GwtUser')
    let api = options.getApi()
    if (api) {
      user = api.getUser()
    }
  }
}

const Api = {
  name() {
    if (user) {
      return user.getName()
    }
    return 'username'
  }
}

export default {
  Plugin, Api
}
