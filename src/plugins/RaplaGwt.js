/* global rapla */

window.rapla = {
  RaplaCallback: function() {
    this.gwtLoaded = (starter) => {
      var errorFunction = new rapla.Catch((info) => console.log(info))
      var registerAction = () => {
        var loginToken = starter.getValidToken()
        if (loginToken != null) {
          var accessToken = loginToken.getAccessToken()
          console.log('AccessToken ' + accessToken)
          starter.registerApi(accessToken).thenAccept(new rapla.Consumer((api) => {
            window.api = api
          }))
        } else {
          window.location = '../rapla/login?url=' + window.location
        }
      }
      starter.initLocale('de_DE').thenRun(new rapla.Action(registerAction)).exceptionally(errorFunction)
    }
  }
}
