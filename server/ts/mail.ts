import { Resend } from 'resend'

async function mail(senderAddr:string, firstName:string, lastName:string, message:string, MAIL_API_KEY:string) {

    const resend = new Resend(MAIL_API_KEY)
    let sent = false;

    try {
        await resend.emails.send({
            from: 'Logan Carpenter <noreply@logancarpenter.space>',
            to: ['LoganTCarpenter@gmail.com'], // list of receivers
            subject: "Logan0Dev - Mail from: " + firstName + " " + lastName + "<" + senderAddr + ">", // Subject line
            text: message, // plain text body
        })
        return sent = true;
    } catch (e) {
        console.error("Failed to Send Email Message\n")
        console.error({ e })
        return sent;
    }
}
export default mail