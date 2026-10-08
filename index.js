import express from "express";
import axios from "axios";


const app = express();
const port = 3000;
app.use(express.static("public"));

app.get("/", async (req, res) => {
    const response = await axios.get("https://api.open-meteo.com/v1/forecast?latitude=-25.5903949&longitude=28.1544429&daily=temperature_2m_max,temperature_2m_min,wind_speed_10m_max,wind_gusts_10m_max,rain_sum&hourly=temperature_2m,rain,wind_direction_10m,soil_temperature_6cm&current=rain,precipitation,temperature_2m,relative_humidity_2m&timezone=auto");

        const todayTemperature = response.data.current.temperature_2m;
        const todayHumidity = response.data.current.relative_humidity_2m;
        const todayRain = response.data.current.rain;

        const todayMax = response.data.daily.temperature_2m_max[0];
        const todayMin = response.data.daily.temperature_2m_min[0];

        const rainForecast = response.data.daily.rain_sum;

    console.log(response.data.current.temperature_2m);
    res.render("index.ejs",{ todayTemperature: todayTemperature,
                            todayHumidity: todayHumidity,
                            todayRain: todayRain,
                            todayMax: todayMax,
                            todayMin: todayMin,
                            rainForecast: rainForecast});
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
}); 

