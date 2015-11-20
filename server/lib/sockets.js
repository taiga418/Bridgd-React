
module.exports = function(app, io){

  io.sockets.on('connection', function (socket) {

    socket.emit('selfId', socket.id);

    socket.on('joined', function(){
      console.log('socket id:', socket.id, ' connected');
    })

    socket.on('disconnect', function () {
      console.log('socket id:', socket.id, ' disconnected');
    });

    app.on('queue update', function(queue){
      socket.emit('queueUpdate', queue)
    })

    app.on('load video', function(video){
      socket.emit('loadVideo', video)
    })

    app.on('new video', function(video){
      socket.emit('newVideo', video)
    })


  });
}



