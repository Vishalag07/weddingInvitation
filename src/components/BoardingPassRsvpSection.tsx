import React, { useState } from "react";
import { Plane, Check, Plus, Minus } from "lucide-react";
import confetti from "canvas-confetti";
import { ScrollText } from "./ScrollReveal";

interface BoardingPassRsvpSectionProps {
  originCode?: string;
  originCity?: string;
  originDate?: string;
  destCode?: string;
  destCity?: string;
  destDate?: string;
}

export const BoardingPassRsvpSection: React.FC<
  BoardingPassRsvpSectionProps
> = ({
  originCode = "CCU",
  originCity = "Kolkata, WB",
  originDate = "9 FEB",
  destCode = "BBI",
  destCity = "Talcher, Odisha",
  destDate = "10 FEB",
}) => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [attendance, setAttendance] = useState<"attending" | "declined">(
    "attending",
  );
  const [guestCount, setGuestCount] = useState<number>(1);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbx4YbeqlZEsc46aDRAkP_Arj5sT8unN8fBXcxuTbe8CpIxEPwR9DfKYWD5CEeAkwT1K-g/exec";

  const validateForm = () => {
    const nextErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      nextErrors.fullName = "Please enter your full name.";
    } else if (fullName.trim().length < 2) {
      nextErrors.fullName = "Name must contain at least 2 characters.";
    }

    // Phone is optional. If provided, validate its format.
    if (!phone.trim()) {
      nextErrors.phone = "Please enter your phone number.";
    } else {
      const normalizedPhone = phone.replace(/[\s()-]/g, "");

      if (!/^\+?[0-9]{10}$/.test(normalizedPhone)) {
        nextErrors.phone = "Enter a valid phone number with 10 digits.";
      }
    }

    if (attendance === "attending") {
      if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 10) {
        nextErrors.guestCount = "Guest count must be between 1 and 10.";
      }
    }

    if (message.length > 1000) {
      nextErrors.message = "Message must be 1000 characters or fewer.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting || !validateForm()) return;

    setIsSubmitting(true);
    setIsSubmitted(false);

    const payload = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      attendance,
      guestCount: attendance === "attending" ? guestCount : 0,
      message: message.trim(),
    };

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      // Show feedback after the request completes.
      setIsSubmitted(true);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.7 },
      });
    } catch (error) {
      alert("Unable to send your RSVP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="rsvp"
      className="w-full max-w-md mx-auto my-14 px-4 text-center"
    >
      {/* Title */}
      <ScrollText delay={0.05} yOffset={25} blur={10}>
        <h2 className="font-script text-4xl sm:text-5xl text-[#6b1d2f] leading-tight mb-2">
          Kindly Respond
        </h2>
        <p className="font-editorial text-sm sm:text-base text-[#5c5042] max-w-xs mx-auto mb-6 leading-relaxed">
          Your seat on our journey is waiting — fill in your boarding pass.
        </p>
      </ScrollText>

      {/* Boarding Pass Ticket Card */}
      <div className="bg-[#ffffff] rounded-3xl shadow-xl overflow-hidden border border-stone-200/80 text-left relative">
        {/* Maroon Header Banner */}
        <div className="bg-[#6b1d2f] text-amber-100/90 px-5 py-3 flex items-center justify-between text-[11px] font-royal uppercase tracking-widest font-medium">
          <div className="flex items-center gap-2">
            <Plane className="w-3.5 h-3.5 fill-current" />
            <span>THE WEDDING EXPRESS</span>
          </div>
          <span className="text-white tracking-wider">BOARDING PASS</span>
        </div>

        {/* Flight Route Banner */}
        <div className="px-6 pt-5 pb-4 bg-white flex items-center justify-between">
          {/* Origin */}
          <div className="space-y-0.5">
            <h3 className="font-royal text-3xl font-bold text-[#6b1d2f] tracking-wide">
              {originCode}
            </h3>
            <p className="font-editorial text-xs text-[#5c5042]">
              {originCity}
            </p>
            <p className="font-royal text-[10px] uppercase tracking-widest text-[#b48332] font-semibold pt-0.5">
              {originDate}
            </p>
          </div>

          {/* Plane in Middle */}
          <div className="flex items-center gap-1.5 text-[#b48332] -translate-y-1">
            <span className="text-[10px] tracking-widest opacity-60">- -</span>
            <Plane className="w-4 h-4 fill-[#b48332] rotate-90" />
            <span className="text-[10px] tracking-widest opacity-60">- -</span>
          </div>

          {/* Destination */}
          <div className="space-y-0.5 text-right">
            <h3 className="font-royal text-3xl font-bold text-[#6b1d2f] tracking-wide">
              {destCode}
            </h3>
            <p className="font-editorial text-xs text-[#5c5042]">{destCity}</p>
            <p className="font-royal text-[10px] uppercase tracking-widest text-[#b48332] font-semibold pt-0.5">
              {destDate}
            </p>
          </div>
        </div>

        {/* Dotted Perforation Line */}
        <div className="border-t border-dashed border-stone-200 mx-5 my-1" />

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="px-6 pt-4 pb-3 space-y-4">
          {/* Your Name */}
          <div className="space-y-1">
            <label className="block font-royal text-[10px] uppercase tracking-[0.2em] text-[#b48332] font-semibold">
              YOUR NAME
            </label>
            <input
              type="text"
              required
              placeholder="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full pb-1 pt-0.5 border-b border-stone-200 focus:border-[#6b1d2f] text-sm text-[#2a241b] placeholder:text-stone-300 font-editorial outline-none transition-colors"
            />
            {errors.fullName && (
              <p className="text-xs text-red-600 mt-1" role="alert">
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-1">
            <label className="block font-royal text-[10px] uppercase tracking-[0.2em] text-[#b48332] font-semibold">
              PHONE NUMBER
            </label>
            <input
              type="tel"
              required
              placeholder="+91 ..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className="w-full pb-1 pt-0.5 border-b border-stone-200 focus:border-[#6b1d2f] text-sm text-[#2a241b] placeholder:text-stone-300 font-sans outline-none transition-colors"
            />

            {errors.phone && (
              <p
                id="phone-error"
                className="text-xs text-red-600 mt-1"
                role="alert"
              >
                {errors.phone}
              </p>
            )}
          </div>

          {/* Will You Attend */}
          <div className="space-y-1.5 pt-1">
            <label className="block font-royal text-[10px] uppercase tracking-[0.2em] text-[#b48332] font-semibold">
              WILL YOU ATTEND?
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setAttendance("attending")}
                className={`py-2 px-3 rounded-lg text-xs font-editorial flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  attendance === "attending"
                    ? "bg-[#6b1d2f] text-white font-medium shadow-xs"
                    : "bg-white text-[#2a241b] border border-stone-200 hover:border-[#6b1d2f]"
                }`}
              >
                <span>Joyfully yes</span>
                {attendance === "attending" && (
                  <Check className="w-3.5 h-3.5" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setAttendance("declined")}
                className={`py-2 px-3 rounded-lg text-xs font-editorial flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  attendance === "declined"
                    ? "bg-[#6b1d2f] text-white font-medium shadow-xs"
                    : "bg-white text-[#2a241b] border border-stone-200 hover:border-[#6b1d2f]"
                }`}
              >
                <span>Regretfully no</span>
                {attendance === "declined" && <Check className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Number of Guests */}
          {attendance === "attending" && (
            <div className="space-y-1.5 pt-1">
              <label className="block font-royal text-[10px] uppercase tracking-[0.2em] text-[#b48332] font-semibold">
                NUMBER OF GUESTS
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setGuestCount((prev) => Math.max(1, prev - 1))}
                  className="w-8 h-8 rounded-full border border-stone-300 text-stone-700 flex items-center justify-center hover:bg-stone-50 active:scale-95 transition-all cursor-pointer"
                  aria-label="Decrease guest count"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-editorial text-base font-semibold w-6 text-center text-[#2a241b]">
                  {guestCount}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setGuestCount((prev) => Math.min(10, prev + 1))
                  }
                  className="w-8 h-8 rounded-full border border-stone-300 text-stone-700 flex items-center justify-center hover:bg-stone-50 active:scale-95 transition-all cursor-pointer"
                  aria-label="Increase guest count"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* A Message for the Couple */}
          <div className="space-y-1 pt-1">
            <label className="block font-royal text-[10px] uppercase tracking-[0.2em] text-[#b48332] font-semibold">
              A MESSAGE FOR THE COUPLE
            </label>
            <textarea
              rows={2}
              placeholder="Your blessings & wishes..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full pb-1 pt-0.5 border-b border-stone-200 focus:border-[#6b1d2f] text-sm text-[#2a241b] placeholder:text-stone-300 font-editorial outline-none resize-none transition-colors"
            />
          </div>

          {/* Ticket Tear Notches with Perforated Line */}
          <div className="relative flex items-center justify-between py-3 -mx-6 overflow-hidden select-none">
            {/* Left cutout notch matching background */}
            <div className="w-4 h-7 bg-[#f7f3ea] rounded-r-full -ml-2 shadow-inner border-y border-r border-stone-200/40" />
            {/* Dotted tear line */}
            <div className="flex-1 border-b border-dashed border-stone-300 mx-2" />
            {/* Right cutout notch matching background */}
            <div className="w-4 h-7 bg-[#f7f3ea] rounded-l-full -mr-2 shadow-inner border-y border-l border-stone-200/40" />
          </div>

          {/* Barcode & Submit Button Row */}
          <div className="flex items-center justify-between pt-1 pb-2">
            {/* Realistic Barcode SVG */}
            <div className="flex flex-col items-start select-none">
              <svg
                className="w-20 h-9"
                viewBox="0 0 100 40"
                fill="currentColor"
              >
                <rect x="0" y="0" width="3" height="40" fill="#2a241b" />
                <rect x="5" y="0" width="2" height="40" fill="#2a241b" />
                <rect x="10" y="0" width="4" height="40" fill="#2a241b" />
                <rect x="16" y="0" width="1" height="40" fill="#2a241b" />
                <rect x="19" y="0" width="5" height="40" fill="#2a241b" />
                <rect x="27" y="0" width="2" height="40" fill="#2a241b" />
                <rect x="31" y="0" width="3" height="40" fill="#2a241b" />
                <rect x="36" y="0" width="1" height="40" fill="#2a241b" />
                <rect x="39" y="0" width="4" height="40" fill="#2a241b" />
                <rect x="45" y="0" width="2" height="40" fill="#2a241b" />
                <rect x="49" y="0" width="6" height="40" fill="#2a241b" />
                <rect x="58" y="0" width="2" height="40" fill="#2a241b" />
                <rect x="62" y="0" width="4" height="40" fill="#2a241b" />
                <rect x="68" y="0" width="1" height="40" fill="#2a241b" />
                <rect x="71" y="0" width="3" height="40" fill="#2a241b" />
                <rect x="76" y="0" width="5" height="40" fill="#2a241b" />
                <rect x="83" y="0" width="2" height="40" fill="#2a241b" />
                <rect x="87" y="0" width="4" height="40" fill="#2a241b" />
                <rect x="93" y="0" width="2" height="40" fill="#2a241b" />
                <rect x="97" y="0" width="3" height="40" fill="#2a241b" />
              </svg>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 ml-4 bg-[#6b1d2f] hover:bg-[#581423] disabled:opacity-50 text-white py-3 px-6 rounded-full font-royal text-xs uppercase tracking-widest font-semibold shadow-md active:scale-95 transition-all cursor-pointer text-center"
            >
              {isSubmitting ? "SENDING..." : "SEND RSVP"}
            </button>
          </div>

          {/* Submission feedback message */}
          {isSubmitted && (
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-editorial text-center animate-fadeIn">
              ✓ Boarding pass confirmed! Your RSVP has been received with joy.
            </div>
          )}
        </form>
      </div>
    </section>
  );
};
