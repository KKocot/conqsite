const PolicyPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        This Privacy Policy explains how we use the data we collect from you
        while you use our bot and website.
      </p>
      <h2 className="text-2xl font-semibold mb-4">What data do we collect?</h2>
      <p className="mb-4">Our bot collects the following data:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Discord user ID and username</li>
        <li>User avatar</li>
        <li>Server ID and server name</li>
        <li>Roles assigned to the user on the server</li>
        <li>Data regarding activity on voice channels</li>
        <li>Activity from events you participate in</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-4">
        How do we collect your data?
      </h2>
      <p className="mb-4">Your data is collected in the following ways:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Automatically when you use servers that host the bot</li>
        <li>
          When you create events or respond to events and polls created by the
          bot
        </li>
        <li>
          When a user with the necessary permissions manually adds you to an
          event
        </li>
      </ul>
      <h2 className="text-2xl font-semibold mb-4">How do we use your data?</h2>
      <p className="mb-4">The collected data is used in the following ways:</p>
      <ul className="list-disc list-inside mb-4">
        <li>To display user activity on voice channels</li>
        <li>
          To create participant lists for events and record activities from
          those events
        </li>
        <li>To monitor and manage user activities on the server</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-4">
        How do we store your data?
      </h2>
      <p className="mb-4">
        Your data is stored in an encrypted and password-protected database. The
        security of your data is a priority for us; however, we would like to
        point out that no method of data transmission over the Internet or
        method of electronic storage is completely secure. While we use
        commercially acceptable means to protect your personal data, we cannot
        guarantee its absolute security.
      </p>
      <h2 className="text-2xl font-semibold mb-4">
        What are your data protection rights?
      </h2>
      <p className="mb-4">Every user is entitled to the following rights:</p>
      <ul className="list-disc list-inside mb-4">
        <li>
          The right to access – You have the right to request copies of your
          personal data.
        </li>
        <li>
          The right to rectification – You have the right to request that your
          information be corrected if it is inaccurate or incomplete.
        </li>
        <li>
          The right to erasure – You have the right to request that we erase
          your personal data, under certain conditions.
        </li>
        <li>
          The right to restrict processing – You have the right to request that
          we restrict the processing of your personal information.
        </li>
        <li>
          The right to object – You have the right to object to our processing
          of your personal data.
        </li>
        <li>
          The right to data portability – You have the right to be provided with
          a copy of your data in a structured, machine-readable format.
        </li>
      </ul>
      <p className="mb-4">
        Please note that we may ask you to verify your identity before
        responding to such requests. You also have the right to lodge a
        complaint with a Data Protection Authority regarding our collection and
        use of your personal data.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Contact</h2>
      <p className="mb-4">
        If you have any questions about this privacy policy or wish to make a
        request regarding your personal data, please contact us via:
      </p>
      <p className="mb-4">
        <strong>Discord</strong>:{" "}
        <a href="https://discord.gg/PM5vvAUmkj" className="text-blue-500">
          https://discord.gg/PM5vvAUmkj
        </a>
      </p>
      <h2 className="text-2xl font-semibold mb-4">
        Changes to our privacy policy
      </h2>
      <p className="mb-4">
        We regularly review our privacy policy and place any updates on our
        website. This privacy policy was last updated on August 22, 2024.
      </p>
    </div>
  );
};

export default PolicyPage;
