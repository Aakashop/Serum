const { MessageEmbed } = require("discord.js");
const db = require("../../schema/playlist");

module.exports = {
    name: "playlist-create",
    aliases: ["pl-create"],
    category: "Playlist",
    premium: true,
    description: "Creates A New Playlist.",
    args: true,
    usage: "<playlist name>",
    permission: [],
    owner: false,
    player: false,
    inVoiceChannel: false,
    sameVoiceChannel: false,
    execute: async (message, args, client, prefix) => {
        let num = await db.find({ UserId: message.author.id});
        const Name = args[0];
        if (Name.length > 10) {
            return message.reply({ embeds: [new MessageEmbed().setColor("#2F3136").setDescription(`<:cross1:853965073383292970> Your Playlist name should be of less than **10** character.`)] });
        };
        let data = await db.find({
            UserId: message.author.id,
            PlaylistName: Name,
        });

        if(num.length === 5){
          return message.reply({embeds: [new MessageEmbed().setColor("#2F3136").setDescription("You Can Create Maximum **5** Playlists.")]})
        }

        if (data.length > 0) {
            return message.reply({ embeds: [new MessageEmbed().setColor("#2F3136").setDescription("Playlist Already Exists.")] })
        };
        let userData = db.find({
            UserId: message.author.id
        });

        const newData = new db({
            UserName: message.author.tag,
            UserId: message.author.id,
            PlaylistName: Name,
            CreatedOn: Math.round(Date.now() / 1000)
        });
        await newData.save();
        const embed = new MessageEmbed()
            .setDescription(`<:Success:853965334297444393> Playlist Created **${Name}**`)
            .setColor("#2F3136")
        return message.channel.send({ embeds: [embed] })

    }
};