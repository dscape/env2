var platform  = process.platform
  , exec      = require('child_process').exec
  , env2      = exports
  , separator
  , command
  ;

switch(platform) {
  case "win32"  :
    separator   = "&";
    command     = "set";
    break;
  case "solaris":
  case "freebsd":
  case "linux"  :
  case "darwin" :
    separator   = ";";
    command     = "export";
    break;
  default       :
    separator   = ";";
    command     = "export";
}

env2.set = function set(keypairs, callback) {
  var sh_command;
  Object.keys(keypairs).forEach(function (key) {
    var value = keypairs[key];
    sh_command += command + " " + key + "=" + '"' + value + '"' + 
      separator + " ";
  });
  exec(sh_command, callback);
};