const Discord = require("discord.js")

module.exports = {
    name: "ping",
    description: "핑을 보여줍니다.",
    run: async (interaction, client) => {
        const embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("PONG! :ping_pong:")
            .setThumbnail(interaction.user.displayAvatarURL())
            .addFields(
                { name: "핑", value: `\`${Date.now() - interaction.createdTimestamp}ms\`` },
                { name: "API 핑", value: `\`${Math.round(client.ws.ping)}ms\`` }
            )
        interaction.reply({ embeds: [embed] })
    }
}
