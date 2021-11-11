const Discord = require("discord.js")

module.exports = {
    name: "loop",
    description: "노래를 계속 재생시킵니다.",
    timeout: 5000,
    run: async (interaction, client) => {
        const queue = await client.distube.getQueue(interaction)
        const voiceChannel = interaction.member.voice.channel
        if (!voiceChannel) {
            return interaction.reply({ content: "먼저 채널에 가입해주세요!", ephemeral: true })
        }
        if (!queue) {
            const queueError = new Discord.MessageEmbed()
                .setDescription("아무것도 재생되지 않았습니다!")
                .setColor("RANDOM")
            return interaction.reply({ embeds: [queueError] })
        }
        if (interaction.member.guild.me.voice.channelId !== interaction.member.voice.channelId) {
            return interaction.reply({ content: "저와 같은 채널에 있으셔야 합니다!", ephemeral: true })
        }
        let mode = client.distube.setRepeatMode(interaction)
        mode = mode ? mode === 2 ? "대기열 반복" : "on" : "Off"
        return interaction.reply("계속 재생 설정 `" + mode + "`")
    }
}
