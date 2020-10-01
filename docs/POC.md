# FAIMS 3 Proof of Concept Specification

We'll build a simple proof of concept prototype application as the very first iteration of development in the project. This has a few goals:

* establish an example tool chain for building and testing 
* exercise some of the candidate tools we've been considering
* include a server and client with the client runnable on multiple platforms, particularly mobile

It is not intended that this prototype does anything useful but it makes sense that it does a simple data collection task. 

## POC Specification - Server

The server will accept the submission of JSON data records and store them. It will be able to serve a list of JSON records and serve individual records by id. 

(A very good candidate for this is just using CouchDB with no additional work, however a simple hand-coded server may also be enough). 


## POC Specification - Client

The client will be a web application that is able to collect data in a form split over two pages or screens.  The records are observations of trees. The fields in the form are as follows:

   * temperature - a numerical field
   * weather - a select field with options for "fine", "raining", "sunny", "stormy"
   * wind - a select field with options for "none", "light", "medium", "strong"
   * location - a text input
   * timestamp - auto-generated time stamp

And on the second page or screen:

   * height - a floating point number
   * girth - a floating point number
   * leaf_size - a select field with options for "small", "medium", "large"
   * leaf_shape - a select field with options for "rounded", "pointy", "divided"
   * bark_colour - a select field with options for "grey", "red", "silver", "brown"
   * bark_texture - a select field with options for "smooth", "peeling", "crinkles" "furry", "spotty"

The data for an observation will be sent to the server for storage.  

The client will also be able to display a list of observations retrieved from the server.

There is no requirement for the client to have persistent storage of any data.
It can just be read from the server API and displayed.

### Mobile Build

The client should be packaged as a mobile application using Apache Cordova (suggested, 
if something else seems prefereable then that's good).  


### Extensions

Possible extensions to the basic specification to be implemented if we have the time:

 * Collect real GPS location
 * Display records using locations in Leaflet
 * Take a photo using the device camera and upload to server with other data
