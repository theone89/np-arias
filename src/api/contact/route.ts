import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
    }

    // Configuración de Nodemailer
    const transporter = nodemailer.createTransport({
      host: "correo.lpaestheticswellness.com", // Ajusta según tu servidor de correo
      port: 465,
      secure: true,
      auth: {
        user: "info@lpaestheticswellness.com",
        pass: "SFnUWRb2C,", // Usa variables de entorno para mayor seguridad
      },
    });

    await transporter.sendMail({
      from: `"Formulario de Contacto" <info@lpaestheticswellness.com>`,
      to: "info@lpaestheticswellness.com",
      subject: "Nuevo mensaje desde el formulario de contacto",
      text: `Nombre: ${name}\nCorreo: ${email}\nMensaje: ${message}`,
      html: `<p><strong>Nombre:</strong> ${name}</p>
             <p><strong>Correo:</strong> ${email}</p>
             <p><strong>Mensaje:</strong><br/> ${message}</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Error enviando el mensaje" }, { status: 500 });
  }
}
