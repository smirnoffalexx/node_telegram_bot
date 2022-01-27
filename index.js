// import TelegramBot from 'node-telegram-bot-api' // doesn't compile
// import config from 'config'

const TelegramBot = require('node-telegram-bot-api')
const config = require('config')

const Token = config.get('token')
const bot = new TelegramBot(Token, {
    webHook: {
        port: config.get('port')
    }
})

bot.setWebHook(`${config.get('url')}/bot${Token}`)

bot.on('message', msg => {
    const { chat: { id }} = msg
    bot.sendMessage(id, 'Some message')
})

bot.onText(/\/switchon (.+)/, (msg, [source, match]) => {
    const { chat: {id}} = msg
    bot.sendMessage(id, match)
})