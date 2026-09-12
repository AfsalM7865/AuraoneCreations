import { useState } from "react";
import emailjs from "@emailjs/browser";
import { services } from "../data/siteData";

const initialValues = {
  name: "",
  email: "",
  whatsapp: "",
  service: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initialValues);
  const [status, setStatus] = useState("idle");

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (status === "sending") {
      return;
    }

    if (Object.values(form).some((value) => !value.trim())) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS environment variables are missing.");
      setStatus("error");
      return;
    }

    try {
      const templateParams = {
        name: form.name,
        email: form.email,
        whatsapp: form.whatsapp,
        service: form.service,
        message: form.message,
      };

      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        {
          publicKey,
        },
      );

      setStatus("success");
      setForm(initialValues);
    } catch (error) {
      console.error("EmailJS send failed:", error);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        id="booking-name"
        name="name"
        required
        value={form.name}
        onChange={updateField}
        placeholder="Full name *"
      />
      <input
        name="email"
        required
        type="email"
        value={form.email}
        onChange={updateField}
        placeholder="Email address *"
      />
      <input
        name="whatsapp"
        required
        value={form.whatsapp}
        onChange={updateField}
        placeholder="WhatsApp number *"
      />
      <select
        name="service"
        required
        value={form.service}
        onChange={updateField}
      >
        <option value="">Service required *</option>
        {services.map((service) => (
          <option key={service}>{service}</option>
        ))}
      </select>
      <textarea
        name="message"
        required
        value={form.message}
        onChange={updateField}
        placeholder="Project details / requirements *"
      />
      <button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send project inquiry ↗"}
      </button>
      {status === "success" && (
        <p className="success" role="status" aria-live="polite">
          Thank you! Your inquiry has been sent successfully.
        </p>
      )}
      {status === "error" && (
        <p className="form-error" role="alert">
          Unable to send right now. Please email us directly.
        </p>
      )}
    </form>
  );
}
