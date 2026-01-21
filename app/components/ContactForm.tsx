'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate fields
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Show success message
      setSubmitted(true);
      setFormData({ fullName: '', email: '', message: '' });

      // Reset after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg p-8 shadow-lg">
      <h2 className="text-3xl font-bold text-white mb-2">Get In Touch</h2>
      <p className="text-slate-300 mb-8">Send us a message and we'll respond as soon as possible.</p>

      {submitted && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400 font-semibold animate-pulse">
          ✓ Message sent successfully! We'll get back to you soon.
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400 font-semibold">
          ✗ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name Field */}
        <div>
          <label htmlFor="fullName" className="block text-slate-300 font-semibold mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full px-4 py-3 bg-slate-700 text-white placeholder-slate-400 rounded-lg border border-slate-600 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300"
            disabled={loading}
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-slate-300 font-semibold mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="w-full px-4 py-3 bg-slate-700 text-white placeholder-slate-400 rounded-lg border border-slate-600 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300"
            disabled={loading}
          />
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-slate-300 font-semibold mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us what's on your mind..."
            rows={5}
            className="w-full px-4 py-3 bg-slate-700 text-white placeholder-slate-400 rounded-lg border border-slate-600 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 resize-none"
            disabled={loading}
          />
        </div>

        {/* Character count */}
        <div className="text-right text-sm text-slate-400">
          {formData.message.length} / 500 characters
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || submitted}
          className="w-full relative px-6 py-3 font-semibold text-white overflow-hidden rounded-lg group disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 ease-out transform scale-x-0 group-hover:scale-x-100 origin-left" />
          <span className="relative z-10 block transition-all duration-300">
            {loading ? 'Sending...' : submitted ? 'Message Sent!' : 'Send Message'}
          </span>
        </button>

        {/* Help text */}
        <p className="text-center text-xs text-slate-400 mt-4">
          We value your privacy. Your message will be kept confidential.
        </p>
      </form>
    </div>
  );
}
