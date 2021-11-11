module.exports = {
    name: "play",
    description: "노래를 재생합니다,",
    options: [
        {
            name: "query",
            type: 3,
            description: "재생하고 싶은 노래나 URL을 적어주세요. | 사용 가능 URL: 유튜브",
            required: true
        }
    ],
    timeout: 5000,
    run: async (interaction, client) => {
        const voiceChannel = interaction.member.voice.channel
        const queue = await client.distube.getQueue(interaction)
        const query = interaction.options.get("query").value
        if (!voiceChannel) {
            return interaction.reply({ content: "먼저 채널에 가입해주세요!", ephemeral: true })
        }
        if (queue) {
            if (interaction.member.guild.me.voice.channelId !== interaction.member.voice.channelId) {
                return interaction.reply({ content: "저와 같은 채널에 있으셔야 합니다!", ephemeral: true })
            }
        }
        await interaction.reply("🔍 **검색중...**")
        await interaction.editReply("검색 완료")
        client.distube.playVoiceChannel(voiceChannel, query, {
            textChannel: interaction.channel,
            member: interaction.member
        })
    }
}
