// See http://www.cookiecentral.com/faq/#3.5
chrome.tabs.getSelected(null, function(tab) {
  domain = getDomain(tab.url)  
  chrome.cookies.getAll({}, function(cookies) {
    document.write("<pre>\n");    
    document.write("# Cookies for domains related to <b>" + domain + "</b>.\n");
    document.write("# This content may be pasted into a cookies.txt file and used by wget\n");
    document.write("# Example:  wget -x <b>--load-cookies cookies.txt</b> " + tab.url + "\n"); 
    document.write("#\n");
    for (var i in cookies) {
      cookie = cookies[i]; 
      if (cookie.domain.indexOf(domain) != -1) {     
      document.write(cookie.domain);
      document.write("\t");
      document.write((!cookie.hostOnly).toString().toUpperCase());
      document.write("\t");     
      document.write(cookie.path); 
      document.write("\t");     
      document.write(cookie.secure.toString().toUpperCase());
      document.write("\t");     
      document.write(cookie.expirationDate ? cookie.expirationDate : "0");
      document.write("\t");     
      document.write(cookie.name);
      document.write("\t");     
      document.write(cookie.value);
      document.write("\n");                      
      }
    }
    document.write("</pre>");
  });      
})

function getDomain(url)
{
  server = url.match(/:\/\/(.[^/:#?]+)/)[1];
  parts = server.split(".");
  domain = parts[parts.length - 2] + "." + parts[parts.length -1];
  return domain;
}