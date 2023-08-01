(function (window, document) {
  var SSLloader = function () {
    var script = document.createElement("script");
    var tag = document.getElementsByTagName("script")[0];
    script.src = "https://sandbox.sslcommerz.com/embed.min.js?" + Math.random().toString(36).substring(7);
    tag.parentNode.insertBefore(script, tag);
  };

  window.addEventListener
    ? window.addEventListener("load", SSLloader, false)
    : window.attachEvent("onload", SSLloader);
})(window, document);