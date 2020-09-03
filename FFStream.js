const ffmpegPath = require('ffmpeg-static'),
	Spawn = require('child_process').spawn;

var STREAMS = {};

setInterval(function() {
	for (var rtspURL in STREAMS) {
		var stream = STREAMS[rtspURL];
		if (stream.isEmpty()) {
			stream.close();
			STREAMS[rtspURL] = null;
			delete STREAMS[rtspURL];
		}
	}
}, 5000);

class FFStream {

	constructor(rtspUrl, ffmpegOptions) {
		this.sockets = [];
		this.close = this.close.bind(this);
		this.onData = this.onData.bind(this);

		const stream = this.stream = Spawn(ffmpegPath, [
			'-rtsp_transport', 'tcp',
			'-i', rtspUrl,
			'-nostats',
			'-hide_banner',
			'-loglevel', 'error',
			...ffmpegOptions,
			'-'
		], {detached: false});

		stream.on('exit', this.close);
		stream.stdout.on('data', this.onData);
		stream.stderr.on('data', data => console.info(data.toString('utf8')));
	}

	isEmpty() {
		return !(this.sockets || []).length;
	}

	addClient(socket) {
		if (!this.stream) return;
		var sockets = this.sockets;
		sockets.push(socket);
		socket.on('close', () => {
			var index = sockets.indexOf(socket);
			if (index !== -1) sockets.splice(index, 1);
		});
	}

	onData(data) {
		var sockets = this.sockets;
		for (var c = 0; c < sockets.length; c++) {
			var socket = sockets[c];
			if (socket.readyState === 1) {
				socket.send(data);
			}
		}
	}

	close() {
		if (!this.stream) return;
		this.stream.kill('SIGINT');
		var sockets = this.sockets;
		while (sockets.length) {
			sockets.shift().close();
		}
		this.stream = null;
		this.sockets = null;
	}


};

module.exports = (url, options, socket) => {
	const key = JSON.stringify([url, options]);
	if (!STREAMS.hasOwnProperty(key) || !STREAMS[key]) {
		var stream = new FFStream(url, options);
		STREAMS[key] = stream;
		stream.addClient(socket);
	} else {
		STREAMS[key].addClient(socket);
	}
};