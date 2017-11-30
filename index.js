/**
 * 
 */

var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/registration"] = requestHandlers.registration;
handle["/unregistered"] = requestHandlers.unregistered;
handle["/.html"] = requestHandlers.serveFile;
handle["/events"] = requestHandlers.events;
handle["/addcourse"] = requestHandlers.addCourse;
handle["/removecourse"] = requestHandlers.removeCourse;
handle["/.css"] = requestHandlers.serveFile;
handle["/.jpg"] = requestHandlers.serveFile;
handle["/.js"] = requestHandlers.serveFile;

server.start(router.route, handle);
