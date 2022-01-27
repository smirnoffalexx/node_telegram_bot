// import TelegramBot from 'node-telegram-bot-api' // doesn't compile
// import config from 'config'

const TelegramBot = require('node-telegram-bot-api')
const config = require('config')
const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const Token = config.get('token')
const bot = new TelegramBot(Token)
bot.setWebHook(`${config.get('url')}/bot`)

const app = new Koa()

const router = Router() // new Router()
router.post('/bot', ctx => {
    console.log(ctx)
    const { body } = ctx.request
    bot.processUpdate(body)
    ctx.status = 200
})

app.use(bodyParser())
app.use(router.routes())

const port = config.get('port')
app.listen(port, () => {
    console.log(`Listening on ${port}`)
})

bot.on('message', msg => {
    const { chat: { id }} = msg
    bot.sendMessage(id, 'Some message')
})

bot.onText(/\/switchon (.+)/, (msg, [source, match]) => {
    const { chat: {id}} = msg
    bot.sendMessage(id, match)
})
