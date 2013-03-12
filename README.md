# SlaveMyMac

A node.js server application with a JSON API to control specific applications on
my mac with AppleScript.

Backend full of spaghetti at the moment, will separate application-specfic stuff
into models.

Frontend built with Backbone.js, currently hardcoding the internal IP so that I
can access it on other devices (although I should really be calling localhost
and port-forwarding a specified port).

Needs are very specific and is not meant to compete with more robust apps like
[Remote Buddy](http://www.iospirit.com/products/remotebuddy/). However, the app
can be modified to add your own AppleScript scripts to modify your favourite
applications.
