import { whatsappUrl } from "@/lib/site";
import { WhatsappIcon } from "@/components/icons/social";

export function WhatsappButton() {
  const href = whatsappUrl("Hi! I'd like to book a tour.");
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-[#1a7f40] text-white shadow-lg transition-transform hover:scale-110 hover:bg-[#155f30]"
    >
      <WhatsappIcon className="size-7" />
    </a>
  );
}
