const Discord = require("discord.js")

module.exports = {
    name: "skip",
    description: "재생 한 노래를 스킵합니다",
    timeout: 5000,
    run: async (interaction, client) => {
        const queue = await client.distube.getQueue(interaction)
        const voiceChannel = interaction.member.voice.channel
        if (!voiceChannel) {
            return interaction.reply({ content: "먼저 채널에 가입해주세요!", ephemeral: true })
        }
        if (!queue) {
            const queueError = new Discord.MessageEmbed()
                .setDescription("재생 할 음악이 없습니다!")
                .setColor("RANDOM")
            return interaction.reply({ embeds: [queueError] })
        }
        if (interaction.member.guild.me.voice.channelId !== interaction.member.voice.channelId) {
            return interaction.reply({ content: "저와 같은 채널에 있어야 합니다!", ephemeral: true })
        }
        try {
            await client.distube.skip(interaction)
            await interaction.reply("***스킵함***")
            const message = await interaction.fetchReply()
            await message.react("⏭")
        } catch {
            interaction.reply({ content: "다음으로 재생할 노래가 없습니다!", ephemeral: true })
        }
    }
}
