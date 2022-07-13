'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const express = require('express');
const fs_1 = __importDefault(require('fs'));
const dotenv = require('dotenv');
const path = require('path');
const app = (0, express_1.default)();
const mysql = require('mysql');
const { MessageEmbed,MessageActionRow,MessageButton,Client, Intents, Message } = require('discord.js');
const { json } = require('express');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const PORT = process.env.PORT || 3000 || $PORT;
if (!fs_1.default.existsSync('./scripts.json')) {
    fs_1.default.writeFileSync('./scripts.json', '[]');
}


const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

dotenv.config({ path: './.env' });
app.use(express_1.default.json());
app.set('trust proxy', true);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'hbs');
app.get('/',(req,res) => {
    res.render('forms');
});
app.get('/completed', (req, res) => {
    res.render('completed');
});

app.get('/fail', (req, res) => {
    res.render('fail');
});

app.get('/scriptspersonal/set', (req, res) => {
    const json = req.body;
    if (!json['image']) {
        res
            .status(400)
            .send('Image not found.');
    }
    else if (!json['name']) {
        res
            .status(400)
            .send('Name not found.');
    }
    else if (!json['description']) {
        res
            .status(400)
            .send('Description not found.');
    }
    else if (!json['author']) {
        res
            .status(400)
            .send('Author not found.');
    }
    else if (!json['script']) {
        res
            .status(400)
            .send('Script not found.');
    }
    else if (!json['identificator']) {
        res
            .status(400)
            .send('Identificator not found');
    }
    else {
        const scripts = JSON.parse(fs_1.default.readFileSync(json['identificator'] + '.json', 'utf8'));
        scripts.push({
            'image': json['image'],
            'name': json['name'],
            'description': json['description'],
            'author': json['author'],
            'script': json['script'],
        });
        fs_1.default.writeFile(json['identificator'] + '.json', JSON.stringify(scripts), (err) => {
            if (err) {
                res
                    .status(500)
                    .send({
                        'success': true,
                        'message': 'There was a problem when trying to save the scripts.\n' + err.message
                    });
            }
            else {
                res
                    .status(200)
                    .send({
                        'success': true,
                        'message': ''
                    });
            }
        });
    }
});
app.get('/scriptspersonal/get', (req, res) => {
    const json = req.body;
    if (!json['indentificator']) {
        res.status(400);
        res.send('Identificator not found');
    }
    else {
        const scripts = JSON.parse(fs_1.default.readFileSync(json['identificator'] + '.json', 'utf8'));
        res.status(200);
        res.send(scripts);
    }
});
app.get('/scriptspersonal/create', (req, res) => {
    const json = req.body;
    if (!json['identificator']) {
        res
            .status(400)
            .send('Identificator not found.');
    }
    else {
        fs_1.default.writeFile(json['identificator'] + '.json', '[]', function (err) {
            if (err)
            {throw err;}
            console.log('Gamehub ' + json['identificator'] + ' created');
            res.status(200);
            res.send('Gamehub ' + json['identificator'] + ' created');
        });
    }
});
app.get('/scriptscomun/set', (req, res) => {
    const json = req.body;
    if (!json['image']) {
        res
            .status(400)
            .send('Image not found.');
    }
    else if (!json['name']) {
        res
            .status(400)
            .send('Name not found.');
    }
    else if (!json['description']) {
        res
            .status(400)
            .send('Description not found.');
    }
    else if (!json['author']) {
        res
            .status(400)
            .send('Author not found.');
    }
    else if (!json['script']) {
        res
            .status(400)
            .send('Script not found.');
    }
    else {
        const scripts = JSON.parse(fs_1.default.readFileSync('./scripts.json', 'utf8'));
        scripts.push({
            'image': json['image'],
            'name': json['name'],
            'description': json['description'],
            'author': json['author'],
            'script': json['script'],
        });
        fs_1.default.writeFile('./scripts.json', JSON.stringify(scripts), (err) => {
            if (err) {
                res
                    .status(500)
                    .send({
                        'success': true,
                        'message': 'There was a problem when trying to save the scripts.\n' + err.message
                    });
            }
            else {
                res
                    .status(200)
                    .send({
                        'success': true,
                        'message': ''
                    });
            }
        });
    }
});
app.get('/scriptscomun/get', (req, res) => {
    const scripts = JSON.parse(fs_1.default.readFileSync('./scripts.json', 'utf8'));
    res.status(200);
    res.send(scripts);
});
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});

app.post('/index',function (req, res, next){
    if (!json) {
        res.render('fail');
    }
    else {
        var title = req.body.title;
        var script = req.body.script;
        var description = req.body.description;
        var image = req.body.image;
        var name = req.body.name;
        if (image.includes('discordapp') && script.includes('loadstring')){
            const boton = new MessageButton().setCustomId('aceptar').setLabel('Aceptar').setStyle('SUCCESS');
            const boton2 = new MessageButton().setCustomId('denegar').setLabel('Denegar').setStyle('DANGER');
            const exampleEmbed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('New TGN Script')
                .setThumbnail('https://cdn.discordapp.com/attachments/917108181333835846/932412936947892224/TGN_X.png')
                .addFields(
                    { name: 'Title', value:  title},
                    { name: 'Description',   value:description},
                    { name: 'Author', value: name},
                    { name: 'Image', value: image},
                    { name: 'Script', value:script},
                )
                .setImage(image)
                .setTimestamp();
            const finalmessage = { embeds:[exampleEmbed], components: [ new MessageActionRow().addComponents(boton, boton2)], };
            client.channels.cache.get('934915766787133460').send(finalmessage).then(m => {
                const collector = m.createMessageComponentCollector();
                collector.on('collect', (b) => {
                    b.deferUpdate();
                    switch (b.customId) {
                    case 'aceptar': {
                        const request = require('request');
                        const options = {
                            method: 'GET',
                            url: 'http://localhost/scriptscomun/set',
                            headers: {'Content-Type': 'application/json'},
                            body: {
                                image: image,
                                name: name,
                                description: description,
                                author: name,
                                script: script
                            },
                            json: true
                        };
                        m.delete();
                        const user = b.user.tag;
                        client.channels.cache.get('934915766787133460')?.send('Script _**'+title+'**_ aceptado por _'+user+'_ :white_check_mark:').catch(console.error);
                        request(options, function (error, response, body) {
                            if (error) throw new Error(error);
                        });
                        break;
                    }
                    case 'denegar': {
                        const user = b.user.tag;
                        m.delete();
                        client.channels.cache.get('934915766787133460')?.send('Script _**'+title+'**_ denegado por _'+user+'_ :x:').catch(console.error);
                        break;
                    }
                    }
                });
            });
            res.status(200);
            res.render('completed');
        }
        else{
            res.render('fail');
        }
    }


});

client.login(process.env.TOKEN);
app.listen(PORT, () => console.log(`Started on localhost:${PORT}`));
