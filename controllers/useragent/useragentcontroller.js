// Express Rout module import 
var express = require('express');
var uuid = require("uuid");

// File and Functions import  
var UserAgentModule = require('../../module/agentusermodule');
var paginateData = require('../../helper/pagination');


class UserAgentApi {

    // Method to save user agent data
    async saveUserAgentData(requestData, cb) {
        try {
            const userAgentData = new UserAgentModule(requestData);
            await userAgentData.save();

            // Assuming cb is a callback function passed to handle the response
            return cb({ Status: "suc", Msg: "User agent data saved successfully" });
        } catch (error) {
            console.error("Error saving user agent data:", error);
            return cb({ Status: "err", Msg: "Error while saving user agent data" });
        }
    }

}

module.exports = UserAgentApi;