const express = require('express')
const cors =  require('cors')
const app = express()
app.use(express.json())
app.use(cors())
const steam_Url = "http://api.steampowered.com/ISteamWebAPIUtil/GetSupportedAPIList/v0001/"
const fetch = (...args) =>
    import('node-fetch').then(({default: fetch}) => fetch(...args));

app.get("/api/steam", async (request,response) =>
{

    const data= await fetch(steam_Url)
    const jsonData = await data.json()
    response.json(jsonData)
});

app.get("/api/steam/:id", async (request,response) =>
{
    const data_url="https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=" + request.params.id + "&count=1"
    const population_url = "https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=" + request.params.id
    const achievement_url= "https://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2/?gameid=" + request.params.id
    const data1= await fetch(data_url)
    const data2= await fetch(population_url)
    const data3= await fetch(achievement_url)
    const A=  []

    const jsonData = await data1.json()
    const jsonData1 = await data2.json()
    const jsonData2 = await data3.json()
    console.log({population:jsonData1,achievement:jsonData2,news:jsonData})
    await response.json({population:jsonData1,achievement:jsonData2,news:jsonData})
});

const PORT =  3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

