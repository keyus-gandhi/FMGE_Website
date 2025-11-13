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
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              Introduction
            </h2>
            <p className="text-muted-foreground mb-4">
              MedExam ("Company", "we", "our", or "us") operates the MedExam website and mobile application (the "Service"). We are committed to protecting your privacy. This Privacy Policy explains our data practices and your rights regarding information we collect from you.
            </p>
            <p className="text-muted-foreground">
              This Privacy Policy applies to our website, mobile applications, and all related services. By accessing or using MedExam, you agree to the terms of this Privacy Policy.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              Information We Collect
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  Personal Information
                </h3>
                <p className="text-muted-foreground mb-3">
                  When you create an account or use our services, we collect:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
                  <li>Name, email address, and phone number</li>
                  <li>Medical credentials and examination history</li>
                  <li>Payment information (processed securely through third parties)</li>
                  <li>Study progress, test scores, and learning preferences</li>
                  <li>Profile information and preferences you provide</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  Usage Information
                </h3>
                <p className="text-muted-foreground mb-3">
                  We automatically collect certain information about your device and usage:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
                  <li>Device type, operating system, and unique identifiers</li>
                  <li>IP address and approximate location</li>
                  <li>Pages visited, time spent, and interaction patterns</li>
                  <li>Browser type and referring/exit pages</li>
                  <li>Search queries and features used</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  Cookies and Tracking Technologies
                </h3>
                <p className="text-muted-foreground">
                  We use cookies, web beacons, and similar technologies to track your preferences and improve your experience. You can control cookie settings through your browser preferences.
                </p>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              How We Use Your Information
            </h2>
            <p className="text-muted-foreground mb-4">
              We use collected information to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Personalize your learning experience</li>
              <li>Process transactions and send related information</li>
              <li>Send promotional emails and updates (with your consent)</li>
              <li>Respond to your inquiries and support requests</li>
              <li>Analyze usage patterns to improve our platform</li>
              <li>Detect, prevent, and address fraud or security issues</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              Data Security
            </h2>
            <p className="text-muted-foreground mb-4">
              We implement comprehensive security measures to protect your personal information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>SSL/TLS encryption for data transmission</li>
              <li>Secure password storage using industry-standard hashing</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Limited access to personal information by authorized personnel only</li>
              <li>Firewalls and intrusion detection systems</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              While we strive to protect your information, no method of transmission over the internet is completely secure. We cannot guarantee absolute security of your data.
            </p>
          </section>

          {/* Sharing Your Information */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              Sharing Your Information
            </h2>
            <p className="text-muted-foreground mb-4">
              We do not sell or rent your personal information to third parties. We may share information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>With payment processors for transaction processing</li>
              <li>With hosting providers and service partners</li>
              <li>With analytics providers to understand usage patterns</li>
              <li>With law enforcement when required by law</li>
              <li>With your consent for specific purposes</li>
            </ul>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              Your Privacy Rights
            </h2>
            <p className="text-muted-foreground mb-4">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>Right to access your personal information</li>
              <li>Right to correct or update inaccurate data</li>
              <li>Right to delete your personal information</li>
              <li>Right to restrict processing of your data</li>
              <li>Right to data portability</li>
              <li>Right to opt-out of marketing communications</li>
              <li>Right to withdraw consent at any time</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              To exercise any of these rights, please contact us at privacy@medexam.com with your request.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              Data Retention
            </h2>
            <p className="text-muted-foreground">
              We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. You can request deletion of your account and associated data at any time by contacting our support team. Some information may be retained for legal compliance or legitimate business purposes.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              Children's Privacy
            </h2>
            <p className="text-muted-foreground">
              Our services are intended for users 18 years of age or older. We do not knowingly collect personal information from children under 18. If we discover that we have collected information from a child under 18, we will delete it promptly. If you believe we have collected information from a minor, please contact us immediately.
            </p>
          </section>

          {/* Third-Party Links */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              Third-Party Links
            </h2>
            <p className="text-muted-foreground">
              Our website and application may contain links to third-party websites. This Privacy Policy applies only to MedExam. We are not responsible for the privacy practices of external websites. Please review the privacy policies of any third-party sites before providing personal information.
            </p>
          </section>

          {/* California Privacy Rights */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              California Privacy Rights
            </h2>
            <p className="text-muted-foreground mb-3">
              If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>Right to know what personal information is collected</li>
              <li>Right to delete personal information collected</li>
              <li>Right to opt-out of the sale or sharing of personal information</li>
              <li>Right to non-discrimination for exercising your CCPA rights</li>
            </ul>
          </section>

          {/* Changes to This Policy */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              Changes to This Privacy Policy
            </h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the updated policy on our website and updating the "Last updated" date. Your continued use of our services after changes indicates your acceptance of the updated Privacy Policy.
            </p>
          </section>

          {/* Contact Us */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              Contact Us
            </h2>
            <p className="text-muted-foreground mb-4">
              If you have questions or concerns about this Privacy Policy, please contact us at:
            </p>
            <div className="bg-muted p-6 rounded-lg">
              <p className="text-foreground font-semibold">MedExam Privacy Team</p>
              <p className="text-muted-foreground">Email: privacy@medexam.com</p>
              <p className="text-muted-foreground">Address: 123 Medical Center, Health City, HC 12345</p>
              <p className="text-muted-foreground">Phone: +1 (555) 123-4567</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
