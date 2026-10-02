interface VerificationEmailProps {
    username :string;
    otp:string;
}

export default function VerificationEmail({username,otp}:VerificationEmailProps) {
    return (
        <html lang="en" dir="ltr">
            <head>
                <title>Verification Code</title>
            </head>
            <body>
                <p>Here&apos;s your code: {otp}</p>
                <main>
                    <h2>Hello {username},</h2>
                    <p>
                        Thank you for registering.Please use the following verification code to complete your registration:
                    </p>
                    <p>{otp}</p>
                </main>
            </body>
        </html>
    )
}