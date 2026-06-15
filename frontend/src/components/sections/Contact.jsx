import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Phone, Mail, Instagram, ArrowRight, Loader2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { HOME } from "@/constants/testIds";
import api, { formatApiError } from "@/lib/api";
import MagneticButton from "@/components/motion/MagneticButton";

const INDUSTRY_OPTIONS = [
  "Restaurant / Cafe",
  "Barbershop",
  "Hair Salon",
  "Roofing Company",
  "Cleaning Company",
  "Other Service Business",
];

const schema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  business_name: z.string().min(2, "Please enter your business name"),
  email: z.string().email("Please enter a valid email"),
  phone: z
    .string()
    .min(7, "Please enter your phone number")
    .regex(/^[0-9+()\-\s]{7,40}$/, "Use digits, spaces, +, -, ( ) only"),
  industry: z.string().min(2, "Please select your industry"),
  website_url: z
    .string()
    .max(300)
    .optional()
    .or(z.literal("")),
  subject: z.string().min(2).max(120).default("General Inquiry"),
  message: z.string().min(10, "Please share a few sentences about your project"),
});

export default function Contact() {
  const sectionRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      business_name: "",
      email: "",
      phone: "",
      industry: "",
      website_url: "",
      subject: "General Inquiry",
      message: "",
    },
  });

  // Allow CTAs throughout the site to prefill the form.
  useEffect(() => {
    const onPrefillConsult = () => {
      setValue("subject", "Free Consultation");
      setValue(
        "message",
        "Hi A-Designs, I'd like to book a free consultation to discuss my project."
      );
      requestAnimationFrame(() => {
        document.querySelector("[data-testid='contact-input-name']")?.focus();
      });
    };
    const onPrefillMockup = () => {
      setValue("subject", "Free Website Mockup Request");
      setValue(
        "message",
        "Hi A-Designs, I'd love to see what my business could look like with a custom website. Please put together a free mockup for me."
      );
      requestAnimationFrame(() => {
        document.querySelector("[data-testid='contact-input-name']")?.focus();
      });
    };
    const onPrefill = (e) => {
      const d = e.detail || {};
      if (d.subject) setValue("subject", d.subject);
      if (d.message) setValue("message", d.message);
    };
    window.addEventListener("a-designs:prefill-consult", onPrefillConsult);
    window.addEventListener("a-designs:prefill-mockup", onPrefillMockup);
    window.addEventListener("a-designs:prefill", onPrefill);
    return () => {
      window.removeEventListener("a-designs:prefill-consult", onPrefillConsult);
      window.removeEventListener("a-designs:prefill-mockup", onPrefillMockup);
      window.removeEventListener("a-designs:prefill", onPrefill);
    };
  }, [setValue]);

  const industry = watch("industry");
  const subject = watch("subject");

  const onSubmit = async (data) => {
    setErrorMsg("");
    try {
      const payload = { ...data };
      if (!payload.website_url) delete payload.website_url;
      await api.post("/leads", payload);
      setSubmitted(true);
      reset();
      toast.success("Thanks — we'll be in touch within 1 business day.");
    } catch (e) {
      const msg = formatApiError(e.response?.data?.detail) || "Couldn't send right now. Please try again.";
      setErrorMsg(msg);
      toast.error(msg);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 sm:py-44 overflow-hidden"
    >
      <div className="aurora aurora-purple -left-32 top-10 w-[460px] h-[460px] opacity-25" />
      <div className="aurora aurora-violet -right-32 bottom-10 w-[460px] h-[460px] opacity-25" />

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="text-xs tracking-eyebrow text-purple-300">Contact</div>
              <h2 className="mt-5 font-display text-display-lg font-medium tracking-tight leading-[1.05]">
                See what your business{" "}
                <span className="text-gradient-violet">could look like.</span>
              </h2>
              <p className="mt-7 text-white/65 leading-relaxed text-lg">
                Tell us a little about your business and we'll put together a
                free, no-pressure website concept. We reply to every message
                within one business day.
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="mt-8 space-y-3">
                <a
                  href="tel:+19029894072"
                  className="glass rounded-2xl p-4 flex items-center gap-3 hover:bg-white/5 transition-colors"
                >
                  <span className="inline-flex w-10 h-10 rounded-xl bg-purple-500/15 ring-1 ring-purple-400/30 items-center justify-center text-purple-200">
                    <Phone className="w-4 h-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[10px] tracking-eyebrow text-white/45">Call</div>
                    <div className="text-sm font-medium">902-989-4072</div>
                  </div>
                  <ArrowRight className="ml-auto w-4 h-4 text-white/40" />
                </a>
                <a
                  href="mailto:sharwen.ahmed@yahoo.com"
                  className="glass rounded-2xl p-4 flex items-center gap-3 hover:bg-white/5 transition-colors"
                >
                  <span className="inline-flex w-10 h-10 rounded-xl bg-purple-500/15 ring-1 ring-purple-400/30 items-center justify-center text-purple-200">
                    <Mail className="w-4 h-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[10px] tracking-eyebrow text-white/45">Email</div>
                    <div className="text-sm font-medium break-all">sharwen.ahmed@yahoo.com</div>
                  </div>
                  <ArrowRight className="ml-auto w-4 h-4 text-white/40" />
                </a>
                <a
                  href="https://www.instagram.com/adesignshalifax/"
                  target="_blank"
                  rel="noreferrer"
                  className="glass rounded-2xl p-4 flex items-center gap-3 hover:bg-white/5 transition-colors"
                >
                  <span className="inline-flex w-10 h-10 rounded-xl bg-purple-500/15 ring-1 ring-purple-400/30 items-center justify-center text-purple-200">
                    <Instagram className="w-4 h-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[10px] tracking-eyebrow text-white/45">Instagram</div>
                    <div className="text-sm font-medium">@adesignshalifax</div>
                  </div>
                  <ArrowRight className="ml-auto w-4 h-4 text-white/40" />
                </a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="relative gradient-border rounded-3xl">
              <div className="relative p-6 sm:p-8 lg:p-10">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      data-testid={HOME.contactSuccess}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-10"
                    >
                      <div className="mx-auto w-14 h-14 rounded-full bg-emerald-500/15 ring-1 ring-emerald-400/40 grid place-items-center text-emerald-300">
                        <CheckCircle2 className="w-7 h-7" />
                      </div>
                      <h3 className="mt-5 font-display text-2xl sm:text-3xl font-medium">
                        Message received.
                      </h3>
                      <p className="mt-2 text-white/65 max-w-md mx-auto">
                        Thanks for reaching out. We'll be in touch within one
                        business day — usually much sooner.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm glass hover:bg-white/10 transition-colors"
                      >
                        Send another
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      data-testid={HOME.contactForm}
                      onSubmit={handleSubmit(onSubmit)}
                      noValidate
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                      <div>
                        <Label className="text-xs text-white/70">Your name</Label>
                        <Input
                          data-testid={HOME.contactName}
                          {...register("name")}
                          placeholder="Alex Carter"
                          className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-purple-400"
                        />
                        {errors.name && (
                          <p className="mt-1 text-xs text-red-300">{errors.name.message}</p>
                        )}
                      </div>
                      <div>
                        <Label className="text-xs text-white/70">Business name</Label>
                        <Input
                          data-testid={HOME.contactBusiness}
                          {...register("business_name")}
                          placeholder="Bright Harbour Cleaning"
                          className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-purple-400"
                        />
                        {errors.business_name && (
                          <p className="mt-1 text-xs text-red-300">
                            {errors.business_name.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label className="text-xs text-white/70">Email</Label>
                        <Input
                          data-testid={HOME.contactEmail}
                          {...register("email")}
                          type="email"
                          placeholder="you@business.com"
                          className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-purple-400"
                        />
                        {errors.email && (
                          <p className="mt-1 text-xs text-red-300">{errors.email.message}</p>
                        )}
                      </div>
                      <div>
                        <Label className="text-xs text-white/70">Phone</Label>
                        <Input
                          data-testid={HOME.contactPhone}
                          {...register("phone")}
                          placeholder="902-555-0123"
                          className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-purple-400"
                        />
                        {errors.phone && (
                          <p className="mt-1 text-xs text-red-300">{errors.phone.message}</p>
                        )}
                      </div>
                      <div>
                        <Label className="text-xs text-white/70">Industry</Label>
                        <Select
                          value={industry}
                          onValueChange={(v) => setValue("industry", v, { shouldValidate: true })}
                        >
                          <SelectTrigger
                            data-testid={HOME.contactIndustry}
                            className="mt-1.5 bg-white/5 border-white/10 text-white focus:ring-purple-400"
                          >
                            <SelectValue placeholder="Select your industry" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#120524] text-white border-white/10">
                            {INDUSTRY_OPTIONS.map((i) => (
                              <SelectItem key={i} value={i}>
                                {i}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.industry && (
                          <p className="mt-1 text-xs text-red-300">{errors.industry.message}</p>
                        )}
                      </div>
                      <div>
                        <Label className="text-xs text-white/70">
                          Website URL <span className="text-white/35">(optional)</span>
                        </Label>
                        <Input
                          data-testid={HOME.contactWebsite}
                          {...register("website_url")}
                          placeholder="https://yourcurrentsite.com"
                          className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-purple-400"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label className="text-xs text-white/70">Subject</Label>
                        <Input
                          {...register("subject")}
                          data-testid="contact-subject"
                          value={subject}
                          onChange={(e) => setValue("subject", e.target.value)}
                          className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-purple-400"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label className="text-xs text-white/70">Project details</Label>
                        <Textarea
                          data-testid={HOME.contactMessage}
                          rows={5}
                          {...register("message")}
                          placeholder="A few sentences about your business, what you need, and your timeline."
                          className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-purple-400"
                        />
                        {errors.message && (
                          <p className="mt-1 text-xs text-red-300">{errors.message.message}</p>
                        )}
                      </div>

                      {errorMsg && (
                        <div
                          data-testid={HOME.contactError}
                          className="sm:col-span-2 inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-red-500/10 ring-1 ring-red-400/30 text-red-200 text-sm"
                        >
                          <AlertCircle className="w-4 h-4" /> {errorMsg}
                        </div>
                      )}

                      <div className="sm:col-span-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                        <p className="text-xs text-white/50 max-w-xs">
                          By submitting, you agree to be contacted about your
                          inquiry. We never share your information.
                        </p>
                        <MagneticButton
                          type="submit"
                          data-testid={HOME.contactSubmit}
                          disabled={isSubmitting}
                          strength={0.2}
                          className="group px-7 py-3.5 rounded-full text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-fuchsia-600 shadow-[0_24px_60px_-15px_rgba(147,51,234,0.7)] hover:shadow-[0_32px_70px_-12px_rgba(147,51,234,0.85)] transition-all disabled:opacity-60 sheen"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" /> Sending…
                            </>
                          ) : (
                            <>
                              Send message <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                            </>
                          )}
                        </MagneticButton>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
