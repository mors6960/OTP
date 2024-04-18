const express = require('express');
const fast2sms = require('fast-two-sms');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('home');
});

app.post('/send-otp', async (req, res) => {
    const phoneNumber = req.body.phone; // Assuming the phone number is sent in the request body

    var options = {
        authorization: "OefsN20yLpCKJvERqmU7t4rhYwIbDQincWMXFT35k9jlHAa1xz4gCye7GrqTRNDu5lnhBX6Io9QfZxVJ",
        route: "otp", 
        variables_values: "12346",
        numbers: [phoneNumber] 
    };

    var response;
    try {
        response = await fast2sms.sendMessage(options);
        console.log(response);
        res.send('OTP sent successfully');
    } catch (error) {
        console.error(error);
        res.send('Error sending OTP');
    }
});

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
