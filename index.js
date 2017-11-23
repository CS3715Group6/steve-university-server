/**
 * 
 */

var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/.html"] = requestHandlers.serveFile;

handle["/.css"] = requestHandlers.serveFile;
handle["/.jpg"] = requestHandlers.serveFile;
handle["/.js"] = requestHandlers.serveFile;

server.start(router.route, handle);
