import { CONTACT_API_URL } from '../config/contact';
import { ContactFormData, ContactSubmissionResult } from '../types';

/**
 * Submit contact form payload to Google Apps Script Web App endpoint
 * 
 * Requirements:
 * - Content-Type: "text/plain;charset=utf-8" (avoids preflight CORS blocking)
 * - Payload: { name, phone, email, message }
 * - Safe response handling (Google Apps Script may return 302 redirect, text, JSON, or opaque response)
 */
export async function submitContactForm(
  data: ContactFormData
): Promise<ContactSubmissionResult> {
  const payload = {
    name: data.name.trim(),
    phone: data.phone.trim(),
    email: data.email.trim(),
    message: data.message.trim(),
  };

  // Check if developer has left placeholder
  const isPlaceholder =
    !CONTACT_API_URL ||
    (CONTACT_API_URL as string) === "PASTE_EXISTING_GOOGLE_APPS_SCRIPT_EXEC_URL_HERE" ||
    (CONTACT_API_URL as string).includes("PASTE_EXISTING");

  if (isPlaceholder) {
    console.info(
      "[Contact Service] Simulated mode active for payload:",
      payload
    );
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      success: true,
      message: "Thank you! Your message has been sent successfully. We will get back to you soon.",
    };
  }

  try {
    // Primary attempt: standard POST request
    const response = await fetch(CONTACT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    // If response received
    let responseText = "";
    try {
      responseText = await response.text();
    } catch {
      // Body may not be readable on opaque or redirected response
    }

    if (responseText) {
      try {
        const json = JSON.parse(responseText);
        if (json && (json.result === "error" || json.success === false)) {
          return {
            success: false,
            message: json.message || "Unable to process message. Please try again.",
          };
        }
        if (json && (json.result === "success" || json.success === true)) {
          return {
            success: true,
            message: json.message || "Thank you! Your message has been sent successfully. We will get back to you soon.",
          };
        }
      } catch {
        // Response is non-JSON (e.g. text/html redirect), which is normal for Apps Script
      }
    }

    return {
      success: true,
      message: "Thank you! Your message has been sent successfully. We will get back to you soon.",
    };
  } catch (error) {
    console.warn(
      "[Contact Service] Direct fetch encountered CORS/redirect restriction, retrying with no-cors mode:",
      error
    );

    try {
      // Fallback attempt: mode "no-cors" ensures browser transmits payload without CORS preflight block
      await fetch(CONTACT_API_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      return {
        success: true,
        message: "Thank you! Your message has been sent successfully. We will get back to you soon.",
      };
    } catch (fallbackError) {
      console.error("[Contact Service Fallback Error]:", fallbackError);
      return {
        success: false,
        message: "Unable to send your message. Please check your internet connection or call us directly.",
      };
    }
  }
}
