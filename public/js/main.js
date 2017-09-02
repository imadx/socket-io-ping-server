var socket = io();

socket.on('current_stats', function(data){

	app.status = 'Connection online';
	app.updateStats(data);

	let display = [];

	for(key in data){
		display.push('<h3>' + key + ':' + data[key] +  '</h3>');
	}

	// let _stats_holder = document.getElementById('stats');
	// _stats_holder.innerHTML = display.join('');

})

let app = new Vue({
	el: '#app',
	data: {
		status: 'waiting for connection...',
		stats: {}
	},
	methods: {
		updateStats: function(data){
			console.log(data);
			this.stats = data;
			console.log(this.stats);
		}
	}
});
