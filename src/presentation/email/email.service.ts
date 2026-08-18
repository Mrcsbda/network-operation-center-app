import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';

interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[]
}

interface Attachment {
    path: string;
    filename: string;
}

export class EmailService {
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    })

    constructor() {

    }

    async sendEmail(options: SendMailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachments = [] } = options;

        try {
            const sendInformation = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments
            })

            console.log('Email sent: ', sendInformation);

            return true
        } catch (error) {
            return false
        }
    }

    async sendEmailWithFileSystemLoggs(to: string | string[]) {
        const subject = 'Logs from the system';
        const htmlBody = `
            <h2>Logs de sistema - NOC</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>Ver logs adjuntos</p>
            `

        const attachments: Attachment[] = [
            {
                path: './logs/logs-all.log',
                filename: 'logs-all.log'
            },
            {
                path: './logs/logs-high.log',
                filename: 'logs-high.log'
            },
            {
                path: './logs/logs-medium.log',
                filename: 'logs-medium.log'
            }
        ]

        return await this.sendEmail({
            to,
            subject,
            htmlBody,
            attachments
        })
    }

}