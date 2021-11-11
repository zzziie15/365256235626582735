const { joinVoiceChannel } = require("@discordjs/voice")

module.exports = {
    name: "join",
    description: "채널에 들어갑니다.",
    timeout: 5000,
    run: async (interaction, client) => {
        const voiceChannel = interaction.member.voice.channel
        if (!voiceChannel) {
            return interaction.reply({ content: "먼저 채널에 들어가주세요", ephemeral: true })
        }
        try {
            joinVoiceChannel({
                channelId: interaction.member.voice.channelId,
                guildId: interaction.guildId,
                adapterCreator: interaction.guild.voiceAdapterCreator
            })
            await interaction.reply("***채널에 성공적으로 들어왔습니다.***")
        } catch (error) {
            return interaction.reply({ content: `음성 채널 연결중에 오류가 났습니다: ${error}`, ephemeral: true })
        }
    }
}
