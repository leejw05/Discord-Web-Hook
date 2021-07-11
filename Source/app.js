var app = require("express")();
var http = require("http").createServer(app);
var io = require('socket.io')(http);
const { Webhook } = require('discord-webhook-node');

function discordsend(url,img,name,text){

    const hook = new Webhook(String(url));
    hook.setUsername(String(name));
    hook.setAvatar(String(img));
    hook.send(String(text));
}

app.get('/' ,function(req,res){
    res.sendFile(__dirname+'/index.html')
})


io.on('connection', function (socket) {
    socket.emit('sucess',"로그인성공")
    socket.on('chat message',function (data){
        const arr = data.split(" DDFF"); // URL 이미지 이름 텍스트 순
        console.log(arr.length)
        discordsend(arr[0], arr[1],arr[2],arr[3])
    })

});


http.listen(3000, () => {
  console.log("listening on *:" + "3");
});