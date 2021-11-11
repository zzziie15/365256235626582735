const Discord = require("discord.js")
const progressbar = require("string-progressbar")

module.exports = {
    name: "volume",
    description: "불륨을 조절합니다 (최대: 200)",
    options: [
        {
            name: "amount",
            type: 10,
            description: "오디오 불륨",
            required: true
        }
    ],
    timeout: 5000,
    run: async (interaction, client) => {
        const args = interaction.options.getNumber("amount")
        const queue = await client.distube.getQueue(interaction)
        const voiceChannel = interaction.member.voice.channel
        if (!voiceChannel) {
            return interaction.reply({ content: "먼저 채널에 가입해주세요!", ephemeral: true })
        }
        if (!queue) {
            const queueError = new Discord.MessageEmbed()
                .setDescription("재생 할 노래가 없습니다!")
                .setColor("RANDOM")
            return interaction.reply({ embeds: [queueError] })
        }
        if (interaction.member.guild.me.voice.channelId !== interaction.member.voice.channelId) {
            return interaction.reply({ content: "저와 같은 채널에 있어주셔야 합니다!", ephemeral: true })
        }
        const volume = parseInt(args)
        if (volume < 1 || volume > 200) {
            return interaction.reply({ content: "올바른 숫자를 입력해주세요!(1~100)", ephemeral: true })
        }
        await client.distube.setVolume(interaction, volume)
        const total = 200
        const current = volume
        const bar = progressbar.splitBar(total, current, 27, "▬", "🔘")[0]
        await interaction.reply(`불륨 설정 ${volume}%.`)
        await interaction.channel.send(bar)
    }
}
