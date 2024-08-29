const TosPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Terms of Service for Using the Bot and Website
      </h1>
      <h2 className="text-2xl font-semibold mb-4">1. General Provisions</h2>
      <p className="mb-4">
        These Terms of Service ("Terms") outline the rules and conditions for
        using the bot "Konqueruś" and website "cb-social". By using our
        services, the user fully accepts these Terms. If you do not agree with
        the conditions, you should not use our services.
      </p>
      <h2 className="text-2xl font-semibold mb-4">2. Services</h2>
      <p className="mb-4">The bot and website offer services such as:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Creating, managing, and participating in events</li>
        <li>Monitoring user activity on voice channels</li>
        <li>Analyzing server logs and recording activities during events</li>
      </ul>
      <p className="mb-4">
        The user acknowledges that our services may be changed or updated at any
        time without prior notice.
      </p>
      <h2 className="text-2xl font-semibold mb-4">3. Using the Bot</h2>
      <p className="mb-4">By using the bot, the user agrees to:</p>
      <ul className="list-disc list-inside mb-4">
        <li>
          Adhere to the rules and privacy policy of Discord and the rules of the
          servers where the bot is present
        </li>
        <li>
          Not use the bot for illegal, offensive, fraudulent, or harmful
          purposes to other users or servers
        </li>
        <li>
          Not attempt to disrupt the operation of the bot or use it in a manner
          inconsistent with its intended purpose
        </li>
      </ul>
      <p className="mb-4">
        We reserve the right to block access to the bot or its features if these
        Terms are violated.
      </p>
      <h2 className="text-2xl font-semibold mb-4">4. Accounts and Access</h2>
      <p className="mb-4">
        Using the bot requires an active Discord account. The user is
        responsible for maintaining the security of their account and for any
        actions taken while using our services. We are not responsible for any
        losses resulting from unauthorized access to your account.
      </p>
      <h2 className="text-2xl font-semibold mb-4">5. User Data</h2>
      <p className="mb-4">
        Details regarding the collection, processing, and storage of user data
        are described in our Privacy Policy. By using our services, the user
        agrees to the processing of their data in accordance with the Privacy
        Policy.
      </p>
      <h2 className="text-2xl font-semibold mb-4">
        6. Limitation of Liability
      </h2>
      <p className="mb-4">
        The services are provided "as is," without any warranties, either
        express or implied. A bot or website is not guaranteed to run smoothly,
        error-free or always available.
      </p>
      <p className="mb-4">We are not liable for any damages resulting from:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Improper functioning of the bot or website</li>
        <li>
          Loss of user data, including information related to server activities
        </li>
        <li>
          Any other losses or damages arising from the use of our services
        </li>
      </ul>
      <h2 className="text-2xl font-semibold mb-4">
        7. Copyright and Intellectual Property
      </h2>
      <p className="mb-4">
        All rights to the bot, the website and any content on it are the
        property of the creators or its licensors and are protected by copyright
        laws. The user does not have the right to copy, modify, distribute, or
        use this content without our explicit permission.
      </p>
      <h2 className="text-2xl font-semibold mb-4">8. Changes to the Terms</h2>
      <p className="mb-4">
        We reserve the right to make changes to these Terms at any time. Users
        will be notified of any changes via the website or a message on the
        server. Continued use of our services after the changes have been made
        constitutes acceptance of the new terms.
      </p>
      <h2 className="text-2xl font-semibold mb-4">9. Governing Law</h2>
      <p className="mb-4">
        These Terms are governed by the laws of Poland. Any disputes arising
        from the use of our services will be resolved by the courts of Poland.
      </p>
      <h2 className="text-2xl font-semibold mb-4">10. Contact</h2>
      <p className="mb-4">
        If you have any questions or concerns regarding these Terms, please
        contact us:
      </p>
      <p className="mb-4">
        <strong>Discord</strong>:{" "}
        <a href="https://discord.gg/PM5vvAUmkj" className="text-blue-500">
          https://discord.gg/PM5vvAUmkj
        </a>
      </p>
    </div>
  );
};
export default TosPage;
