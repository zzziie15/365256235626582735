const Discord = require("discord.js")

module.exports = {
    name: "invite",
    description: "초대 링크를 줌.",
    timeout: 10000,
    run: async (interaction, client) => {
        if (process.env.oauthv2link === undefined) {
            interaction.reply({ content: ".둪 vkdlfdp 링크가 없습니다.", ephemeral: true })
        } else {
            if (!process.env.oauthv2link.toString().startsWith("https://discord.com/")) {
                interaction.reply({ content: "봇 초대 링크를 넣어주세요.", ephemeral: true })
            } else {
                const embed = new Discord.MessageEmbed()
                    .setTitle(`${client.user.username}'이 봇의 초대링크`)
                    .setThumbnail(client.user.displayAvatarURL())
                    .setColor("RANDOM")
                    .setDescription(`초대 링크: ${process.env.oauthv2link}`)
                interaction.reply({ embeds: [embed] })
            }
        }
    }
}
