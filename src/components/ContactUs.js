"use client";
import { useState } from "react";

export default function ContactUs() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Message sent successfully!");
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "General Inquiry",
          message: "",
        });
      } else {
        alert("Failed to send message: " + data.message);
      }
    } catch (err) {
      alert("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-green-200 text-black p-8 rounded-lg m-4">
      <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left info block */}
        <div className="bg-green-300 p-6 rounded-lg w-full md:w-1/2 space-y-3">
          <p><strong>📞</strong> +62 819-0872-2016</p>
          <p><strong>✉️</strong> ecochallenge@gmail.com</p>
          <p><strong>📍</strong> Jalan RS. Fatmawati Raya, Jakarta Selatan</p>
        </div>

        {/* Contact form */}
        <form onSubmit={handleSubmit} className="w-full md:w-1/2 space-y-4">
          <div className="flex gap-4">
            <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" className="border w-full p-2 rounded" required />
            <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" className="border w-full p-2 rounded" required />
          </div>
          <div className="flex gap-4">
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className="border w-full p-2 rounded" required />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="border w-full p-2 rounded" />
          </div>
          <div className="space-y-1">
            <label>Select Subject:</label>
            <div className="flex flex-wrap gap-4">
              {["General Inquiry", "Bug or Problem", "Complaint", "Advice"].map((item) => (
                <label key={item} className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="subject"
                    value={item}
                    checked={form.subject === item}
                    onChange={handleChange}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Write your message..."
            className="border w-full p-2 rounded h-24"
            required
          />
          <button
            type="submit"
            className="bg-green-400 px-4 py-2 rounded text-black hover:bg-green-300 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}
