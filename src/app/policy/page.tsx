const PolicyPage: React.FC = () => {
  return (
    <div>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4">
          This Privacy Policy explains how we use the data we collect from you
          when you use our bot and website.
        </p>
        <h2 className="text-2xl font-semibold mb-4">
          What data do we collect?
        </h2>
        <p className="mb-4">Our bot collects the following data:</p>
        <ul className="list-disc list-inside mb-4">
          <li>Discord user ID and username</li>
          <li>User avatar</li>
          <li>Server ID and server name</li>
          <li>Roles assigned to the user on the server</li>
          <li>Data on voice channel activity</li>
          <li>Server logs related to interactions with the bot</li>
          <li>Activities from events you participate in</li>
        </ul>
        <h2 className="text-2xl font-semibold mb-4">
          How do we collect your data?
        </h2>
        <p className="mb-4">Your data is collected in the following ways:</p>
        <ul className="list-disc list-inside mb-4">
          <li>Automatically, when you use voice channels on the server</li>
          <li>
            When you create events or respond to events and surveys created by
            the bot
          </li>
          <li>
            When a user with appropriate permissions manually assigns you to an
            event
          </li>
          <li>
            When browsing external resources related to the server (e.g., server
            logs)
          </li>
        </ul>
        <h2 className="text-2xl font-semibold mb-4">
          How do we use your data?
        </h2>
        <p className="mb-4">
          The collected data is used in the following ways:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>To display user activity on voice channels</li>
          <li>
            To create lists of event participants and record activity from these
            events
          </li>
          <li>To monitor and manage user activities on the server</li>
        </ul>
        <h2 className="text-2xl font-semibold mb-4">
          How do we store your data?
        </h2>
        <p className="mb-4">
          Your data is stored in an encrypted and password-protected database.
          The security of your data is our priority, but we want to emphasize
          that no method of data transmission over the Internet or electronic
          data storage is completely secure. While we use commercially
          acceptable means to protect your personal data, we cannot guarantee
          its absolute security.
        </p>
        <h2 className="text-2xl font-semibold mb-4">
          What are your data protection rights?
        </h2>
        <p className="mb-4">Every user has the following rights:</p>
        <ul className="list-disc list-inside mb-4">
          <li>
            The right to access – You have the right to request copies of your
            personal data.
          </li>
          <li>
            The right to rectification – You have the right to request
            correction of your data if it is incorrect or incomplete.
          </li>
          <li>
            The right to erasure – You have the right to request the deletion of
            your personal data, under certain conditions.
          </li>
          <li>
            The right to restrict processing – You have the right to request the
            restriction of processing your personal data.
          </li>
          <li>
            The right to object – You have the right to object to the processing
            of your personal data.
          </li>
          <li>
            The right to data portability – You have the right to request a copy
            of your data in a structured, machine-readable format.
          </li>
        </ul>
        <p className="mb-4">
          Please note that we may ask you to verify your identity before
          responding to such requests. You also have the right to file a
          complaint with a data protection authority regarding our processing of
          your personal data.
        </p>
        <h2 className="text-2xl font-semibold mb-4">
          Changes to our privacy policy
        </h2>
        <p className="mb-4">
          We regularly review our privacy policy and publish any updates on our
          website. This privacy policy was last updated on August 22, 2024.
        </p>
      </div>
    </div>
  );
};
export default PolicyPage;
