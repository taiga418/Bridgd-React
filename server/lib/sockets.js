
module.exports = function(app, io){

   io.sockets.on('connection', function (socket) {

    //socket.emit('selfId', socket.id);
    socket.on('joined', function(id){
      console.log('socket id:', socket.id, ' connected', 'to ', id);
      socket.join(id);
    })

    socket.on('disconnect', function (id){
      console.log('socket id:', socket.id, ' disconnected');
      socket.leave(id);
    });

    app.on('queue update', function(room){
      io.to(room.id).emit('queueUpdate', room.queue)
    })

    app.on('load video', function(room){
      io.to(room.id).emit('loadVideo', room.video)
    })

    //for mobile only, will be replaced
    app.on('new video', function(room){
      io.to(room.id).emit('newVideo', room.video)
    })
  })
}



