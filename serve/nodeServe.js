var http = require("http");
var fs = require("fs");
var url = require("url");
var path = require("path");
var open = require("open");
var cp  = require('child_process')
var md5 = require('md5');
var EventEmitter = require('events').EventEmitter; 
var _event = new EventEmitter();

const filePath = '../dist/';
let preveMd5 = null//根据时间判断文件保存

var WebSocketServer = require('ws').Server;


//创建服务器
http.createServer(function (req, res) {
    //得到地址
    console.log(url.parse(req.url))
    var pathname = url.parse(req.url).pathname;
    //判断是文件地址还是文件夹地址，如果是文件夹地址那么自动请求文件夹中的index.html
    // if(pathname.indexOf(".") == -1){
    //     pathname += "/index.html";
    // }
    var fileURL = ".."+ (pathname.indexOf('dist')>-1?'':'/dist') + pathname;
    //得到拓展名
    var extname = path.extname(fileURL);
    fileURL = fileURL.indexOf('static')>-1?fileURL:'../dist/index.html';
    // console.log(fileURL)
    //把文件读出来
    fs.readFile(fileURL, function(err, data){
        if(err){
            //文件不存在
            res.writeHead(404, {"Content-Type":"text/html;charset=UTF8"});
            res.end("404!页面没有找到！~");
        }
        var mime = getMime(fileURL.indexOf('static')>-1?extname:'.html', function (mime) {
            res.writeHead(200, {"Content-Type":mime});
            res.end(data);
        });
    });
}).listen(8081, "127.0.0.1");


function getMime(extname, callback) {
    //读取文件
    fs.readFile("./mime.json", function (err, data) {
        if(err){
            throw Error("找不到mime.json文件");
        }
        //转成JSON
        var mimeJSON = JSON.parse(data);
        var mime = mimeJSON[extname] || "text/plain";
        callback(mime);
    });
}


// open("127.0.0.1:8123/practice.html", "chrome");
cp.exec('start chrome 127.0.0.1:8081/DeepClone')


var wss = new WebSocketServer({ port: 7199 });
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('websocket已经链接 received: %s', message);
  });

  ws.send('tell love for word');
  _event.on('fileChange', function() { 
	 ws.send('reload')
  }); 
});

fs.watch(filePath,(event,filename)=>{
    var currentMd5 = md5(fs.readFileSync(filePath + filename))
    if (currentMd5 == preveMd5) {
        return 
    }
    preveMd5 = currentMd5
    // console.log(`${filePath}文件发生更新`,filePath + filename)
    if((filePath+filename)=='./practice.html'){
    	_event.emit('fileChange'); 
    }
}) 




