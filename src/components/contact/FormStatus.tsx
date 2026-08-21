import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '../../utils/helpers';

interface FormStatusProps {
  type: 'success' | 'error' | null;
  message?: string;
}

export const FormStatus: React.FC<FormStatusProps> = ({ type, message }) => {
  if (!type) return null;

  const isSuccess = type === 'success';

  return (
    <div
      role="alert"
      className={cn(
        'p-4 rounded-xl border flex items-start gap-3.5 animate-in fade-in duration-300',
        isSuccess
          ? 'bg-brandSuccess-light border-brandSuccess/30 text-green-900'
          : 'bg-brandError-light border-brandError/30 text-red-900'
      )}
    >
      {isSuccess ? (
        <CheckCircle className="w-5 h-5 text-brandSuccess shrink-0 mt-0.5" />
      ) : (
        <AlertCircle className="w-5 h-5 text-brandError shrink-0 mt-0.5" />
      )}

      <div className="flex-1 text-sm">
        <p className="font-bold">
          {isSuccess ? 'Message Sent Successfully!' : 'Submission Failed'}
        </p>
        <p className="mt-0.5 leading-relaxed">
          {message ||
            (isSuccess
              ? 'Thank you! Your message has been sent successfully. We will get back to you soon.'
              : 'Unable to send your message. Please try again or contact us directly.')}
        </p>
      </div>
    </div>
  );
};
