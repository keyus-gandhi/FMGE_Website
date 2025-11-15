import { useEffect } from "react";

export default function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background py-12 md:py-20">
      <div className="container px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground mb-12">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-12">
          {/* Introduction */}
          <section>
            <p className="text-muted-foreground mb-4">
              Aspira Edge (“we”, “our”, “us”) operates the Aspira Edge mobile
              application and provides educational content including LMR 3.0,
              PYQs, Buzz Book, videos, notes, and related services (“Service”).
            </p>
            <p className="text-muted-foreground">
              Your privacy is extremely important to us. This Privacy Policy
              explains how we collect, use, protect, and share your information.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              1. Information We Collect
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  a. Personal Information
                </h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
                  <li>Name</li>
                  <li>Email ID</li>
                  <li>Phone number</li>
                  <li>
                    Payment details (processed securely through third-party
                    payment gateways; we do NOT store card/bank details)
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  b. Device & Technical Information
                </h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
                  <li>Device model, OS version</li>
                  <li>App usage data</li>
                  <li>IP address</li>
                  <li>
                    Device ID (used to enforce device limit and prevent misuse)
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  c. Interaction Data
                </h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
                  <li>Access logs</li>
                  <li>Login activity</li>
                  <li>Subscription status</li>
                  <li>
                    Security flags (screenshot attempts, screen-recording
                    attempts, unauthorized login attempts)
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>To create and manage your account</li>
              <li>To verify your device(s) and ensure security</li>
              <li>To process payments and subscriptions</li>
              <li>To improve app performance and content</li>
              <li>To prevent fraud, misuse, piracy, and unauthorized sharing</li>
              <li>
                To send important notifications such as updates, expiry alerts,
                or security warnings
              </li>
            </ul>
          </section>

          {/* Device Limit Policy */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              3. Device Limit Policy
            </h2>
            <p className="text-muted-foreground mb-4">
              To protect our intellectual property:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>Your subscription can be active on only 2 devices.</li>
              <li>Only 1 device can be used at a time.</li>
              <li>
                Repeated device-switching or suspicious login attempts may
                result in temporary suspension or permanent account blocking.
              </li>
            </ul>
          </section>

          {/* Anti-Piracy & Security Measures */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              4. Anti-Piracy & Security Measures
            </h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>Screenshots and screen recordings are NOT allowed.</li>
              <li>Warning messages will appear on attempts.</li>
              <li>Multiple warnings may result in account suspension.</li>
            </ul>
            <p className="text-muted-foreground mt-4 mb-4">
              Any unauthorized use, sharing, screen-recording, file
              extraction, republishing, or redistribution of content will lead
              to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>Immediate account termination</li>
              <li>Permanent blocking of access</li>
              <li>Legal action under applicable copyright laws</li>
            </ul>
          </section>

          {/* Sharing of Information */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              5. Sharing of Information
            </h2>
            <p className="text-muted-foreground mb-4">
              We do NOT sell your data.
            </p>
            <p className="text-muted-foreground mb-4">
              We only share information with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>
                Trusted service providers (payment gateways, analytics tools,
                notification services)
              </li>
              <li>Law enforcement if required by law</li>
              <li>Anti-piracy services for security monitoring</li>
            </ul>
          </section>

          {/* Data Protection */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              6. Data Protection
            </h2>
            <p className="text-muted-foreground mb-4">
              We use industry-standard encryption and security practices to
              protect your data from:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>Unauthorized access</li>
              <li>Data leaks</li>
              <li>Misuse or modification</li>
            </ul>
          </section>

          {/* Children’s Privacy */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              7. Children’s Privacy
            </h2>
            <p className="text-muted-foreground">
              Our app is not intended for users under 16. We do not knowingly
              collect data from minors.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              8. Your Rights
            </h2>
            <p className="text-muted-foreground mb-4">
              You can request:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>Correction of your data</li>
              <li>Account deletion</li>
              <li>Disabling one of your registered devices (with verification)</li>
            </ul>
          </section>

          {/* Changes to This Policy */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              9. Changes to This Policy
            </h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. Continued use
              of the app means you accept the updated policy.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}