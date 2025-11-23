import { useEffect } from "react";

export default function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background py-12 md:py-20">
      <div className="container px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Terms & Conditions
        </h1>
        <p className="text-muted-foreground mb-12">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-12">
          {/* Introduction */}
          <section>
            <p className="text-muted-foreground leading-relaxed">
              These Terms & Conditions (“Terms”) constitute a legally binding
              agreement between Aspira Edge (“Company”, “we”, “us”, “our”) and
              the user (“you”, “your”). By downloading, installing, registering,
              accessing, or using the Aspira Edge mobile application, website,
              or related services, you acknowledge that you have read,
              understood, and agree to be bound by these Terms.
            </p>
            <p className="text-muted-foreground mt-4 font-medium">
              If you do not agree with these Terms, you must not use the App or
              any of its services.
            </p>
          </section>

          {/* 1. Account, Subscription & Access Rights */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              1. Account, Subscription & Access Rights
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                <span className="font-semibold text-foreground">1.1</span> A valid Aspira Edge
                account and an active paid subscription are mandatory to access
                Premium Content including but not limited to LMR 3.0, PYQs,
                Book, videos, notes, and associated materials.
              </p>
              <p>
                <span className="font-semibold text-foreground">1.2</span> Access to the Book and
                certain Premium Content is strictly limited until the date of
                the next officially scheduled FMGE examination. Access expires
                automatically without refund.
              </p>
              <p>
                <span className="font-semibold text-foreground">1.3</span> All subscription
                charges, once activated, are non-refundable, except in cases of
                verified payment failure or duplicate transactions, subject to
                our discretion.
              </p>
              <p>
                <span className="font-semibold text-foreground">1.4</span> Account sharing is
                strictly prohibited. Each account is licensed to a single
                individual.
              </p>
              <p>
                <span className="font-semibold text-foreground">1.5</span> The Company reserves
                the right to deny access, suspend, or terminate accounts that
                violate these Terms.
              </p>
            </div>
          </section>

          {/* 2. Mandatory Rule for iOS Users */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              2. Mandatory Rule for iOS Users (Book Purchase Requirement)
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                <span className="font-semibold text-foreground">2.1</span> Due to platform
                restrictions and regulatory guidelines applicable to digital
                goods on iOS, iOS users must purchase specific content
                (including the Book or any restricted digital publication)
                solely through the Aspira Edge Book Purchase Portal (“Portal”).
              </p>
              <div className="pl-0 md:pl-4 bg-muted/30 p-4 rounded-lg">
                <span className="font-semibold text-foreground block mb-3">
                  2.2 The purchase process for iOS users is as follows:
                </span>
                <ul className="space-y-2 ml-2">
                  <li>
                    <strong>Step 1:</strong> Download the Aspira Edge app from
                    the Apple App Store.
                  </li>
                  <li>
                    <strong>Step 2:</strong> Sign up inside the app and create
                    an Aspira Edge account.
                  </li>
                  <li>
                    <strong>Step 3:</strong> Visit the dedicated Book Purchase
                    Portal.
                  </li>
                  <li>
                    <strong>Step 4:</strong> Log in using the same registered
                    Aspira Edge User ID and Password.
                  </li>
                  <li>
                    <strong>Step 5:</strong> Purchase the required digital book
                    (e.g., Book) from the Portal.
                  </li>
                  <li>
                    <strong>Step 6:</strong> Access to the purchased book will
                    automatically sync to your Aspira Edge account.
                  </li>
                </ul>
              </div>
              <p>
                <span className="font-semibold text-foreground">2.3</span> Failure to use the
                same User ID on the Portal and the app may result in denied
                access, for which the Company is not responsible.
              </p>
              <p>
                <span className="font-semibold text-foreground">2.4</span> All digital books
                purchased by iOS users are accessible only until the next FMGE
                exam, after which access automatically expires.
              </p>
            </div>
          </section>

          {/* 3. Intellectual Property Rights */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              3. Intellectual Property Rights (Strict Enforcement)
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                <span className="font-semibold text-foreground">3.1</span> All content provided
                through Aspira Edge—including videos, notes, PDFs, LMR 3.0,
                Book, PYQs, text, images, layout, UI/UX, proprietary code,
                animations, audio, and materials—is the exclusive intellectual
                property of Aspira Edge.
              </p>
              <div>
                <span className="font-semibold text-foreground block mb-2">
                  3.2 You are strictly forbidden from:
                </span>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-4 list-disc">
                  <li>Copying</li>
                  <li>Downloading</li>
                  <li>Recording</li>
                  <li>Reproducing</li>
                  <li>Screenshotting or screen-recording</li>
                  <li>Distributing</li>
                  <li>Sharing</li>
                  <li>Mirroring</li>
                  <li>Publishing or re-uploading</li>
                  <li>Creating derivative works</li>
                  <li>Attempting to circumvent DRM or protective measures</li>
                </ul>
              </div>
              <p>
                <span className="font-semibold text-foreground">3.3</span> Any attempt to
                perform any of the above actions constitutes copyright
                infringement, breach of contract, and a violation of Indian
                cyber laws.
              </p>
              <div>
                <span className="font-semibold text-foreground block mb-2">
                  3.4 Violations will result in:
                </span>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Permanent account termination</li>
                  <li>Cancellation of subscription without refund</li>
                  <li>Civil and/or criminal legal action</li>
                  <li>
                    Claims for damages under the Copyright Act, Information
                    Technology Act, and other applicable laws
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 4. Device Usage Restrictions */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              4. Device Usage Restrictions
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                <span className="font-semibold text-foreground">4.1</span> Your subscription is
                valid on a maximum of two devices.
              </p>
              <p>
                <span className="font-semibold text-foreground">4.2</span> Only one device may
                be used at a time. Concurrent login attempts are prohibited.
              </p>
              <p>
                <span className="font-semibold text-foreground">4.3</span> Frequent device
                switching or suspicious login behaviour will trigger automated
                security locks or account suspension.
              </p>
            </div>
          </section>

          {/* 5. Fair Use, Security & Compliance Policy */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              5. Fair Use, Security & Compliance Policy
            </h2>
            <p className="text-muted-foreground mb-4">You agree NOT to:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>Use VPN, proxy, or location-hiding tools</li>
              <li>
                Use emulators, screen mirroring, casting, or virtualization
                technology
              </li>
              <li>Reverse-engineer, decompile, modify, or tamper with the app</li>
              <li>Bypass, remove, or interfere with DRM or encryption</li>
              <li>Share login credentials</li>
              <li>Attempt unauthorized access to servers or systems</li>
            </ul>
            <p className="text-muted-foreground mt-4 font-semibold text-red-500/80">
              Any breach leads to immediate account termination without refund.
            </p>
          </section>

          {/* 6. Prohibited Conduct */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              6. Prohibited Conduct
            </h2>
            <p className="text-muted-foreground mb-4">
              You may not use Aspira Edge for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>
                Commercial, institutional, or unauthorized educational use
              </li>
              <li>Publishing or spreading pirated content</li>
              <li>Uploading viruses, malware, spyware, or harmful code</li>
              <li>Circumventing payment gateways</li>
              <li>Any unlawful or non-permitted activity under Indian law</li>
            </ul>
          </section>

          {/* 7. Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              7. Limitation of Liability
            </h2>
            <p className="text-muted-foreground mb-4">
              Aspira Edge shall not be liable for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>Internet or network failures</li>
              <li>Device malfunction, OS issues, or compatibility problems</li>
              <li>Loss of data on your device</li>
              <li>Failures arising from third-party services or systems</li>
            </ul>
            <p className="text-muted-foreground mt-4 italic">
              Your use of the App is entirely at your own risk.
            </p>
          </section>

          {/* 8. Refunds, Cancellations & Termination */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              8. Refunds, Cancellations & Termination
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                <span className="font-semibold text-foreground">8.1</span> No refunds will be
                issued once a subscription is activated.
              </p>
              <p>
                <span className="font-semibold text-foreground">8.2</span> Refunds for
                technical issues (e.g., duplicate payments) may be approved
                solely at our discretion.
              </p>
              <div>
                <span className="font-semibold text-foreground block mb-2">
                  8.3 We may suspend or terminate your account without prior
                  notice if:
                </span>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Fraudulent behaviour is detected</li>
                  <li>Piracy, recording, or content theft is identified</li>
                  <li>You violate the Terms or applicable laws</li>
                  <li>Security risks or misuse are found</li>
                </ul>
              </div>
              <p className="font-semibold text-foreground mt-2">
                No refunds will be provided for terminated accounts.
              </p>
            </div>
          </section>

          {/* 9. Governing Law & Jurisdiction */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              9. Governing Law & Jurisdiction
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>These Terms are governed by the laws of India.</p>
              <p>
                All disputes arising out of or related to these Terms shall be
                subject to the exclusive jurisdiction of the courts situated in
                <span className="font-semibold text-foreground">
                  {" "}
                  Kherwara, Udaipur, Rajasthan, India.
                </span>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}