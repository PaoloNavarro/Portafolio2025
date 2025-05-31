// src/app/[locale]/page.tsx (Example if you're adding to your main page)
// Or create src/app/[locale]/contact/page.tsx for a dedicated contact page

"use client";

import React, { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { sendEmail } from '@/lib/sendEmail';// Re-using Framer Motion variants from AboutMeSection for consistency
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const ContactSection: React.FC = () => {
  const pathname = usePathname();
  const lng = pathname.split('/')[1];
  const { t } = useTranslation(lng, 'contact'); // Using 'contact' namespace

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for the field as user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

//   const validateForm = () => {
//     let newErrors: { name?: string; email?: string; message?: string } = {};
//     if (!formData.name.trim()) {
//       newErrors.name = t('contact.validation.name_required');
//     }
//     if (!formData.email.trim()) {
//       newErrors.email = t('contact.validation.email_required');
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = t('contact.validation.email_invalid');
//     }
//     if (!formData.message.trim()) {
//       newErrors.message = t('contact.validation.message_required');
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (!validateForm()) {
    //   return;
    // }

    setStatus('loading');
    try {
      // In a real application, you would send this to your backend API
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      // Simulate API call using the sendEmail utility (no actual sending here)
      await sendEmail(formData); // This is a placeholder for your backend logic

      setStatus('success');
      setFormData({ name: '', email: '', message: '' }); // Clear form
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('error');
    } finally {
      // Optionally reset status after a delay
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-12 md:py-20 bg-[var(--color-background)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={sectionVariants}
          className="text-3xl md:text-5xl font-bold text-center mb-10"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            {t('contact.title')}
          </span>
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="relative p-6 rounded-xl border bg-[var(--color-background-card)] border-[var(--color-background-card)] shadow-lg
                     group hover:border-transparent hover:shadow-xl transition-all duration-300
                     hover:bg-gradient-to-br from-[var(--color-background-card)] to-[var(--color-background-card)]
                     overflow-hidden animated-border-box"
        >
          <motion.p variants={itemVariants} className="text-lg md:text-xl leading-relaxed text-[var(--color-text)] text-center mb-8">
            {t('contact.description')}
          </motion.p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={itemVariants}>
              <label htmlFor="name" className="block text-sm font-medium text-[var(--color-text)] mb-2">
                {t('contact.form.name_label')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={ `w-full p-3 rounded-md bg-[var(--color-background)] border ${errors.name ? 'border-red-500' : 'border-[var(--color-border)]'} text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all duration-200`}
                placeholder={t('contact.form.name_placeholder')}
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && <p id="name-error" className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--color-text)] mb-2">
                {t('contact.form.email_label')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-3 rounded-md bg-[var(--color-background)] border ${errors.email ? 'border-red-500' : 'border-[var(--color-border)]'} text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all duration-200`}
                placeholder={t('contact.form.email_placeholder')}
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && <p id="email-error" className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="message" className="block text-sm font-medium text-[var(--color-text)] mb-2">
                {t('contact.form.message_label')}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className={`w-full p-3 rounded-md bg-[var(--color-background)] border ${errors.message ? 'border-red-500' : 'border-[var(--color-border)]'} text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all duration-200 resize-y`}
                placeholder={t('contact.form.message_placeholder')}
                aria-invalid={errors.message ? "true" : "false"}
                aria-describedby={errors.message ? "message-error" : undefined}
              ></textarea>
              {errors.message && <p id="message-error" className="mt-1 text-sm text-red-500">{errors.message}</p>}
            </motion.div>

            <motion.button
              variants={itemVariants}
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 px-6 rounded-full
                         font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300
                         hover:from-primary/90 hover:to-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? t('contact.form.sending') : t('contact.form.submit_button')}
            </motion.button>

            <AnimatePresence>
              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-4 text-center text-green-500 font-medium"
                >
                  {t('contact.form.success_message')}
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-4 text-center text-red-500 font-medium"
                >
                  {t('contact.form.error_message')}
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;