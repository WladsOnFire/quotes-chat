import { ENV } from "../lib/env.js";
import { resendClient, sender } from "../lib/resend.js"
import { welcomeEmailTemplate } from "./emailTemplates.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {

    const {data, error} = await resendClient.emails.send({
        from: `${ENV.EMAIL_FROM}`,
        to: email,
        subject: "Welcome to Wlad's chat!",
        html: welcomeEmailTemplate(name, clientURL),
    }); 

    if(error){
        console.log("Error occured while sending welcomee mail:", error);
        throw new Error("Failed to send welcome mail");
    }

    console.log("Welcome mail sent successfully", data);
};