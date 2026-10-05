import express from "express";
import axios from "axios";


const app = express();
const port = 3000;

app.get("/", async (req, res) => {
    const response = await axios.get("https://api.open-meteo.com/v1/forecast?latitude=-25.5903949&longitude=28.1544429&daily=temperature_2m_max,temperature_2m_min,wind_speed_10m_max,wind_gusts_10m_max&hourly=temperature_2m,rain,wind_direction_10m,soil_temperature_6cm&current=rain,precipitation&timezone=auto");

    const todayMax = response.data.daily.temperature_2m_max[0];

    console.log(todayMax);
    res.render("index.ejs",{todayMax: todayMax});
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
}); 

