import { MaskText, Reveal } from "@/components/common/Reveal";
import { usePageMeta } from "@/lib/usePageMeta";

// Summary of the full Xenon Ophthalmics Inc. Terms and Conditions,
// preserving section titles from the source document.
const SECTIONS = [
  {
    id: "applicability",
    heading: "1. Applicability",
    body: [
      'The accompanying purchase order or pricing quotation (the "Confirmation Document") and these License Terms & Conditions ("Terms") comprise the entire Agreement between Xenon Ophthalmics Inc. ("Xenon Ophthalmics Inc") and the Customer named on the Confirmation Document ("Customer") concerning the provision by Xenon Ophthalmics Inc to Customer of the Headsets (as defined below), and supersede all prior verbal or written communications or contemporaneous understandings, agreements, negotiations, representations and warranties, and communications.',
      "These Terms prevail over any of Customer's general terms and conditions of purchase regardless of whether or when Customer has submitted its purchase order or such terms. Fulfillment of Customer's order does not constitute acceptance of any of Customer's terms and conditions and does not serve to modify or amend these Terms.",
      "All orders for Headsets submitted by Customers are subject to acceptance by Xenon Ophthalmics Inc. Acceptance is limited to licensed eye care professionals or agencies representing licensed eye care professionals. Acceptance of Headsets by Customer constitutes an agreement by Customer to be bound by these Terms.",
    ],
  },
  {
    id: "product-license",
    heading: "2. Loaned Product; Purchased Product; Licensed Product",
    body: [
      'Xenon Ophthalmics Inc may, at its discretion, loan to and deposit on consignment with Customer several headsets (each, a "Headset") set forth in the purchase order for trial use during the Term, or alternatively sell the Customer the number of Headsets outlined in the Confirmation Document.',
      "Xenon Ophthalmics Inc grants Customer a non-exclusive, non-transferable license during the Term to access, use and operate Xenon Ophthalmics Inc's proprietary hosted software application and the proprietary software installed on the Headsets, together with all related documentation and updates (collectively, the \"Software\"), with the Headsets and any Incorporated Third-Party Software (collectively, \"Products\") to evaluate and diagnose impairments in the visual field, refraction, visual alignment errors and other visual conditions or pathologies in patients.",
      'The licenses granted are limited to Customer\'s "Permitted Users" and "Permitted Sites." Customer shall not modify, disassemble, or reverse engineer any Headset; shall not rent, lease, resell, transfer, or otherwise make the Product available to any third party; and shall not remove or alter any proprietary rights notices, encumber the Product, or attempt to gain unauthorized access to the hosted Software.',
    ],
  },
  {
    id: "product-support",
    heading: "3. Product Support",
    body: [
      "Xenon Ophthalmics Inc shall provide Customer Permitted Users with training, technical support, and maintenance services for the hosted software and hardware following the Documentation.",
      "Customer will keep the Headsets in good condition and working order. Upon delivery, Customer assumes and will bear the risk of all loss or damage to the Headsets, and shall promptly provide Xenon Ophthalmics Inc with written notice of any loss or damage.",
      "Customer shall notify Xenon Ophthalmics Inc in writing of any defect or malfunction within two (2) business days of discovery and, within five (5) business days, send the defective Headset to Xenon Ophthalmics Inc. Replacement shall be at no charge unless the defect is due to misuse, improper storage, unauthorized repairs, or normal wear and tear.",
    ],
  },
  {
    id: "security-risk",
    heading: "4. Security; Risk of Loss",
    body: [
      "The goods covered hereby shall be subject to a security interest of Seller until fully paid for in collected funds, and Buyer agrees until such full payment is made that Seller may take all action necessary to perfect that security interest, including the filing of financing statements.",
      "The risk of loss of the goods shall pass to Buyer upon delivery to the carrier from the point of shipment. Claims for loss or damage in transit should be made promptly and directly to the carrier. Any claims for shortages or errors in shipment caused by packing error and not the carrier must be filed with Seller within 30 days of receipt of shipment.",
    ],
  },
  {
    id: "delivery",
    heading: "5. Delivery",
    body: [
      "All goods shall be shipped in a reasonable time f.o.b. Seller's origin. All shipment dates are approximate. Training and Installation dates are only included if referenced explicitly in Seller's quote or order acknowledgment.",
      "Seller shall not be liable for loss, damage, or delay resulting from causes beyond its reasonable control, including but not limited to inability to obtain necessary labor or materials, or breakdown of manufacturing facilities.",
      'Customer shall inspect the Headsets upon receipt. Customer will be deemed to have accepted the Headsets unless it notifies Xenon Ophthalmics Inc in writing of any Nonconforming Headsets within five (5) business days following receipt. "Nonconforming Headsets" means the product shipped is different than identified in the Confirmation Document or that the packaging incorrectly identifies its contents.',
    ],
  },
  {
    id: "pricing-payment",
    heading: "6. Pricing; Payment; Price Changes",
    body: [
      "Terms of payment are net 30 days from the date of invoice unless otherwise agreed by the parties in writing. Goods shall be invoiced as shipments are made.",
      "All payments of fees shall be made in U.S. Dollars by credit card, ACH transfer, or wire transfer. Simple interest shall accrue on unpaid sums at 2% over the then-prime rate quoted SOFR, or the maximum rate allowable by Applicable Law, whichever is lower.",
      "Customer shall reimburse Xenon Ophthalmics Inc for all reasonable costs incurred in collecting late payments or interest, including attorneys' fees, court costs, and collection agency fees. If disputed, Customer shall pay undisputed portions and the parties shall promptly initiate dispute resolution.",
    ],
  },
  {
    id: "taxes",
    heading: "7. Taxes",
    body: [
      "Taxes arising from the activities conducted under this Agreement shall be borne and paid by the Party upon whom such tax is imposed by Applicable Law. Prices quoted do not include any state or local property, sales, use, or privilege taxes, or any export or import duties.",
      "Xenon Ophthalmics Inc may increase fees by providing written notice to Customer at least ninety (90) days before the price increase, specifying the fees adjusted and the scope of the adjustment.",
    ],
  },
  {
    id: "ip",
    heading: "8. Intellectual Property Rights, Patents, Trademarks",
    body: [
      "No right to any trademark, trade name, patent, license, approval, or copyrighted material is granted to Buyer by Seller except as noted on the face of Seller's quote or order acknowledgment. Seller makes no representation or warranty that the goods sold hereunder do not infringe the Intellectual Property Rights of third parties.",
      "Xenon Ophthalmics Inc owns all Intellectual Property Rights in and to the Product and its components (including the Software). All right, title and ownership of Customer Data is and shall remain solely and exclusively vested in Customer, including all Intellectual Property Rights relating thereto.",
      "Customer grants Xenon Ophthalmics Inc a limited, non-exclusive, non-transferable, sublicensable, worldwide, royalty-free license to use Customer Data in connection with providing the Product during the Term.",
    ],
  },
  {
    id: "confidentiality",
    heading: "9. Confidentiality",
    body: [
      "Buyer acknowledges that technical information contained in plans, drawings, specifications, and other documents disclosed by Seller are the sole and exclusive property of Seller, and Buyer shall hold same in confidence.",
      "Each Party agrees that during the Term and for five (5) years thereafter, a Party receiving Confidential Information shall maintain it in confidence using not less than the efforts it uses to maintain its own confidential information, and shall not disclose it to any third party without the prior written consent of the Disclosing Party.",
      "Obligations of confidentiality do not apply to Confidential Information that is or becomes publicly known through no fault of the Receiving Party, was already known to the Receiving Party before disclosure, is independently developed, or is disclosed under a court order with reasonable advance notice.",
    ],
  },
  {
    id: "data-security",
    heading: "10. Data Security; Protected Health Information",
    body: [
      "During the Term, Xenon Ophthalmics Inc shall maintain administrative, physical, and technical safeguards that reasonably and appropriately protect the confidentiality, integrity, and availability of Customer Data.",
      "Xenon Ophthalmics Inc shall maintain complete and accurate records relating to its data protection practices and, upon Customer's request, make such records and appropriate personnel available during regular business hours for inspection and audit, subject to reasonable notice and scheduling constraints.",
      'Xenon Ophthalmics Inc agrees to execute and abide by Customer\'s Standard Business Associate Agreement ("SBA") where applicable. Nothing in this Agreement limits or modifies Xenon Ophthalmics Inc\'s obligations under the SBA.',
    ],
  },
  {
    id: "compliance",
    heading: "11. Compliance; Standards",
    body: [
      "Xenon Ophthalmics Inc agrees to comply with 42 U.S.C. §1320a-7b(b)(3)(A) and the safe harbor regulations regarding discounts or other reductions in price set forth at 42 C.F.R. §1001.952(h).",
      "Xenon Ophthalmics Inc represents and warrants that neither it nor its directors, officers, and employees involved in the direct provision of healthcare services reimbursable under Medicare or Medicaid are excluded, debarred, or otherwise ineligible to participate in the Federal Health Care Programs as defined in 42 U.S.C.A. §1320a-7b(f).",
      "Each Party shall be responsible for tracking and reporting transfers of value pursuant to the requirements of applicable transparency laws, including Section 6002 of the Patient Protection and Affordable Care Act (commonly referred to as the \"Sunshine Act\").",
    ],
  },
  {
    id: "warranties",
    heading: "12. Representations and Warranties",
    body: [
      "Seller warrants to Buyer that upon shipment, the goods shall be as described herein and shall be free of defects in workmanship and materials. This warranty shall extend for two years and be subject to any additional terms and limitations contained in the separate warranty policy that accompanies the goods.",
      "EXCEPT AS EXPRESSLY SET FORTH HEREIN, THERE ARE NO WARRANTIES OR REPRESENTATIONS, EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION AS TO MERCHANTABILITY OR FITNESS FOR PARTICULAR PURPOSE WITH RESPECT TO ANY GOODS SOLD HEREUNDER.",
      "Xenon Ophthalmics Inc has received clearance from the U.S. Food and Drug Administration (FDA) to commercially distribute, sell or market the Product in the U.S. based on a determination by the FDA of substantial equivalence within the meaning of 21 C.F.R. § 807.100.",
    ],
  },
  {
    id: "liability",
    heading: "13. Limitation of Liability",
    body: [
      "Seller shall, at its election and expense, repair or replace any goods or part which does not comply with the foregoing warranties, provided such goods were used properly and in accordance with directions for use.",
      "IN NO EVENT SHALL SELLER'S LIABILITY EXCEED THE PURCHASE PRICE FOR THE GOODS. SELLER SHALL UNDER NO CIRCUMSTANCES BE LIABLE TO BUYER FOR CONSEQUENTIAL, INCIDENTAL, SPECIAL, OR INDIRECT DAMAGES ARISING OUT OF THIS TRANSACTION OR THE USE OR MISUSE OF THE GOODS, WHETHER BASED UPON BREACH OF WARRANTY, CONTRACT, NEGLIGENCE, OR ANY OTHER LEGAL THEORY.",
    ],
  },
  {
    id: "term",
    heading: "14. Term and Termination",
    body: [
      "The term of this Agreement shall commence on the Effective Date set forth in the Confirmation Document and, unless earlier terminated as provided herein, expire on the second anniversary of the Effective Date.",
      "Either Party may terminate this Agreement upon at least thirty (30) days prior written notice upon breach of this Agreement by the other Party, unless the Party in breach cures the breach within such 30-day period. Customer may terminate this Agreement without cause upon at least ninety (90) days prior written notice.",
      "Promptly following termination, Xenon Ophthalmics Inc shall, if requested, provide Customer a copy of all Customer Data; Customer shall return the Product (excluding purchased Headsets); and each Receiving Party shall return or certify destruction of Confidential Information.",
    ],
  },
  {
    id: "misc",
    heading: "15. Miscellaneous",
    body: [
      "Dispute Resolution: If Xenon Ophthalmics Inc or Customer desires to institute legal proceedings, that Party shall provide written notice and refrain from instituting proceedings for thirty (30) days, during which the Parties shall attempt in good faith to amicably resolve their dispute by negotiation.",
      "Governing Law: The transactions between Seller and Buyer shall be governed by the laws of the State of New York without regard to conflicts of laws principles. EACH PARTY WAIVES ANY RIGHT TO A JURY TRIAL IN ANY DISPUTE RELATING TO THIS AGREEMENT.",
      "Tribunal: Seller may elect to have submitted to binding arbitration pursuant to the rules of the American Arbitration Association any disputes with Buyer. Exclusive venue for any arbitration or litigation relating hereto shall be in Nassau County, New York.",
      "FDA: Xenon Ophthalmics Inc is officially Establishment Registered & Device Listed on the FDA website.",
    ],
  },
];

export default function TermsOfService() {
  usePageMeta({
    title: "Terms & Conditions",
    description:
      "Xenon Ophthalmics Inc. Terms and Conditions of Sale. Each Sale, Quote, or Proposal by Xenon Ophthalmics Inc. is subject to these Terms.",
  });

  return (
    <>
      {/* Hero */}
      <section className="grain relative flex min-h-[50vh] items-end overflow-hidden bg-bg pb-16 pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
        <div className="xo-container relative">
          <div className="eyebrow mb-8">Legal · Terms</div>
          <MaskText
            lines={["Terms & Conditions"]}
            as="span"
            className="font-display text-5xl font-medium leading-[0.97] tracking-tight text-fg sm:text-6xl lg:text-7xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-fg/60">
              Each Sale, Quote, or Proposal by Xenon Ophthalmics Inc. is subject
              to the following Terms and Conditions. The following terms and
              conditions shall apply to all sales of goods to any purchaser
              ("Buyer") from Xenon Ophthalmics Inc. ("Seller").
            </p>
          </Reveal>
          <div className="mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-fg/40">
            Last updated: February 2023
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="border-t border-fg/10 bg-bg py-20 md:py-28">
        <div className="xo-container grid gap-16 md:grid-cols-12">
          <aside className="hidden md:col-span-3 md:block">
            <div className="sticky top-32">
              <div className="eyebrow mb-4">Sections</div>
              <ul className="space-y-3 text-[13px] text-fg/50">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="hover:text-xo-blue">
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <article className="md:col-span-9">
            <div className="space-y-14">
              {SECTIONS.map((section) => (
                <div key={section.id} id={section.id} className="scroll-mt-32">
                  <h2 className="mb-6 font-display text-2xl font-medium text-fg md:text-3xl">
                    {section.heading}
                  </h2>
                  <div className="space-y-5">
                    {section.body.map((p, i) => (
                      <p key={i} className="text-[15.5px] leading-relaxed text-fg/70">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 rounded-md border border-fg/10 bg-surface/60 p-8">
              <div className="eyebrow mb-3">Questions</div>
              <p className="text-[15px] leading-relaxed text-fg/60">
                For questions about these Terms, contact us at{" "}
                <a
                  href="mailto:info@xophthalmics.com"
                  className="text-xo-blue underline-offset-4 hover:underline"
                >
                  info@xophthalmics.com
                </a>
                .
              </p>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
