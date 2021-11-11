const Discord = require("discord.js")
const status = (queue) => `불륨: \`${queue.volume}%\` | 루프: \`${queue.repeatMode ? queue.repeatMode === 2 ? "모든 대기열" : "현재 노래" : "Off"}\` | 자돈 재생: \`${queue.autoplay ? "On" : "Off"}\` | 필터: \`${queue.filters.join(", ") || "Off"}\``
module.exports = {
    name: "nowplay",
    description: "Current song playing",
    timeout: 5000,
    run: async (interaction, client) => {
        const queue = await client.distube.getQueue(interaction)
        const voiceChannel = interaction.member.voice.channel
        if (!voiceChannel) {
            return interaction.reply({ content: "먼저 채널에 가입해주세요!", ephemeral: true })
        }
        if (!queue) {
            const queueError = new Discord.MessageEmbed()
                .setDescription("암것도 재생되지 않았습니다!")
                .setColor("RANDOM")
            return interaction.reply({ embeds: [queueError] })
        }
        if (interaction.member.guild.me.voice.channelId !== interaction.member.voice.channelId) {
            return interaction.reply({ content: "저와 같은 채널에 있어주셔야 합니다!", ephemeral: true })
        }
        const song = queue.songs[0]
        const embed = new Discord.MessageEmbed()
            .setTitle("<:headphones:879518595602841630> Now Playing")
            .setDescription(`[${song.name}](${song.url})`)
            .addField("**조회수:**", song.views.toString())
            .addField("<:thumbsup:905718123490078760>", song.likes.toString())
            .addField("<:thumbsdown:905718123490078760>", song.dislikes.toString())
            .addField("**기간:**", `${queue.formattedCurrentTime} / ${song.formattedDuration}`)
            .addField("**상태**", status(queue).toString())
            .setThumbnail(song.thumbnail)
            .setColor("RANDOM")
        return interaction.reply({ embeds: [embed] })
    }
}
