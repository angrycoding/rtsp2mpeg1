# How to display video from your IP - camera in web - browser

So you've got ip - camera and now you want to show video from it on the web page right? But this doesn't really work because you don't know how.
Well any ip - camera has [RTSP](https://en.wikipedia.org/wiki/Real_Time_Streaming_Protocol) url (url that is bound to it's internal server that can stream video out of it). First of all you'll need to get
RTSP url somehow.

You can do that using [ONVIF](https://en.wikipedia.org/wiki/ONVIF) [device manager](https://learncctv.com/onvif-device-manager/) or just look at your ip camera manual (hopefully you'll find it there),
you're looking to something like this:

```
rtsp://192.168.1.105:554/user=admin_password=x761219pQsVnr2VS_channel=1_stream=0.sdp
```

Once you get there, the rest is easy, just open your favourite text editor and type something like: 

```
<video src="rtsp://192.168.1.105:554/user=admin_password=x761219pQsVnr2VS_channel=1_stream=0.sdp"></video>
```

Haha I'm kidding, it's not going to work because you can't just display RTSP stream from the camera in HTML5 video element, it's just not going to work.
The reason why it's not working is because HTML5 video can only display something MPEG based, MP4, MOV, MKV - all this is just a containers for H264 codec format.

So our next step will be to convert RTSP in something that browser can understand and render in HTML5 video tag. To keep it really simple we will use [MPEG1](https://en.wikipedia.org/wiki/MPEG-1)
this time. So mpeg1 is just very ancient and simpliest variation of video compression algorithm that is in the mean time understandable by the web - browser and can be relatively simple produced 
out of RTSP stream that's coming out of the camera.


