let user = null

const Plugin = {
  install(Vue, options) {
    console.log('installing Vue GwtUser')
    user = options.getApi().getUser()
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
