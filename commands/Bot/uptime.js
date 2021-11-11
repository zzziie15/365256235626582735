const Discord = require("discord.js")

module.exports = {
    name: "uptime",
    description: "봇의 업 타임을 보여줍니다",
    timeout: 5000,
    run: async (interaction, client) => {
        const days = Math.floor(client.uptime / 86400000)
        const hours = Math.floor(client.uptime / 3600000) % 24
        const minutes = Math.floor(client.uptime / 60000) % 60
        const seconds = Math.floor(client.uptime / 1000) % 60
        const embed = new Discord.MessageEmbed()
            .setTitle(`${client.user.username}`)
            .setColor("RED")
            .addField(":computer: 업타임", ` ${days}일 ${hours}시간 ${minutes}분 ${seconds}초`, true)
            .setTimestamp(Date())
        interaction.reply({ embeds: [embed] })
    }
}
