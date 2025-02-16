import { motion } from "framer-motion";
import { useState } from "react";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: {
    service: string;
    time: string;
    employee: string;
    total: string;
    name: string;
    email: string;
    phone: string;
    date: string;
  }) => void;
}

function ReservationModal({
  isOpen,
  onClose,
  onConfirm,
}: ReservationModalProps) {
  const categories = [
    {
      name: "Body Sculpting",
      services: [
        {
          name: "Ultrasonic Cavitation",
          price: 40.0,
          duration: "30min",
          description:
            "Reduce fat and cellulite while tightening the skin simultaneously.",
        },
        {
          name: "Two Ultrasonic Cavitation Body Sculpting",
          price: 80.0,
          duration: "30min",
          description: "Two 30 minute treatments of cavitation.",
        },
        {
          name: "Fat Dissolving Injections",
          price: 150.0,
          duration: "1h",
          description:
            "Destroy and dissolve fat cells by directly injecting them into the subcutaneous layers.",
        },
        {
          name: "Skin Tightening",
          price: 75.0,
          duration: "45min",
          description: "Non-invasive skin tightening treatment.",
        },
        {
          name: "Laser Lipo & Cavitation Treatment",
          price: 80.0,
          duration: "1h",
          description:
            "Combined laser lipo and cavitation treatment for body contouring.",
        },
      ],
    },
    {
      name: "Non-Invasive Laser Lipo",
      services: [
        {
          name: "One Treatment",
          price: 40.0,
          duration: "30min",
          description: "Single session of non-invasive laser lipo.",
        },
        {
          name: "Three Treatments",
          price: 120.0,
          duration: "30min",
          description: "Package of three laser lipo sessions.",
        },
        {
          name: "Six Treatments",
          price: 240.0,
          duration: "30min",
          description: "Package of six laser lipo sessions.",
        },
      ],
    },
    {
      name: "Neurotoxins (Xeomin) $10",
      services: [
        {
          name: "Frontalis (Forehead)",
          price: 180.0,
          duration: "40min",
          description: "Forehead wrinkle reduction treatment.",
        },
        {
          name: "Glabella (Between the eyes)",
          price: 180.0,
          duration: "35min",
          description: "Treatment for frown lines between eyebrows.",
        },
        {
          name: "Eyebrow Lift",
          price: 150.0,
          duration: "40min",
          description: "Non-surgical eyebrow lift treatment.",
        },
        {
          name: "Lip Flip",
          price: 150.0,
          duration: "45min",
          description: "Enhance lip appearance with neurotoxin treatment.",
        },
        {
          name: "Baby Botox",
          price: 250.0,
          duration: "1h",
          description: "Subtle, natural-looking botox treatment.",
        },
      ],
    },
  ];

  const times = [
    { label: "1:15 PM - 1:50 PM", value: "1:15 PM - 1:50 PM" },
    { label: "2:00 PM - 2:30 PM", value: "2:00 PM - 2:30 PM" },
  ];

  const employees = ["Robert King III", "Sarah Johnson"];

  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0].name
  );
  const [selectedService, setSelectedService] = useState<string>(
    categories[0].services[0].name
  );
  const [selectedTime, setSelectedTime] = useState<string>(times[0].value);
  const [selectedEmployee, setSelectedEmployee] = useState<string>(
    employees[0]
  );
  const [total, setTotal] = useState<string>(
    categories[0].services[0].price.toFixed(2)
  );

  const currentService = categories
    .find((cat) => cat.name === selectedCategory)
    ?.services.find((service) => service.name === selectedService);

  const handleConfirm = () => {
    onConfirm({
      service: selectedService,
      time: selectedTime,
      employee: selectedEmployee,
      total: `$${total}`,
      // Campos vacíos para el formulario principal
      name: "",
      email: "",
      phone: "",
      date: "",
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
        <div className="bg-white dark:bg-custom-brown-900 p-8 rounded-xl shadow-lg w-full max-w-3xl">
          <h2 className="text-2xl font-bold mb-6">Select Your Appointment</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Columna Izquierda: Categorías y Servicios */}
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    const newCategory = e.target.value;
                    setSelectedCategory(newCategory);
                    const newService =
                      categories.find((cat) => cat.name === newCategory)
                        ?.services[0].name || "";
                    setSelectedService(newService);
                    setTotal(
                      categories
                        .find((cat) => cat.name === newCategory)
                        ?.services[0].price.toFixed(2) || "0"
                    );
                  }}
                  className="border border-custom-gold-300 dark:border-custom-gold-600 rounded px-3 py-2 w-full"
                >
                  {categories.map((category) => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => {
                    setSelectedService(e.target.value);
                    const price =
                      categories
                        .find((cat) => cat.name === selectedCategory)
                        ?.services.find(
                          (service) => service.name === e.target.value
                        )
                        ?.price.toFixed(2) || "0";
                    setTotal(price);
                  }}
                  className="border border-custom-gold-300 dark:border-custom-gold-600 rounded px-3 py-2 w-full"
                >
                  {categories
                    .find((cat) => cat.name === selectedCategory)
                    ?.services.map((service) => (
                      <option key={service.name} value={service.name}>
                        {service.name} - ${service.price} ({service.duration})
                      </option>
                    ))}
                </select>
              </div>

              {currentService && (
                <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {currentService.description}
                  </p>
                </div>
              )}
            </div>

            {/* Columna Derecha: Hora y Empleado */}
            <div>
              <div className="mb-4">
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
              </div>

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

          {/* Total */}
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
            <button
              onClick={onClose}
              className="px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="px-6 py-2 bg-custom-gold-500 hover:bg-custom-gold-600 text-white rounded-lg transition-colors"
            >
              Confirm Appointment
            </button>
          </div>
        </div>
      </motion.div>
    )
  );
}
