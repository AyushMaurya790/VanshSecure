import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { COMPANY } from "@/lib/site-data";

export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappNumber = COMPANY.whatsapp.replace(/\D/g, "");
  const defaultMessage = encodeURIComponent(
    "Hi, I would like to know more about your financial services."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

  return (
    <>
      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {isOpen && (
          <div className="mb-4 w-80 animate-in slide-in-from-bottom-4 rounded-2xl border border-green-200 bg-white shadow-2xl">
            <div className="flex items-center gap-3 rounded-t-2xl bg-gradient-to-r from-green-600 to-green-500 p-4 text-white">
              <div className="flex size-12 items-center justify-center rounded-full bg-white/20">
                <MessageCircle className="size-6" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">Chat with us</p>
                <p className="text-xs text-green-50">We typically reply instantly</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 transition-colors hover:bg-white/20"
                aria-label="Close chat"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="space-y-4 p-4">
              <div className="rounded-lg bg-green-50 p-3">
                <p className="text-sm text-gray-700">
                  <strong>Vansh Secure Avenue LLP</strong>
                </p>
                <p className="mt-1 text-xs text-gray-600">
                  Hi! How can we help you today?
                </p>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition-all duration-300 hover:bg-green-700 hover:shadow-lg"
              >
                <MessageCircle className="size-5" />
                Start WhatsApp Chat
              </a>
              <p className="text-center text-xs text-gray-500">
                Office hours: {COMPANY.hours}
              </p>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-green-500/50"
          aria-label="Open WhatsApp chat"
        >
          {isOpen ? (
            <X className="size-7 transition-transform group-hover:rotate-90" />
          ) : (
            <MessageCircle className="size-7 transition-transform group-hover:scale-110" />
          )}
        </button>
      </div>
    </>
  );
}
