import { useCallback, useRef, useState } from "react";
import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
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
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.trim().length < 20) newErrors.message = "Message must be at least 20 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setFormData((current) => ({ ...current, [name]: value }));
      if (errors[name as keyof FormErrors]) {
        setErrors((current) => ({ ...current, [name]: undefined }));
      }
    },
    [errors]
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      if (!validateForm()) return;
      setIsSubmitting(true);
      await new Promise((resolve) => window.setTimeout(resolve, 350));

      const subject = encodeURIComponent(`Portfolio inquiry from ${formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
      window.location.href = `mailto:floresjansen28@gmail.com?subject=${subject}&body=${body}`;

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      window.setTimeout(() => setSubmitSuccess(false), 5000);
    },
    [formData, validateForm]
  );

  const contactMethods = [
    { icon: Mail, label: "Email", value: "floresjansen28@gmail.com", href: "mailto:floresjansen28@gmail.com", color: "from-blue-500 to-sky-400" },
    { icon: Phone, label: "Phone", value: "+63 935 0361 046", color: "from-slate-500 to-slate-300" },
    { icon: MapPin, label: "Location", value: "Muntinlupa City, Metro Manila, Philippines", color: "from-blue-700 to-blue-500" },
  ];

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden py-32">
      <div className="container relative z-10 mx-auto px-4">
        <div className={`transition-all duration-1000 ease-[var(--ease-out)] ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <div className="mb-16">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-blue-400">Contact</p>
            <h2 className="mb-4 text-5xl font-bold tracking-tight text-white md:text-6xl">Get In Touch</h2>
            <p className="mb-6 max-w-[64ch] text-xl leading-relaxed text-gray-400">
              Have a project in mind or looking to hire? I'm open to freelance work, full-time roles,
              technical consulting, and AI workflow builds.
            </p>
            <div className="h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-sky-300" />
          </div>

          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-5">
            <div className="space-y-8 lg:col-span-2">
              <div className="space-y-4">
                {contactMethods.map((method) => {
                  const Icon = method.icon;
                  const content = (
                    <div className="group rounded-xl border border-slate-700/60 bg-slate-800/80 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-slate-500/80">
                      <div className="flex items-start gap-4">
                        <div className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${method.color} transition-transform duration-200 group-hover:scale-105`}>
                          <Icon className="h-7 w-7 text-white" />
                        </div>
                        <div>
                          <p className="mb-1 text-sm text-gray-500">{method.label}</p>
                          <p className="break-words text-lg text-white">{method.value}</p>
                        </div>
                      </div>
                    </div>
                  );
                  return method.href ? (
                    <a key={method.label} href={method.href} className="block focus-ring">
                      {content}
                    </a>
                  ) : (
                    <div key={method.label}>{content}</div>
                  );
                })}
              </div>

              <div className="rounded-xl border border-slate-700/60 bg-slate-800/80 p-6">
                <h4 className="mb-4 text-base font-semibold text-white">Connect</h4>
                <div className="flex gap-4">
                  {[
                    { icon: Github, label: "GitHub", href: "https://github.com/TsuTsu03", color: "hover:text-slate-200" },
                    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/den-jansen-flores-79b8ba387/", color: "hover:text-blue-300" },
                  ].map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`focus-ring pressable rounded-xl border border-slate-700 p-3 text-gray-400 transition-colors duration-200 hover:border-slate-500 ${social.color}`}
                        aria-label={social.label}
                      >
                        <Icon className="h-6 w-6" />
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-xl border border-slate-700/60 bg-slate-800/80 p-6">
                <h4 className="mb-4 text-base font-semibold text-white">Why Work With Me?</h4>
                <ul className="space-y-3">
                  {[
                    "I deliver working software, not static mockups",
                    "Built production SaaS used by real businesses",
                    "Full-stack ownership: database schema to polished UI",
                    "Agentic AI integrations: Claude API, OpenAI, tool use",
                    "Fast turnaround with clear milestones and honest timelines",
                    "Secure by default: RLS, RBAC, and tested workflows",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-gray-400">
                      <span className="mt-0.5 flex-shrink-0 text-blue-400">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="rounded-xl border border-slate-700/60 bg-slate-800/80 p-8 md:p-10">
                <h3 className="mb-8 text-2xl font-bold text-white">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div>
                    <label htmlFor="name" className="mb-3 block text-gray-300">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full rounded-xl border bg-white/5 px-6 py-4 text-white outline-none transition-all placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500/35 ${
                        errors.name ? "border-red-500" : "border-white/10 focus:border-blue-500"
                      }`}
                      placeholder="Your name"
                      aria-invalid={Boolean(errors.name)}
                    />
                    {errors.name && <p className="mt-2 text-sm text-red-300">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-3 block text-gray-300">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full rounded-xl border bg-white/5 px-6 py-4 text-white outline-none transition-all placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500/35 ${
                        errors.email ? "border-red-500" : "border-white/10 focus:border-blue-500"
                      }`}
                      placeholder="you@company.com"
                      aria-invalid={Boolean(errors.email)}
                    />
                    {errors.email && <p className="mt-2 text-sm text-red-300">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-3 block text-gray-300">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={8}
                      className={`w-full resize-none rounded-xl border bg-white/5 px-6 py-4 text-white outline-none transition-all placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500/35 ${
                        errors.message ? "border-red-500" : "border-white/10 focus:border-blue-500"
                      }`}
                      placeholder="Tell me about your project, role, or workflow problem..."
                      aria-invalid={Boolean(errors.message)}
                    />
                    {errors.message && <p className="mt-2 text-sm text-red-300">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`pressable focus-ring flex w-full items-center justify-center gap-3 rounded-xl px-8 py-5 text-lg text-white transition-colors duration-200 ${
                      isSubmitting
                        ? "cursor-not-allowed bg-gray-600"
                        : "bg-blue-600 shadow-lg shadow-blue-600/35 hover:bg-blue-500"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Preparing Email...
                      </>
                    ) : (
                      <>
                        <Send className="h-6 w-6" />
                        Compose Email
                      </>
                    )}
                  </button>

                  {submitSuccess && (
                    <div className="rounded-xl border border-green-500/30 bg-green-500/15 p-6 text-center text-green-200">
                      <p className="text-lg">✓ Email draft opened.</p>
                      <p className="mt-2 text-sm text-green-300">I usually respond within 24 hours.</p>
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
