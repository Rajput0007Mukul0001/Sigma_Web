import nodemailer from 'nodemailer';
import { getSession } from 'next-auth/react';




// ye post oh rha tha click per ab 
// firebase wale me khud se ho jayega 

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const session = await getSession({ req });

            if (!session) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            console.log("working upto here only ")

            // Create a SMTP transporter object using Gmail SMTP settings
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.GMAIL_USER,
                    pass: process.env.GMAIL_PASSWORD,
                },
            });

            

            // Message object
            const message = {
                from: `${process.env.GMAIL_USER}`,
                to: session.user.email, // Replace with recipient's email
                subject: 'Sigma-Kart Order',
                text: `Hello,${session.user.name} Your Order from Sigma-kart has been Placed`,
                html: `
                <html>
                    <body>
                        <h4> Hello,${session.user.name} Your Order from Sigma-kart has been Placed </h4>
                        <p>Thank you for your order.</p>
                        <a href="https://sigma-web-wine.vercel.app/orders">Click For The Orders</a>
                    </body>
                </html>
            `,
};

            // Send mail with defined transport object
            await transporter.sendMail(message);

            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            console.error('Error Occurs:', error);
            res.status(500).json({ error: 'Failed to send email' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
