import {Html,Head,Font,Preview,Heading,Row,Section,Text} from '@react-email/components'

interface VerificationEmailProps{
    fullname:string;
    otp:string;
}

export default function VerificationOnEmail({fullname,otp}:VerificationEmailProps){
    return(
        <Html lang='en' dir='ltr'>
            <Head>
                <title>Verification Code</title>
            </Head>
            <Preview>Her&apos; your Verification code:{otp}</Preview>
            <Section>
                <Row>
                    <Heading as='h2'>Hello {fullname},</Heading>
                </Row>
                <Row>
                    <Text>
                        Thank you for registering. Please Use the Following Verification code to Complete your Registration:
                    </Text>
                </Row>
                <Row>{otp}</Row>
                <Text>
                    if You did not request this code, please ignore this email
                </Text>
            </Section>
        </Html>
    )
}