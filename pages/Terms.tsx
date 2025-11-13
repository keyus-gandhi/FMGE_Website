import { useEffect } from "react";

export default function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background py-12 md:py-20">
      <div className="container px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
        <p className="text-muted-foreground mb-12">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-12">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              1. Agreement to Terms
            </h2>
            <p className="text-muted-foreground">
              By accessing and using MedExam website and mobile application (the "Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service. MedExam reserves the right to update these terms at any time without notice.
            </p>
          </section>

          {/* Use License */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              2. Use License
            </h2>
            <p className="text-muted-foreground mb-4">
              Permission is granted to temporarily download one copy of the materials (information or software) on MedExam for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>Modifying or copying the materials</li>
              <li>Using the materials for any commercial purpose or for any public display</li>
              <li>Attempting to decompile or reverse engineer any software contained on MedExam</li>
              <li>Removing any copyright or other proprietary notations from the materials</li>
              <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
              <li>Selling, licensing, or otherwise making available to any third party the materials</li>
            </ul>
          </section>

          {/* Account Registration */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              3. Account Registration
            </h2>
            <p className="text-muted-foreground mb-4">
              To use certain features of the Service, you may be required to register for an account. When registering, you agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain the confidentiality of your password and account information</li>
              <li>Be responsible for all activities that occur under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
              <li>Not create accounts for minors without appropriate parental consent</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              We reserve the right to suspend or terminate accounts that violate these terms.
            </p>
          </section>

          {/* User Content */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              4. User-Generated Content
            </h2>
            <p className="text-muted-foreground mb-4">
              By submitting content to MedExam (including comments, feedback, or questions), you grant us a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, modify, and distribute such content. You represent and warrant that:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>You own or have the right to submit the content</li>
              <li>The content does not infringe any third-party rights</li>
              <li>The content is not defamatory, obscene, or illegal</li>
            </ul>
          </section>

          {/* Subscription and Payments */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              5. Subscription and Payments
            </h2>
            <p className="text-muted-foreground mb-4">
              If you choose a paid subscription, you agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>Pay all fees and charges in accordance with our pricing</li>
              <li>Provide valid payment information and update it as necessary</li>
              <li>Subscriptions will auto-renew unless you cancel</li>
              <li>Cancellations must be made before the renewal date</li>
              <li>No refunds for partial months of service</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              We offer a 30-day money-back guarantee if you're not satisfied with our service. Contact support@medexam.com within 30 days of purchase for a full refund.
            </p>
          </section>

          {/* Acceptable Use */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              6. Acceptable Use Policy
            </h2>
            <p className="text-muted-foreground mb-4">
              You agree not to use MedExam in any manner that could:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon intellectual property rights</li>
              <li>Harass, abuse, or harm others</li>
              <li>Introduce viruses or malware</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with service functionality</li>
              <li>Engage in any form of cheating or fraudulent activity</li>
              <li>Share exam questions or answers publicly</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              7. Intellectual Property Rights
            </h2>
            <p className="text-muted-foreground mb-4">
              All content on MedExam, including text, graphics, logos, images, audio clips, and software, is the property of MedExam or its content suppliers and is protected by international copyright laws. You may not reproduce, modify, distribute, or display this content without our written permission.
            </p>
            <p className="text-muted-foreground">
              Unauthorized use of the content may violate copyright, trademark, and other laws. We reserve the right to pursue legal action against infringement.
            </p>
          </section>

          {/* Exam Integrity */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              8. Exam and Study Integrity
            </h2>
            <p className="text-muted-foreground mb-4">
              You agree that:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>You will not share exam questions or answers with others</li>
              <li>You will not use our service to prepare for fraudulent or unauthorized exams</li>
              <li>You will not allow others to take exams on your behalf</li>
              <li>All study and practice is for personal educational use only</li>
              <li>Violation of exam integrity may result in account termination</li>
            </ul>
          </section>

          {/* Disclaimers */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              9. Disclaimers
            </h2>
            <p className="text-muted-foreground mb-4">
              The materials on MedExam are provided on an 'as is' basis. MedExam makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            <p className="text-muted-foreground">
              We do not guarantee that our service will be uninterrupted or error-free. While we strive to provide accurate information, we cannot guarantee the accuracy of all content. Passing our practice exams does not guarantee success on the actual FMG exam.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              10. Limitation of Liability
            </h2>
            <p className="text-muted-foreground">
              In no event shall MedExam or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on MedExam, even if MedExam or an authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              11. Termination
            </h2>
            <p className="text-muted-foreground">
              MedExam may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason whatsoever, including if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
            </p>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              12. Indemnification
            </h2>
            <p className="text-muted-foreground">
              You agree to indemnify and hold harmless MedExam and its officers, directors, employees, agents, and successors from any claim, damage, loss, or expense (including attorney's fees) arising out of your use of the Service or violation of these Terms.
            </p>
          </section>

          {/* Medical Disclaimer */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              13. Medical Disclaimer
            </h2>
            <p className="text-muted-foreground mb-4">
              The information provided on MedExam is for educational purposes only and should not be considered as medical advice. It is not intended to replace professional medical consultation. Users should:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>Always consult with qualified medical professionals for health concerns</li>
              <li>Not use this platform as a substitute for professional medical services</li>
              <li>Understand that exam preparation materials may not reflect current clinical practice</li>
            </ul>
          </section>

          {/* Modifications */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              14. Modifications to Terms
            </h2>
            <p className="text-muted-foreground">
              MedExam may revise these terms of service for its Service at any time without notice. By using this Service, you are agreeing to be bound by the then current version of these terms of service. If you do not agree with our terms, please do not use the Service.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              15. Governing Law
            </h2>
            <p className="text-muted-foreground">
              These Terms of Service are governed by and construed in accordance with the laws of the United States, and you irrevocably submit to the exclusive jurisdiction of the state and federal courts located in this State.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              16. Contact Information
            </h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <div className="bg-muted p-6 rounded-lg">
              <p className="text-foreground font-semibold">MedExam Legal Team</p>
              <p className="text-muted-foreground">Email: legal@medexam.com</p>
              <p className="text-muted-foreground">Address: 123 Medical Center, Health City, HC 12345</p>
              <p className="text-muted-foreground">Phone: +1 (555) 123-4567</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
