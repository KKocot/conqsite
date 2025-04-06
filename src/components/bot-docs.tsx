const BotDocs = () => {
  return (
    <div className="font-sans pt-4">
      <h1 className="text-xl font-bold">Konqueruś Bot User Guide</h1>

      <details className="rounded-xl p-6 mb-4">
        <summary className="font-semibold text-lg cursor-pointer">
          Events
        </summary>
        <div className="mt-4 space-y-4">
          <p>
            Our event bot is synced with the ConqSite website, allowing you to
            create events on different channels. Tagged members are
            automatically sent to the{" "}
            <strong className="font-semibold text-indigo-600 dark:text-indigo-400">
              Team Builder
            </strong>
            . It allows pinging members who are not tagged or marked as
            tentative. This is the first version and will continue to be
            improved, e.g., adding tentative members to the Team Builder or
            stats on participation.
          </p>
          <p>
            To create a list, click the ➕ button in the bottom-right corner of
            the screen. Then choose the event&apos;s date and time (the event
            will be sent immediately to the channel). There are 3 options for
            repeating the event:
          </p>
          <div className="flex flex-col md:flex-row items-start gap-6">
            <img
              src="https://i.imgur.com/pIFkyd2.png"
              alt="Example of creating an event"
              className="w-64 rounded-lg"
            />
            <ul className="list-disc pl-5 pt-4">
              <li>
                <strong className="font-semibold text-indigo-600 dark:text-indigo-400">
                  TW Event
                </strong>{" "}
                – automatically creates an event on each Territory War day
              </li>
              <li>
                <strong className="font-semibold text-indigo-600 dark:text-indigo-400">
                  Never
                </strong>{" "}
                – one-time event, will not repeat
              </li>
              <li>
                <strong className="font-semibold text-indigo-600 dark:text-indigo-400">
                  Custom
                </strong>{" "}
                – repeats every defined number of days
              </li>
            </ul>
          </div>
          <p>Finally, select the channel where you want to create the event.</p>
          <p>
            In the advanced options, you can change the title, description,
            duration (after which a new one will be created if repeating is
            enabled), and set the role used for pinging members.
          </p>
          <p>
            The bot allows organizing events like Territory Wars or training
            sessions. Users can choose from three options below the event
            message, and the accepted list is sent to the{" "}
            <strong className="font-semibold text-indigo-600 dark:text-indigo-400">
              Team Builder
            </strong>
            .
          </p>
          <p>
            The fourth option ⚙ is available to users with &quot;High
            Roles&quot; and allows pinging: untagged members or one of the three
            response types.
          </p>
        </div>
      </details>

      <details className="rounded-xl p-6 mb-4">
        <summary className="font-semibold text-lg cursor-pointer">
          Bot messages
        </summary>
        <div className="mt-4">
          <p>
            When a member gets a role, the bot automatically sends them a
            message. In the future, custom message content will be configurable.
          </p>
          <img
            src="https://i.imgur.com/XkxXvWp.png"
            alt="Example of sent message"
            className="rounded-lg mt-4"
          />
        </div>
      </details>

      <details className="rounded-xl p-6 mb-4">
        <summary className="font-semibold text-lg cursor-pointer">
          Apollo and Raid-helper Bots
        </summary>
        <div className="mt-4 space-y-4">
          <p>
            Konqueruś partially synchronizes with Apollo and Raid-helper bots to
            fetch accepted participants and allow pinging members listed in
            Apollo.
          </p>
          <p>
            To fetch the list into Team Builder, go to House Settings → Bot
            Config and in the lineup section set:
          </p>
          <ul className="list-disc pl-5">
            <li>
              A text channel with the list (
              <strong className="font-semibold text-indigo-600 dark:text-indigo-400">
                NOTE
              </strong>
              ): only the latest list is scanned
            </li>
            <li>Roles to assign members to appropriate lineups</li>
          </ul>
          <p>Available commands:</p>
          <ul className="list-disc pl-5">
            <li>
              <code className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 font-mono text-sm border border-gray-200 dark:border-gray-700">
                /apollo_ping_unchecked
              </code>{" "}
              - pings untagged users
            </li>
            <li>
              <code className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 font-mono text-sm border border-gray-200 dark:border-gray-700">
                /apollo_ping_tentative
              </code>{" "}
              - pings users marked as &quot;tentative&quot;
            </li>
          </ul>
          <img
            src="https://i.imgur.com/sToC1De.png"
            alt="Example of pinging"
            className="rounded-lg"
          />
        </div>
      </details>

      <details className="rounded-xl p-6 mb-4">
        <summary className="font-semibold text-lg cursor-pointer">
          Commands
        </summary>
        <div className="mt-4">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <code className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 font-mono text-sm border border-gray-200 dark:border-gray-700">
                /login_to_conqsite
              </code>{" "}
              - quick login to ConqSite (button active for 1 minute)
              <img
                src="https://i.imgur.com/MG1vWiA.png"
                alt="Login example"
                className="rounded-lg mt-2"
              />
            </li>
            <li>
              <code className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 font-mono text-sm border border-gray-200 dark:border-gray-700">
                /warthog @user
              </code>{" "}
              - moves the user through all voice channels
            </li>
            <li>
              <code className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 font-mono text-sm border border-gray-200 dark:border-gray-700">
                /voice_presence [name]
              </code>{" "}
              - records presence from voice channels under the given name
            </li>
            <li>
              <code className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 font-mono text-sm border border-gray-200 dark:border-gray-700">
                /apollo_ping_unchecked
              </code>{" "}
              - pings users not marked on the Apollo list
            </li>
            <li>
              <code className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 font-mono text-sm border border-gray-200 dark:border-gray-700">
                /apollo_ping_tentative
              </code>{" "}
              - pings users marked as &quot;tentative&quot;
            </li>
            <li>
              <code className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 font-mono text-sm border border-gray-200 dark:border-gray-700">
                /sync_member_temporary
              </code>{" "}
              - adds/removes members based on roles
            </li>
          </ul>
        </div>
      </details>
    </div>
  );
};
export default BotDocs;
