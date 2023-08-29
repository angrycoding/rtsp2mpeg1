# How to display video from your IP - camera in web - browser

So you've got ip - camera and now you want to show video from it on the web page right? But this doesn't really work because you don't know how.
Well any ip - camera has [RTSP](https://en.wikipedia.org/wiki/Real_Time_Streaming_Protocol) url (url that is bound to it's internal server that can stream video out of it). First of all you'll need to get
RTSP url somehow.

You can do that using [ONVIF](https://en.wikipedia.org/wiki/ONVIF) [device manager](https://learncctv.com/onvif-device-manager/) or just look at your ip camera manual (hopefully you'll find it there),
you're looking to something like this:

```
rtsp://192.168.1.105:554/user=admin_password=x761219pQsVnr2VS_channel=1_stream=0.sdp
```


