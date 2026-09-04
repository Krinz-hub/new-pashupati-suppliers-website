import React, { useState } from 'react';
import { User, Phone, Mail, MessageSquare, Send } from 'lucide-react';
import { Button } from '../common/Button';
import { FormStatus } from './FormStatus';
import { submitContactForm } from '../../services/contactService';
import { ContactFormData } from '../../types';

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'success' | 'error' | null>(null);
  const [statusMessage, setStatusMessage] = useState('');

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide details for your inquiry';
    } else if (formData.message.trim().length < 5) {
      newErrors.message = 'Message must be at least 5 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmissionStatus(null);
    setStatusMessage('');

    try {
      const result = await submitContactForm(formData);

      if (result.success) {
        setSubmissionStatus('success');
        setStatusMessage(
          result.message ||
            'Thank you! Your message has been sent successfully. We will get back to you soon.'
        );
        setFormData({
          name: '',
          phone: '',
          email: '',
          message: '',
        });
        setErrors({});
      } else {
        setSubmissionStatus('error');
        setStatusMessage(
          result.message ||
            'Unable to send your message. Please try again or contact us directly.'
        );
      }
    } catch {
      setSubmissionStatus('error');
      setStatusMessage(
        'Unable to send your message. Please try again or contact us directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-4 sm:p-8 lg:p-10 rounded-xl sm:rounded-card border border-brandBorder shadow-sm sm:shadow-soft-lg">
      <div className="mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-2xl font-bold text-navy">
          Send an Inquiry
        </h3>
        <p className="text-xs sm:text-sm text-brandText-muted mt-0.5 sm:mt-1">
          Fill in the details below and our team will get back to you promptly.
        </p>
      </div>

      {submissionStatus && (
        <div className="mb-4 sm:mb-6">
          <FormStatus type={submissionStatus} message={statusMessage} />
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-3.5 sm:space-y-5">
        {/* Full Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-xs sm:text-sm font-bold text-navy mb-1"
          >
            Full Name <span className="text-brandRed">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brandText-muted pointer-events-none" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={isSubmitting}
              placeholder="e.g. Ramesh Shrestha"
              className={`w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 rounded-lg bg-brandBg border text-xs sm:text-sm text-navy placeholder:text-brandText-muted/70 focus:outline-none focus:ring-2 focus:ring-brandRed focus:border-transparent transition-all ${
                errors.name ? 'border-brandError bg-brandError-light/20' : 'border-brandBorder'
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-[11px] sm:text-xs text-brandError font-medium mt-1">
              {errors.name}
            </p>
          )}
        </div>

        {/* Phone Number & Email Address (2 columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-xs sm:text-sm font-bold text-navy mb-1"
            >
              Phone Number <span className="text-brandRed">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brandText-muted pointer-events-none" />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={isSubmitting}
                placeholder="e.g. 9855070435"
                className={`w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 rounded-lg bg-brandBg border text-xs sm:text-sm text-navy placeholder:text-brandText-muted/70 focus:outline-none focus:ring-2 focus:ring-brandRed focus:border-transparent transition-all ${
                  errors.phone ? 'border-brandError bg-brandError-light/20' : 'border-brandBorder'
                }`}
              />
            </div>
            {errors.phone && (
              <p className="text-[11px] sm:text-xs text-brandError font-medium mt-1">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs sm:text-sm font-bold text-navy mb-1"
            >
              Email Address <span className="text-brandRed">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brandText-muted pointer-events-none" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                placeholder="e.g. ramesh@example.com"
                className={`w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 rounded-lg bg-brandBg border text-xs sm:text-sm text-navy placeholder:text-brandText-muted/70 focus:outline-none focus:ring-2 focus:ring-brandRed focus:border-transparent transition-all ${
                  errors.email ? 'border-brandError bg-brandError-light/20' : 'border-brandBorder'
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-[11px] sm:text-xs text-brandError font-medium mt-1">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Message / Inquiry */}
        <div>
          <label
            htmlFor="message"
            className="block text-xs sm:text-sm font-bold text-navy mb-1"
          >
            Message or Inquiry Details <span className="text-brandRed">*</span>
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3.5 top-2.5 sm:top-3 w-4 h-4 text-brandText-muted pointer-events-none" />
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              disabled={isSubmitting}
              placeholder="Tell us what products, quantities, or assistance you need..."
              className={`w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 rounded-lg bg-brandBg border text-xs sm:text-sm text-navy placeholder:text-brandText-muted/70 focus:outline-none focus:ring-2 focus:ring-brandRed focus:border-transparent transition-all resize-y ${
                errors.message ? 'border-brandError bg-brandError-light/20' : 'border-brandBorder'
              }`}
            />
          </div>
          {errors.message && (
            <p className="text-[11px] sm:text-xs text-brandError font-medium mt-1">
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit CTA */}
        <div className="pt-1 sm:pt-2">
          <Button
            type="submit"
            size="md"
            variant="primary"
            fullWidth
            isLoading={isSubmitting}
            disabled={isSubmitting}
            className="text-xs sm:text-sm py-2.5 sm:py-3"
            rightIcon={!isSubmitting ? <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : undefined}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </div>

        <p className="text-center text-[11px] sm:text-xs text-brandText-muted">
          Your information is handled securely and sent directly to New Pashupati Suppliers.
        </p>
      </form>
    </div>
  );
};
