import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/common/Reveal";

// Dark clinical FAQ accordion. items: [{ q, a }]
export default function FAQ({ items, title = "Questions" }) {
  return (
    <section
      data-testid="faq-section"
      className="border-t border-white/10 bg-xo-void py-24 md:py-32"
    >
      <div className="xo-container grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <div className="eyebrow mb-4">FAQ</div>
            <h2 className="font-display text-3xl font-medium tracking-tight text-white md:text-4xl">
              {title}
            </h2>
          </Reveal>
        </div>
        <div className="lg:col-span-8">
          <Reveal>
            <Accordion type="single" collapsible className="w-full">
              {items.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border-white/10"
                  data-testid={`faq-item-${i}`}
                >
                  <AccordionTrigger className="py-6 text-left font-display text-xl text-white hover:no-underline data-[state=open]:text-xo-teal md:text-2xl">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="max-w-3xl pb-8 text-base leading-relaxed text-white/55">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
