import { useState, useCallback, useRef } from "react";
import { Mail, MapPin, Phone, Send, Linkedin, Github } from "lucide-react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.1 });

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      setIsSubmitting(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    },
    [validateForm]
  );

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "floresjansen28@gmail.com",
      href: "mailto:floresjansen28@gmail.com",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+63 935 0361 046",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Muntinlupa City, Metro Manila, Philippines",
      href: null,
      color: "from-purple-500 to-pink-500"
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/TsuTsu03",
      color: "hover:text-purple-400"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/den-jansen-flores-79b8ba387/",
      color: "hover:text-blue-400"
    }
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="py-32 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-16">
            <span className="text-purple-400 text-sm tracking-widest uppercase mb-4 block">
              Let's Connect
            </span>
            <h2 className="text-5xl md:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-6">
              Have a project in mind or looking to hire? I'm open to freelance work, full-time roles, and collaborations with businesses of all sizes.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
          </div>

          <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-12">
            {/* Contact Info - Left Side */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Methods */}
              <div className="space-y-4">
                {contactMethods.map((method) => {
                  const Icon = method.icon;
                  const content = (
                    <div className="group p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                        >
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">
                            {method.label}
                          </p>
                          <p className="text-xl text-white">{method.value}</p>
                        </div>
                      </div>
                    </div>
                  );

                  return method.href ? (
                    <a key={method.label} href={method.href}>
                      {content}
                    </a>
                  ) : (
                    <div key={method.label}>{content}</div>
                  );
                })}
              </div>

              {/* Social Links */}
              <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10">
                <h4 className="text-xl text-white mb-6">Follow Me</h4>
                <div className="flex gap-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-4 rounded-xl bg-white/5 border border-white/10 text-gray-400 ${social.color} transition-all hover:scale-110`}
                        aria-label={social.label}
                      >
                        <Icon className="w-6 h-6" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Why Work With Me */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                <h4 className="text-xl text-white mb-4">Why Work With Me?</h4>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400">✓</span>
                    <span>I deliver working software — not just mockups</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400">✓</span>
                    <span>Built SaaS platforms used by real businesses</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400">✓</span>
                    <span>Full-stack: from database to polished UI</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400">✓</span>
                    <span>Fast turnaround with clear milestones</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400">✓</span>
                    <span>Responsive, communicative, and reliable</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form - Right Side */}
            <div className="lg:col-span-3">
              <div className="p-8 md:p-10 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10">
                <h3 className="text-3xl text-white mb-8">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block mb-3 text-gray-300">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-6 py-4 rounded-xl border ${
                        errors.name ? "border-red-500" : "border-white/10"
                      } bg-white/5 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 outline-none transition-all`}
                      placeholder="Den Jansen Flores"
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-400">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block mb-3 text-gray-300">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-6 py-4 rounded-xl border ${
                        errors.email ? "border-red-500" : "border-white/10"
                      } bg-white/5 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 outline-none transition-all`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block mb-3 text-gray-300"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={8}
                      className={`w-full px-6 py-4 rounded-xl border ${
                        errors.message ? "border-red-500" : "border-white/10"
                      } bg-white/5 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 outline-none resize-none transition-all`}
                      placeholder="Tell me about your project..."
                    />
                    {errors.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center gap-3 px-8 py-5 rounded-xl text-white transition-all text-lg ${
                      isSubmitting
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/50 hover:scale-105"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-6 h-6" />
                        Send Message
                      </>
                    )}
                  </button>

                  {submitSuccess && (
                    <div className="p-6 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-300 text-center">
                      <p className="text-lg">✓ Message sent successfully!</p>
                      <p className="text-sm text-green-400 mt-2">
                        I'll get back to you within 24 hours.
                      </p>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
