import { useCallback, useRef, useState } from "react";
import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { SectionHeading } from "./ui/SectionHeading";

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

const CONTACT_METHODS = [
  {
    icon: Mail,
    label: "Email",
    value: "floresjansen28@gmail.com",
    href: "mailto:floresjansen28@gmail.com",
  },
  { icon: Phone, label: "Phone", value: "+63 935 0361 046" },
  { icon: MapPin, label: "Location", value: "Muntinlupa City, Metro Manila, PH" },
];

const SOCIALS = [
  { icon: Github, label: "GitHub", href: "https://github.com/TsuTsu03" },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/den-jansen-flores-79b8ba387/",
  },
];

const REASONS = [
  "I deliver working software, not static mockups",
  "Built production SaaS used by real businesses",
  "Full-stack ownership: database schema to polished UI",
  "Agentic AI integrations: Claude API, OpenAI, tool use",
  "Fast turnaround with clear milestones and honest timelines",
  "Secure by default: RLS, RBAC, and tested workflows",
];

const FIELD_CLASS =
  "w-full border bg-concrete px-4 py-3 text-bone outline-none transition-colors duration-200 placeholder:text-ash focus:border-signal";

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
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.trim().length < 20)
      newErrors.message = "Message must be at least 20 characters";
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
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
      );
      window.location.href = `mailto:floresjansen28@gmail.com?subject=${subject}&body=${body}`;

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      window.setTimeout(() => setSubmitSuccess(false), 5000);
    },
    [formData, validateForm]
  );

  return (
    <section id="contact" ref={ref} className="relative py-28 md:py-36">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div
          className={`transition-all duration-1000 ease-[var(--ease-out)] ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <SectionHeading
            index="05"
            eyebrow="Signal"
            title="Get In Touch"
            intro="Have a project in mind or looking to hire? I'm open to freelance work, full-time roles, technical consulting, and AI workflow builds."
          />

          <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
            <div className="space-y-6 lg:col-span-2">
              <div className="panel chamfer">
                <div className="border-b border-steel px-5 py-3">
                  <p className="data-label">Direct channels</p>
                </div>
                <div className="px-5 py-1">
                  {CONTACT_METHODS.map((method) => {
                    const Icon = method.icon;
                    const inner = (
                      <div className="flex items-start gap-3.5 py-4">
                        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                        <div className="min-w-0">
                          <p className="data-label mb-1">{method.label}</p>
                          <p className="data-value break-words">{method.value}</p>
                        </div>
                      </div>
                    );

                    return (
                      <div
                        key={method.label}
                        className="border-b border-steel/50 last:border-b-0"
                      >
                        {method.href ? (
                          <a
                            href={method.href}
                            className="focus-ring block transition-colors duration-200 hover:text-signal"
                          >
                            {inner}
                          </a>
                        ) : (
                          inner
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-2">
                {SOCIALS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="focus-ring pressable flex flex-1 items-center justify-center gap-2 border border-steel-bright py-3 font-mono text-[0.6875rem] tracking-[0.14em] text-ash uppercase transition-colors duration-200 hover:border-signal/50 hover:text-signal"
                    >
                      <Icon className="h-4 w-4" />
                      {social.label}
                    </a>
                  );
                })}
              </div>

              <div className="panel chamfer-bl">
                <div className="border-b border-steel px-5 py-3">
                  <p className="data-label">Why work with me</p>
                </div>
                <ul className="space-y-3 px-5 py-5">
                  {REASONS.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-ash">
                      <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 bg-signal" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* The signal terminal */}
            <div className="lg:col-span-3">
              <div className="panel chamfer rim-top relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-steel px-5 py-3 sm:px-7">
                  <p className="data-label">Outbound transmission</p>
                  <span className="flex items-center gap-1.5 font-mono text-[0.625rem] tracking-[0.14em] text-sodium uppercase">
                    <span className="animate-status-pulse h-1.5 w-1.5 bg-sodium" />
                    Receiving
                  </span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-7" noValidate>
                  <div>
                    <label htmlFor="name" className="data-label mb-2 block">
                      Your name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className={`${FIELD_CLASS} focus-ring ${
                        errors.name ? "border-sodium" : "border-steel-bright"
                      }`}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-2 font-mono text-xs text-sodium">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="data-label mb-2 block">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className={`${FIELD_CLASS} focus-ring ${
                        errors.email ? "border-sodium" : "border-steel-bright"
                      }`}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-2 font-mono text-xs text-sodium">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="data-label mb-2 block">
                      Your message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={8}
                      placeholder="Tell me about your project, role, or workflow problem..."
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      className={`${FIELD_CLASS} focus-ring resize-none ${
                        errors.message ? "border-sodium" : "border-steel-bright"
                      }`}
                    />
                    {errors.message && (
                      <p id="message-error" className="mt-2 font-mono text-xs text-sodium">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`pressable focus-ring chamfer flex w-full items-center justify-center gap-2.5 px-8 py-4 font-mono text-xs tracking-[0.18em] uppercase transition-colors duration-200 ${
                      isSubmitting
                        ? "cursor-not-allowed bg-steel text-ash"
                        : "bg-signal text-void hover:bg-white-hot"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-ash border-t-transparent" />
                        Transmitting
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Signal
                      </>
                    )}
                  </button>

                  {submitSuccess && (
                    <div
                      role="status"
                      className="border border-sodium/45 bg-sodium/10 px-5 py-4"
                    >
                      <p className="font-mono text-xs tracking-[0.14em] text-sodium uppercase">
                        Signal received
                      </p>
                      <p className="mt-2 text-sm text-ash">
                        Email draft opened. I usually respond within 24 hours.
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
