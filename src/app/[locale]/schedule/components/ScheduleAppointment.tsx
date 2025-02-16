"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { Calendar, Mail, Phone, User } from "lucide-react";
import { useTranslations } from "next-intl";

type FormData = {
  name: string;
  email: string;
  phone: string;
  date: string;
  service: string;
  time: string;
  employee: string;
  total: string;
};

type CustomButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
};

function CustomButton({ children, ...props }: CustomButtonProps) {
  return (
    <button
      {...props}
      className="bg-custom-gold-500 hover:bg-custom-gold-600 text-white font-bold py-2 px-4 rounded w-full transition-colors duration-300"
    >
      {children}
    </button>
  );
}

type CustomInputProps = {
  type: string;
  name: string;
  icon?: React.ComponentType<{ className?: string }>;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

function CustomInput({ icon: Icon, ...props }: CustomInputProps) {
  return (
    <div className="flex items-center border border-custom-gold-300 dark:border-custom-gold-600 rounded px-3 py-2 bg-white dark:bg-custom-brown-800 transition-all duration-300">
      {Icon && (
        <Icon className="text-custom-gold-500 dark:text-custom-gold-400 mr-2" />
      )}
      <input
        {...props}
        className="w-full focus:outline-none bg-transparent text-custom-brown-800 dark:text-custom-ivory-100"
      />
    </div>
  );
}

type CustomCardProps = {
  children: React.ReactNode;
};

function CustomCard({ children }: CustomCardProps) {
  return (
    <div className="bg-custom-ivory-100 dark:bg-custom-brown-900 rounded-xl shadow-2xl p-6 transition-all duration-300">
      {children}
    </div>
  );
}

type ReservationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (formData: FormData) => void;
};

function ReservationModal({
  isOpen,
  onClose,
  onConfirm,
}: ReservationModalProps) {
  const services = [
    {
      name: "Botulinum toxin injection for muscle relaxation (Aesthetic)",
      price: 250.0,
      duration: "30min",
      description:
        "Botulinum toxin injection to relax facial muscles and reduce wrinkles for aesthetic purposes.",
    },
    {
      name: "Botulinum toxin injection for muscle spasms (Medical)",
      price: 300.0,
      duration: "40min",
      description:
        "Botulinum toxin injection used to treat muscle spasms and alleviate discomfort in medical conditions.",
    },
    {
      name: "Botulinum toxin for excessive sweating (Hyperhidrosis)",
      price: 350.0,
      duration: "45min",
      description:
        "Injection of botulinum toxin to reduce excessive sweating, particularly in underarms, palms, and feet.",
    },
  ];
  const times = [
    {
      label: "1:15 PM - 1:50 PM",
      value: "1:15 PM - 1:50 PM",
    },
    {
      label: "2:00 PM - 2:30 PM",
      value: "2:00 PM - 2:30 PM",
    },
  ];
  const employees = ["Robert King III", "Sarah Johnson"];

  const [selectedService, setSelectedService] = useState<string>(
    services[0].name
  );
  const [selectedTime, setSelectedTime] = useState<string>(times[0].value);
  const [selectedEmployee, setSelectedEmployee] = useState<string>(
    employees[0]
  );
  const [total, setTotal] = useState<string>(services[0].price.toFixed(2));

  // Para mostrar la descripción del servicio seleccionado.
  const currentService = services.find(
    (service) => service.name === selectedService
  );

  const handleConfirm = () => {
    onConfirm({
      name: "", // Se dejarán vacíos estos campos para actualizar en el formulario principal
      email: "",
      phone: "",
      date: "", // Se actualizará cuando el usuario seleccione la fecha en el formulario principal
      service: selectedService,
      time: selectedTime,
      employee: selectedEmployee,
      total: `$${total}`,
    });
    onClose();
  };

  return (
    isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        {/* Contenedor más amplio para el modal */}
        <div className="bg-white dark:bg-custom-brown-900 p-8 rounded-xl shadow-lg w-full max-w-3xl">
          <h2 className="text-2xl font-bold mb-6">Select Your Appointment</h2>
          {/* Grid para distribuir los elementos en dos columnas en pantallas medianas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Columna Izquierda: Servicio y descripción */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Service
              </label>
              <select
                value={selectedService}
                onChange={(e) => {
                  setSelectedService(e.target.value);
                  setTotal(
                    services
                      .find((service) => service.name === e.target.value)
                      ?.price.toFixed(2) || "0"
                  );
                }}
                className="border border-custom-gold-300 dark:border-custom-gold-600 rounded px-3 py-2 w-full"
              >
                {services.map((service) => (
                  <option key={service.name} value={service.name}>
                    {service.name} - ${service.price} ({service.duration})
                  </option>
                ))}
              </select>
              {currentService && (
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  {currentService.description}
                </p>
              )}
            </div>
            {/* Columna Derecha: Hora y Empleado */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="border border-custom-gold-300 dark:border-custom-gold-600 rounded px-3 py-2 w-full"
              >
                {times.map((time) => (
                  <option key={time.value} value={time.value}>
                    {time.label}
                  </option>
                ))}
              </select>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Employee
                </label>
                <select
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                  className="border border-custom-gold-300 dark:border-custom-gold-600 rounded px-3 py-2 w-full"
                >
                  {employees.map((employee) => (
                    <option key={employee} value={employee}>
                      {employee}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* Fila para el Total */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total
            </label>
            <input
              type="text"
              value={`$${total}`}
              readOnly
              className="border border-custom-gold-300 dark:border-custom-gold-600 rounded px-3 py-2 w-full bg-gray-200 dark:bg-gray-700"
            />
          </div>
          {/* Botones de acción */}
          <div className="mt-8 flex justify-end space-x-4">
            <button onClick={onClose} className="text-red-500 font-medium">
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="bg-custom-gold-500 hover:bg-custom-gold-600 text-white font-bold py-2 px-6 rounded"
            >
              Confirm
            </button>
          </div>
        </div>
      </motion.div>
    )
  );
}

export default function ScheduleAppointment() {
  const t = useTranslations("Schedule");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    date: "",
    service: "",
    time: "",
    employee: "",
    total: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          selectedDate: formData.date,
          service: formData.service,
          time: formData.time,
          employee: formData.employee,
          total: formData.total,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el correo");
      }

      alert(t("successMessage"));
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      alert(t("errorMessage"));
    }

    setLoading(false);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirm = (updatedFormData: FormData) => {
    setFormData(updatedFormData);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className=" ">
      <CustomCard>
        <h2 className="text-xl font-bold text-custom-brown-700 dark:text-custom-ivory-100 mb-4">
          {t("title")}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <CustomInput
            type="text"
            name="name"
            icon={User}
            placeholder={t("namePlaceholder")}
            onChange={handleChange}
            required
          />
          <CustomInput
            type="email"
            name="email"
            icon={Mail}
            placeholder={t("emailPlaceholder")}
            onChange={handleChange}
            required
          />
          <CustomInput
            type="tel"
            name="phone"
            icon={Phone}
            placeholder={t("phonePlaceholder")}
            onChange={handleChange}
            required
          />
          <div className="flex items-center border border-custom-gold-300 dark:border-custom-gold-600 rounded px-3 py-2 bg-white dark:bg-custom-brown-800 transition-all duration-300">
            <Calendar className="text-custom-gold-500 dark:text-custom-gold-400 mr-2" />
            <button
              type="button"
              onClick={handleOpenModal}
              className="w-full focus:outline-none bg-transparent text-custom-brown-800 dark:text-custom-ivory-100"
            >
              {formData.date ? formData.date : t("datePlaceholder")}
            </button>
          </div>

          {/* Visualización de los datos seleccionados */}
          {formData.service && (
            <div className="mt-4">
              <p>
                {formData.service} - {formData.time}
              </p>
              <p>Employee: {formData.employee}</p>
              <p>Total: {formData.total}</p>
            </div>
          )}

          <CustomButton type="submit" disabled={loading}>
            {loading ? t("loading") : t("cta")}
          </CustomButton>
        </form>
      </CustomCard>

      <ReservationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
      />
    </motion.div>
  );
}
