require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
 
client.on('message', (msg: { content: string; reply: (arg: string) => void; }) => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});
 
const token = process.env.DISCORD_TOKEN;
console.log(`token: ${token}`);
client.login(token);