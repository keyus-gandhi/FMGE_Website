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
            <p className="text-muted-foreground">
              By downloading, accessing, or using Aspira Edge, you agree to the
              following Terms & Conditions.
            </p>
          </section>

          {/* Account & Subscription */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              1. Account & Subscription
            </h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>
                A valid account and active subscription are required to access
                Premium content including LMR 3.0, PYQs, and Buzz Book.
              </li>
              <li>Subscription fees are non-refundable.</li>
              <li>Sharing accounts with others is strictly prohibited.</li>
            </ul>
          </section>

          {/* Intellectual Property Rights */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              2. Intellectual Property Rights
            </h2>
            <p className="text-muted-foreground mb-4">
              All content on the app—including LMR 3.0, videos, notes, Buzz
              Book, PYQs, images, audio, written content, layout—is the
              exclusive property of Aspira Edge.
            </p>
            <p className="text-muted-foreground mb-4">
              You agree NOT to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>Copy</li>
              <li>Download</li>
              <li>Record</li>
              <li>Distribute</li>
              <li>Re-upload</li>
              <li>Reproduce</li>
              <li>Screenshot / screen-record</li>
              <li>Create derivative content</li>
            </ul>
            <p className="text-muted-foreground mt-4 mb-4">
              Any violation will result in:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>Permanent account ban</li>
              <li>Cancellation of subscription without refund</li>
              <li>Legal action under Copyright and IT laws</li>
            </ul>
          </section>

          {/* Device Usage Rules */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              3. Device Usage Rules
            </h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>Subscription can be used on maximum 2 devices.</li>
              <li>Only one device can be used at a time.</li>
              <li>Device switching is monitored for security.</li>
              <li>
                Suspicious activity may lead to immediate account suspension.
              </li>
            </ul>
          </section>

          {/* Fair Use Policy */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              4. Fair Use Policy
            </h2>
            <p className="text-muted-foreground mb-4">You must not:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>Use VPN to hide location</li>
              <li>Use emulator, screen-mirroring or casting</li>
              <li>Attempt to break DRM or security features</li>
              <li>Share login credentials</li>
              <li>Try to reverse-engineer the app</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Violation leads to account termination.
            </p>
          </section>

          {/* Prohibited Activities */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              5. Prohibited Activities
            </h2>
            <p className="text-muted-foreground mb-4">
              You cannot use the app for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>Commercial use</li>
              <li>Uploading malware</li>
              <li>Unauthorized access attempts</li>
              <li>Circumventing payment or access controls</li>
              <li>Spreading or downloading pirated content</li>
            </ul>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              6. Limitation of Liability
            </h2>
            <p className="text-muted-foreground mb-4">
              Aspira Edge is not responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>Network issues</li>
              <li>Device problems</li>
              <li>Data loss on your device</li>
              <li>Third-party system errors</li>
            </ul>
          </section>

          {/* Refund & Cancellation Policy */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              7. Refund & Cancellation Policy
            </h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>No refunds once the subscription is activated.</li>
              <li>
                Refunds may only be issued in case of payment failure or
                duplicate transactions (decision at our discretion).
              </li>
            </ul>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              8. Termination
            </h2>
            <p className="text-muted-foreground mb-4">
              We may suspend or terminate your account without notice if:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>Fraudulent activity is detected</li>
              <li>You violate T&C or privacy rules</li>
              <li>Piracy or misuse is found</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              No refunds will be issued for terminated accounts.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              9. Governing Law
            </h2>
            <p className="text-muted-foreground">
              All disputes will be subject to jurisdiction of Kherwara, Udaipur,
              Rajasthan courts, India.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}