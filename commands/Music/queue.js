const Discord = require("discord.js")

module.exports = {
    name: "queue",
    description: "대기열 보여줍니다",
    timeout: 10000,
    run: async (interaction, client) => {
        const queue = await client.distube.getQueue(interaction)
        const voiceChannel = interaction.member.voice.channel
        if (!voiceChannel) {
            return interaction.reply({ content: "먼저 채널에 가입해주세요!", ephemeral: true })
        }
        if (!queue) {
            const queueError = new Discord.MessageEmbed()
                .setDescription("더 이상 재생 할 것이 없습니다!")
                .setColor("RANDOM")
            return interaction.reply({ embeds: [queueError] })
        }
        if (interaction.member.guild.me.voice.channelId !== interaction.member.voice.channelId) {
            return interaction.reply({ content: "저와 같은 채널에 있어주셔야 합니다!", ephemeral: true })
        }
        const q = queue.songs.map((song, i) => {
            return `${i === 0 ? "재생:" : `${i}.`} ${song.name} - \`${song.formattedDuration}\``
        }).join("\n")

        const embed = new Discord.MessageEmbed()
            .setDescription(`**현재 대기열: ** \n\n  ${q}`)
            .setColor("RANDOM")
        interaction.reply({ embeds: [embed] })
    }
}
