window.Coinbase = {
  base_url: "https://coinbase.com",
  oauth: {
    authorize: function(clientId, clientSecret, scope, meta, success, failure) {
      var url = Coinbase.base_url + '/oauth/authorize?response_type=code'
      var redirect_uri = Coinbase.base_url + "/oauth/javascript_sdk_redirect?grant_type=authorization_code&client_id=" + clientId + "&client_secret=" + clientSecret;
      url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
      url += "&client_id=" + clientId;
      url += "&scope=" + encodeURIComponent(scope);
      url += "&" + $.param({ meta: meta });
      var width = 850;
      var height = 600;
      var left = (screen.width - width) / 2;
      var top = (screen.height - height) / 4;
      var popup = window.open(url, 'coinbase-oauth', 'width=' + width + ',height=' + height + ',left=' + left + ',top=' + top);

      function receiveMessage(event) {
        if (event.origin !== Coinbase.base_url) {
          return;
        }

        event.source.close();
        var data = JSON.parse(event.data);
        success(data);
      }
      window.addEventListener("message", receiveMessage, false);
    }
  }
};