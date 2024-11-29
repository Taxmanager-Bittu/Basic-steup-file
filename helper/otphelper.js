// Express Route module import 
const axios = require('axios');
const config = require('../config/config.json');

// Functions Class For Body Component
class OTPAPI {

    async OPTSendApi(OTPTemplated, cb) {
        try {

            { // Send OTP via SMS using API
                const { credentials } = config;

                // Construct the API URL with query parameters
                const url = `${credentials.apiUrl}?ID=${credentials.ID}&Pwd=${credentials.Pwd}&PhNo=${OTPTemplated.Mobile_Number}&Text=${encodeURIComponent(OTPTemplated.message)}&TemplateID=${OTPTemplated.TemplateID}&SenderID=${credentials.SenderID}`;

                // Using axios.get instead of axios.post
                try {
                    const response = await axios.get(url);
                    console.log("OTP sent successfully:", response.data);
                    return cb({ Status: "suc", Msg: "OTP sent successfully" });

                } catch (error) {
                    console.error("Error sending OTP:", error);
                    return cb({ Status: "err", Msg: "Failed to send OTP" });
                }
            }

        } catch (error) {
            console.error("Error sending OTP:", error);
            return cb({ Status: "err", Msg: "Failed to send OTP" });
        }
    }

}

module.exports = OTPAPI;