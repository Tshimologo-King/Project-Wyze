'use client';

import Navbar from '../components/Navbar';
import ContactForm from '../components/ContactForm';
import AnimatedContactSection from '../components/AnimatedContactSection';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 scroll-smooth">
      <Navbar />

      {/* Page Header */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-slate-300">
            Have a question or opportunity? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* Left: Contact Form */}
            <div className="flex flex-col justify-center">
              <ContactForm />
            </div>

            {/* Right: Animated Section */}
            <div className="hidden lg:flex items-center justify-center min-h-96 bg-slate-800/50 rounded-lg backdrop-blur-sm border border-slate-700/50 overflow-hidden">
              <AnimatedContactSection />
            </div>
          </div>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="px-6 py-12 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Other Ways to Connect
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Email Card */}
            <div className="bg-slate-800 rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-xl font-bold text-white mb-2">Email</h3>
              <p className="text-slate-300 mb-4">Send us an email directly</p>
              <a
                href="mailto:contact@wyze.com"
                className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
              >
                contact@wyze.com
              </a>
            </div>

            {/* Phone Card */}
            <div className="bg-slate-800 rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-xl font-bold text-white mb-2">Phone</h3>
              <p className="text-slate-300 mb-4">Call us during business hours</p>
              <a
                href="tel:+1234567890"
                className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
              >
                +1 (234) 567-890
              </a>
            </div>

            {/* Location Card */}
            <div className="bg-slate-800 rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-bold text-white mb-2">Location</h3>
              <p className="text-slate-300">
                123 Tech Street
                <br />
                San Francisco, CA 94107
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {/* FAQ Item 1 */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-cyan-400 transition-colors duration-300">
              <h3 className="text-xl font-bold text-white mb-2">
                How quickly will I get a response?
              </h3>
              <p className="text-slate-300">
                We aim to respond to all inquiries within 24 hours during business days. For urgent matters, please mention it in your message.
              </p>
            </div>

            {/* FAQ Item 2 */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-cyan-400 transition-colors duration-300">
              <h3 className="text-xl font-bold text-white mb-2">
                What information do you need from me?
              </h3>
              <p className="text-slate-300">
                We only need your full name, email address, and a brief message. This helps us understand your inquiry and get back to you effectively.
              </p>
            </div>

            {/* FAQ Item 3 */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-cyan-400 transition-colors duration-300">
              <h3 className="text-xl font-bold text-white mb-2">
                Is my information secure?
              </h3>
              <p className="text-slate-300">
                Absolutely. We use industry-standard encryption and security practices to protect your personal information. Your privacy is our priority.
              </p>
            </div>

            {/* FAQ Item 4 */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-cyan-400 transition-colors duration-300">
              <h3 className="text-xl font-bold text-white mb-2">
                Can I apply for a job through this form?
              </h3>
              <p className="text-slate-300">
                While you can express interest, we recommend applying through our Careers page where you can view all available positions and apply formally.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
