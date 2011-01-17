// ==UserScript==
// @name reddit rage faces
// @description Adapted from Chrome version - https://github.com/maranas/Reddit-Rage-Faces
// @author Poromenos
// @include http://reddit.com/*
// @include http://www.reddit.com/*
// @match http://reddit.com/*
// @match http://www.reddit.com/*
// ==/UserScript==

//This points to the f7u12 CSS file
var cssLive = "http://www.reddit.com/r/fffffffuuuuuuuuuuuu/stylesheet.css"

var req = new window.XMLHttpRequest();
req.open(
    "GET",
    cssLive,
    false);
req.setRequestHeader('Content-type', 'text/html');
req.send('');
var styleScript = req.responseText;
// Use a style tag to inject applied_subreddit_stylesheet classes
var rageStyles = "<style type=\"text/css\" title=\"applied_subreddit_stylesheet\"> ";
var rageIndex = styleScript.indexOf("a[href=");
while (rageIndex < styleScript.length)
{
    // Copy all a[href styles, until the ending bracket.
    if (styleScript.substring(rageIndex, rageIndex+7) == "a[href=")
    {
        // Rageface, copy to <style> while not }
        while (rageIndex < styleScript.length && styleScript.charAt(rageIndex) != '}')
        {
          rageStyles = rageStyles + styleScript.charAt(rageIndex);
          rageIndex = rageIndex + 1;
        }
        rageStyles = rageStyles + '} ';
        rageIndex = rageIndex + 1;
    }
    else
    {
        // Not a rage face, find one!
        rageIndex = rageIndex + 1;
    }
}
// End this with </style>
rageStyles = rageStyles + " </style>";
window.document.head.innerHTML = window.document.head.innerHTML + rageStyles;
// Whew, done!

