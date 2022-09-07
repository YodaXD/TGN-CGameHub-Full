const { Webhook, MessageBuilder } = require('discord-webhook-node');

async function newscriptsend(title,author,image,description,script) {
    
    const hook = new Webhook('https://discordapp.com/api/webhooks/997605517881004214/qadu7MetLo68tv3S28NCBue-wdYfWJw2dIfQv1SbmCBg79Hp7L70_PV7a2YMv9Cb5IyS') ;
    const exampleEmbed = new MessageBuilder()
	.setColor('#9e2c89')
	.setTitle('Nuevo Script en el GameHub')
	.setThumbnail('https://cdn.discordapp.com/avatars/954819506641961030/17776fc018449bc2f6e2207aceb160b5.png?size=4096')
	.addField('Titulo', `${title}`)
    .addField('Autor', `${author}`)
    .addField('Descripcion', `${description}`)
    .setImage(`${image}`)
    .setFooter(`Sube tus propios scripts para ayudar a la comunidad`)
	.setTimestamp();

hook.send(exampleEmbed);
}

module.exports = { newscriptsend};