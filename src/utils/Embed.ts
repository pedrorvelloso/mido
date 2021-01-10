import { MessageEmbed } from 'discord.js';

interface FieldsOptions {
  title: string;
  text: string;
}

interface EmbedOptions {
  title: string;
  description: string;
  url?: string;
  color: string;
  thumbnail: 'oot';
  fields?: FieldsOptions[];
  footer?: string;
}

const thumbnails = {
  oot:
    'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/3/34/OoT_Black_Logo.png/revision/latest?cb=20170127011532',
};

export default ({
  title,
  description,
  url,
  color,
  thumbnail,
  fields,
  footer,
}: EmbedOptions): MessageEmbed => {
  const embed = new MessageEmbed();

  embed.setTitle(title);
  embed.setDescription(description);
  embed.setColor(color);
  embed.setThumbnail(thumbnails[thumbnail]);

  if (url) embed.setURL(url);

  if (footer) embed.setFooter(footer);

  if (fields) {
    fields.forEach(f => embed.addField(f.title, f.text));
  }

  return embed;
};
