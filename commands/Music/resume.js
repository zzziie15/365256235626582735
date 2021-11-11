const Discord = require("discord.js")

module.exports = {
    name: "resume",
    description: "일시 정지 한 노래를 다시 재생 시킵니다",
    timeout: 5000,
    run: async (interaction, client) => {
        const queue = await client.distube.getQueue(interaction)
        const voiceChannel = interaction.member.voice.channel
        if (!voiceChannel) {
            return interaction.reply({ content: "먼저 채널에 가입해주세요.", ephemeral: true })
        }
        if (!queue) {
            const queueError = new Discord.MessageEmbed()
                .setDescription("다시 재생 할 노래가 없습니다.")
                .setColor("RANDOM")
            return interaction.reply({ embeds: [queueError] })
        }
        if (interaction.member.guild.me.voice.channelId !== interaction.member.voice.channelId) {
            return interaction.reply({ content: "저와 같은 채널에 있어주세요.", ephemeral: true })
        }
        try {
            await client.distube.resume(interaction)
            await interaction.reply("***대기열 다시 재생***")
            const message = await interaction.fetchReply()
            await message.react("▶")
        } catch {
            interaction.reply({ content: "대기열이 이미 재생 되고 있습니다.", ephemeral: true })
        }
    }
}
