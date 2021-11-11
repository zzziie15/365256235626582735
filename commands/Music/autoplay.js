const Discord = require("discord.js")

module.exports = {
    name: "autoplay",
    description: "자동 재생 사용 또는 사용 안함",
    timeout: 5000,
    run: async (interaction, client) => {
        const queue = await client.distube.getQueue(interaction)
        const voiceChannel = interaction.member.voice.channel
        if (!voiceChannel) {
            return interaction.reply({ content: "채널에 먼저 들어가세요", ephemeral: true })
        }
        if (!queue) {
            const queueError = new Discord.MessageEmbed()
                .setDescription("아무것도 재생되지 않습니다.")
                .setColor("RANDOM")
            return interaction.reply({ embeds: [queueError] })
        }
        if (interaction.member.guild.me.voice.channelId !== interaction.member.voice.channelId) {
            return interaction.reply({ content: "당신은 저아 같은 채널에 있어야 합니다!", ephemeral: true })
        }
        const mode = client.distube.toggleAutoplay(interaction)
        return interaction.reply("자동 재생 설정 `" + (mode ? "On" : "Off") + "`")
    }
}
