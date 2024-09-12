import nodemailer from "nodemailer";
import { development } from "../config/development";
import { logger } from "../config/winston";

const transporter = nodemailer.createTransport({
  host: development.NODEMAILER_HOST,
  port: Number(development.NODEMAILER_PORT),
  secure: false, // true for port 465, false for other ports
  auth: {
    user: development.NODEMAILER_AUTH_USER,
    pass: development.NODEMAILER_AUTH_PASS,
  },
});

export const sendEmail = async function main(
  from: string,
  to: string,
  subject: string,
  text: string,
  html: string,
  attachments?: any[],
  replyTo?: string,
  cc?: string,
  bcc?: string
) {
  const info = await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html : `<html>
                <body>
                  <main>
                    ${html}
                  </main>
                </body>
            </html>`,
    attachments,
    replyTo,
    cc,
    bcc,
  });

  
  logger.info("Message sent: %s", info.messageId);
  
  return info;
};
