"use client";

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Mail, Phone, User } from 'lucide-react';

export default function ScheduleClient() {
    const t = useTranslations();

    const [selectedDate, setSelectedDate] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedDate || !name || !email || !phone) {
            setMessage(t('messages.missing'));
            return;
        }
        setLoading(true);
        try {
            const response = await fetch('/api/sendEmail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, phone, selectedDate }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage(t('messages.success'));
                // Limpiar el formulario
                setName('');
                setEmail('');
                setPhone('');
                setSelectedDate(null);
            } else {
                setMessage(t('messages.error'));
            }
        } catch (error) {
            console.error(error);
            setMessage(t('messages.error'));
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-teal-100 p-4">
            <motion.div
                className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-brown-700">
                    {t('title')}
                </h2>
                <form onSubmit={handleSubmit}>
                    {/* Campo Nombre */}
                    <div className="mb-4">
                        <label className="block mb-1 font-medium text-brown-600" htmlFor="name">
                            <User className="inline-block mr-2" /> {t('form.name')}
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder={t('placeholders.name')}
                            className="w-full border border-brown-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-gold-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    {/* Campo Email */}
                    <div className="mb-4">
                        <label className="block mb-1 font-medium text-brown-600" htmlFor="email">
                            <Mail className="inline-block mr-2" /> {t('form.email')}
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder={t('placeholders.email')}
                            className="w-full border border-brown-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-gold-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {/* Campo Teléfono */}
                    <div className="mb-4">
                        <label className="block mb-1 font-medium text-brown-600" htmlFor="phone">
                            <Phone className="inline-block mr-2" /> {t('form.phone')}
                        </label>
                        <input
                            id="phone"
                            type="tel"
                            placeholder={t('placeholders.phone')}
                            className="w-full border border-brown-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-gold-500"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    {/* Calendario para seleccionar fecha y hora */}
                    <div className="mb-4">
                        <label className="block mb-1 font-medium text-brown-600" htmlFor="date">
                            {t('form.date')}
                        </label>
                        <DatePicker
                            id="date"
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={30}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            placeholderText={t('placeholders.date')}
                            className="w-full border border-brown-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-gold-500"
                        />
                    </div>
                    {message && (
                        <p className="mb-4 text-center text-terracotta-600">{message}</p>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 bg-terracotta-500 text-white rounded hover:bg-terracotta-600 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {loading ? t('buttons.loading') : t('buttons.submit')}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
