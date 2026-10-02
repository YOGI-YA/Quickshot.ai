import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Button,
} from "@react-email/components";

interface VerificationEmailProps {
    username :string;
    otp:string;
}

export default function VerificationEmail({username,otp}:VerificationEmailProps) {
    return (
        <Html lang="en" dir="ltr">
            <Head>
                <title> Verification Code</title>
                <Font fontFamily="Roboto"
                fallbackFontFamily="Verdana"
                webFont={{
                    url: 'https://fonts.gstatic.com/s/roboto/v51/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWubEbVmUiAo.woff2',
                    format:'woff2'

                }}
                fontWeight={400}
                fontStyle="normal"/>
            </Head>
            <Preview> Here&apos;s your code : {otp}</Preview>
            <Section>
                <Row>
                    <Heading as="h2"> Hello {username},</Heading>
                </Row>
                <Row>
                    <Text>
                        Thank you for registering.Please use the following verification code to complete your registration:
                    </Text>
                </Row>
                <Row>
                    <Text>{otp}</Text>
                </Row>
            </Section>
        </Html>
    )
}