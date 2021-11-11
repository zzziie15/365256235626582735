const Discord = require("discord.js")

module.exports = {
    name: "shuffle",
    description: "대기열에 있는 노래를 섞어 재생함",
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
            return interaction.reply({ content: "저와 같은 채널에 있어주셔야 합니다!", ephemeral: true })
        }
        await client.distube.shuffle(interaction)
        await interaction.reply("***대기열에 있는 노래를 섞음***")
        const message = await interaction.fetchReply()
        await message.react("🔀")
    }
}
