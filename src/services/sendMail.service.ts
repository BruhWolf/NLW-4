import nodemailer, { Transporter } from 'nodemailer'
import fs from 'fs'
import handlebars from 'handlebars'
export class SendMailService {
    private client: Transporter
    constructor () {

        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth:{
                    user: account.user,
                    pass: account.pass
                }
            })  
            this.client = transporter
        })

    }
    async execute (to: string, subject: string, templateVariables: object, templatePath: string) {

        const npsTemplate = fs.readFileSync(templatePath).toString('utf-8')
        const mailTemplateParse =  handlebars.compile(npsTemplate)
        const html = mailTemplateParse(templateVariables)
    
            const  message = await this.client.sendMail({
                from:'NPS <noreply@wolfplace.com>',
                to,
                subject,
                html:html
            })
        console.log('Message sent: %s ', message.messageId)
        console.log('Preview URL: %s ', nodemailer.getTestMessageUrl(message))
    }
}

export default new SendMailService()