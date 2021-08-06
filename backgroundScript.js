"use strict";
var listening = [];

window.browser = (function () {
    return window.msBrowser ||
      window.browser ||
      window.chrome;
  })();

/**
 * @param {string} verdict
 * @param {*} score 
 * @param {*} time 
 * @param {*} mem
 * @param {string}
 */
function notify(task , verdict , score , time , mem , id) {
    var details = [];
    details.push(task);
    if (score != null && typeof score != 'undefined') {
        details.push("Score :" + score);
    }
    if (time != null && typeof time != 'undefined') {
        details.push("Time taken : " + time);
    }
    if (mem != null && typeof mem != 'undefined') {
        details.push("Memory used : " + mem);
    }
    details = details.join("\n");
    if(typeof id == 'undefined') {
        id = Math.random().toString(36);
    }
    browser.notifications.create(id, {
        type: "basic",
        iconUrl: "images/img4.png",
        title: verdict,
        message: details
    })
}
/**
 * @param {Object} request 
 * @param {*} sender
 * @param {*} sendResponse
 */

browser.runtime.onMessage.addListener(function (request , sender , sendResponse){
    var task = request.task;
    var verdict = request.verdict;
    var time = request.time;
    var mem = request.mem;
    var id = request.id;
    var score = request.score;
    notify(task,verdict,score,time,mem,id);
});

