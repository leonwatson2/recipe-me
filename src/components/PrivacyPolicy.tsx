export const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-black rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-white mb-4">Privacy Policy</h1>
      <p className="text-sm text-lbrown mb-6">
        Last updated:{" "}
        <span className="font-medium text-white"> August 16th, 2024</span>
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4">
        1. Introduction
      </h2>
      <p className="text-white leading-relaxed mb-6">
        We value your privacy and are committed to protecting your personal
        information. This Privacy Policy outlines how we collect, use, and
        safeguard the information you provide when using our service.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4">
        2. Information We Collect
      </h2>
      <p className="text-white leading-relaxed mb-6">
        When you log in to our service using Google Login, we collect your email
        address associated with your Google account. This information is
        essential for providing access to our services and improving your
        experience.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4">
        3. How We Use Your Information
      </h2>
      <p className="text-white leading-relaxed mb-4">
        The email address you provide through Google Login may be used for the
        following purposes:
      </p>
      <ul className="list-disc list-inside text-white mb-6">
        <li>To authenticate your access to our services.</li>
        <li>
          To communicate with you regarding updates, promotions, or changes to
          our services.
        </li>
        <li>
          To enhance your user experience by personalizing the services we
          offer.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-white mb-4">
        4. Tracking and Cookies
      </h2>
      <p className="text-white leading-relaxed mb-6">
        We may use cookies and similar tracking technologies to monitor your
        activity on our service. This data helps us analyze user behavior,
        improve our services, and provide a more tailored experience.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4">
        5. Sharing Your Information
      </h2>
      <p className="text-white leading-relaxed mb-6">
        We do not sell, trade, or otherwise transfer your personal information
        to outside parties, except when required by law or with your consent.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4">6. Security</h2>
      <p className="text-white leading-relaxed mb-6">
        We implement a variety of security measures to ensure the safety of your
        personal information. However, no method of transmission over the
        internet or electronic storage is 100% secure. Therefore, we cannot
        guarantee absolute security.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4">
        7. Your Consent
      </h2>
      <p className="text-white leading-relaxed mb-6">
        By using our service, you consent to our Privacy Policy.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4">
        8. Changes to This Privacy Policy
      </h2>
      <p className="text-white leading-relaxed mb-6">
        We may update this Privacy Policy from time to time. Any changes will be
        posted on this page, and the "Last updated" date will be revised
        accordingly.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4">9. Contact Us</h2>
      <p className="text-white leading-relaxed">
        If you have any questions or concerns regarding this Privacy Policy,
        please contact us at{" "}
        <span className="font-medium text-primary">
          <a href="mailto:recipe@recipes.vlw2.com">recipe@recipes.vlw2.com</a>
        </span>
        .
      </p>
    </div>
  );
};
