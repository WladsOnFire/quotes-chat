import {Resend} from "resend";
import { ENV } from "./env.js";


const RESEND_API_KEY = ENV.RESEND_API_KEY;
if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not set in .env");

export const resendClient = new Resend(RESEND_API_KEY);

const EMAIL_FROM_NAME = ENV.EMAIL_FROM_NAME;
if (!EMAIL_FROM_NAME) throw new Error("EMAIL_FROM_NAME is not set in .env");

const EMAIL_FROM = ENV.EMAIL_FROM;
if (!EMAIL_FROM) throw new Error("EMAIL_FROM is not set in .env");

export const sender = {
    email: process.env.EMAIL_FROM,
    name: process.env.EMAIL_FROM_NAME,
}