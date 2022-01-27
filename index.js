// import TelegramBot from 'node-telegram-bot-api' // doesn't compile
// import config from 'config'

const TelegramBot = require('node-telegram-bot-api')
const config = require('config')
const os = require('os')

const Token = config.get('token')
const bot = new TelegramBot(Token,  { polling: true })

bot.on('message', msg => {
    const { chat: { id }} = msg
    bot.sendMessage(id, `Sending message from OS: ${os.type()}`)
})

bot.onText(/\/switchon (.+)/, (msg, [source, match]) => {
    const { chat: {id}} = msg
    bot.sendMessage(id, match)
})
