import {
    SlashCommandBuilder,
    PermissionFlagsBits
} from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Menghapus beberapa pesan')
    .addIntegerOption(option =>
        option
            .setName('jumlah')
            .setDescription('Jumlah pesan yang akan dihapus')
            .setRequired(true)
            .setMinValue(1)
            .setMaxValue(100)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages);

export async function execute(interaction) {
    const jumlah = interaction.options.getInteger('jumlah');

    try {
        await interaction.channel.bulkDelete(jumlah, true);

        await interaction.reply({
            content: `✅ Berhasil menghapus ${jumlah} pesan.`,
            ephemeral: true
        });
    } catch (error) {
        console.error(error);

        await interaction.reply({
            content: '❌ Gagal menghapus pesan.',
            ephemeral: true
        });
    }
}
