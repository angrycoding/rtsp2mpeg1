var WS = require('ws'),
	Net = require('net'),
	Events = require('events'),
	makeStream = require('./FFStream.js'),
	wsServer = new WS.Server({ port: 9999 });


const FFMPEG_OPTIONS = [
	'-r', '25',
	'-f', 'mpegts',
	'-codec:v', 'mpeg1video',
	'-codec:a', 'mp2',
	'-ar', '44100',
	'-ac', '1',
	'-b:a', '64k'
];




wsServer.on("connection", (socket, request) => {
	var cameraId = request.url.slice(1);
	makeStream(
		`rtsp://192.168.0.12:554/user=admin_password=tlJwpbo6_channel=1_stream=1.sdp_foo=${cameraId}`,
		FFMPEG_OPTIONS,
		socket
	);
});