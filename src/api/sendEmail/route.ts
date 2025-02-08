import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, selectedDate } = await request.json();

    // Validar campos requeridos
    if (!name || !email || !phone || !selectedDate) {
      return new Response(
        JSON.stringify({ error: "Faltan datos requeridos." }),
        { status: 400 }
      );
    }

    // Configurar el transportador SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true", // true para el puerto 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Convertir y formatear la fecha
    const formattedDate = new Date(selectedDate).toLocaleString("es-ES", {
      timeZone: "UTC",
    });

    // Enviar el correo
    await transporter.sendMail({
      from: `"Consulta Gratuita" <${process.env.SMTP_USER}>`,
      to: email, // Se envía la confirmación al cliente
      subject: "Confirmación de Consulta Gratuita",
      html: `
        <h2>Hola ${name},</h2>
        <p>Gracias por agendar una consulta gratuita. Aquí están los detalles de tu cita:</p>
        <ul>
          <li><strong>Fecha y hora:</strong> ${formattedDate}</li>
          <li><strong>Teléfono:</strong> ${phone}</li>
        </ul>
        <p>Nos pondremos en contacto contigo muy pronto.</p>
        <p>¡Saludos!</p>
      `,
    });

    return new Response(
      JSON.stringify({ message: "Correo enviado correctamente." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    return new Response(
      JSON.stringify({ error: "Error al enviar el correo." }),
      { status: 500 }
    );
  }
}
