window.Coinbase = {
  base_url: "http://localhost:3000", //https://coinbase.com",
  oauth: {
    authorize: function(params) {
      var url = Coinbase.base_url + '/oauth/authorize?response_type=code'
      var redirectUri = Coinbase.base_url + "/oauth/javascript_sdk_redirect";
      url += "&redirect_uri=" + encodeURIComponent(redirectUri);
      url += "&client_id=" + params.clientId;
      if (params.scopes) {
        url += "&scope=" + encodeURIComponent(params.scopes);
      }

      if (params.meta) {
        for (var key in params.meta) {
          if (params.meta.hasOwnProperty(key)) {
            url += "&meta[" + encodeURIComponent(key) + "]=" + encodeURIComponent(params.meta[key]);
          }
        }
      }

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
        params.success(data);
      }
      window.addEventListener("message", receiveMessage, false);
    }
  }
};