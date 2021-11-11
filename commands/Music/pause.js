const Discord = require("discord.js")

module.exports = {
    name: "pause",
    description: "현재 재생중인 트랙을 일시 중지합니다.",
    timeout: 5000,
    run: async (interaction, client) => {
        const queue = await client.distube.getQueue(interaction)
        const voiceChannel = interaction.member.voice.channel
        if (!voiceChannel) {
            return interaction.reply({ content: "먼저 채널에 가입해주세요!", ephemeral: true })
        }
        if (!queue) {
            const queueError = new Discord.MessageEmbed()
                .setDescription("재생 할 노래가 없습니다")
                .setColor("RANDOM")
            return interaction.reply({ embeds: [queueError] })
        }
        if (interaction.member.guild.me.voice.channelId !== interaction.member.voice.channelId) {
            return interaction.reply({ content: "저와 같은 채널에 있으셔야 합니다", ephemeral: true })
        }
        try {
            await client.distube.pause(interaction)
            await interaction.reply("***트랙을 일시 중지함***")
            const message = await interaction.fetchReply()
            await message.react("⏸")
        } catch {
            interaction.reply({ content: " 대기열이 이미 일시 중지 되었습니다.", ephemeral: true })
        }
    }
}
