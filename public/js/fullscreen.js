var _isfullscreen = false;
function toggleFullscreen () {

  var isfs = document.isFullScreen || document.webkitIsFullScreen;

  if (isfs) {
    if (document.exitFullscreen)
      document.exitFullscreen();
    else if (document.webkitExitFullscreen)
      document.webkitExitFullscreen();
  } else {
    if (document.documentElement.requestFullscreen)
      document.documentElement.requestFullscreen();
    else if (document.documentElement.webkitRequestFullscreen)
      document.documentElement.webkitRequestFullscreen();
  }
}