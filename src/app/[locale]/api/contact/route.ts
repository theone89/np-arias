import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      console.log("Error: Campos faltantes");
      return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
    }

    console.log("Configurando el transporte de correo...");
    const transporter = nodemailer.createTransport({
      host: "correo.lpaestheticswellness.com",
      port: 465,
      secure: true,
      auth: {
        user: "contact@lpaestheticswellness.com",
        pass: process.env.MAIL_PASSWORD, // Usar variable de entorno
      },
    });

    console.log("Enviando correo...");
    const info = await transporter.sendMail({
      from: `"Formulario de Contacto" <contact@lpaestheticswellness.com>`,
      to: "franklincampos8907@gmail.com",
      subject: "Nuevo mensaje desde el formulario de contacto",
      text: `Nombre: ${name}\nCorreo: ${email}\nMensaje: ${message}`,
      html: `<p><strong>Nombre:</strong> ${name}</p>
             <p><strong>Correo:</strong> ${email}</p>
             <p><strong>Mensaje:</strong><br/> ${message}</p>`,
    });

    console.log("Correo enviado:", info);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error enviando el mensaje:", error);
    return NextResponse.json({ error: "Error enviando el mensaje" }, { status: 500 });
  }
}
