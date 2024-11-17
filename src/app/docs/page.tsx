import { Link2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const DocsPage: React.FC = () => {
  const t = useTranslations("DocsPage");
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{t("documentation.title")}</h1>
      <div className="container mx-auto p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-6">
          Flow for &quot;Create House&quot;:
        </h2>
        <ul className="list-decimal ml-6">
          <li>
            Fill form with units first. Go to{" "}
            <Link
              className="text-destructive underline-offset-4 hover:underline"
              href="/update-form"
            >
              Update Form
            </Link>
          </li>
          <li>
            Go to{" "}
            <Link
              className="text-destructive underline-offset-4 hover:underline"
              href="/create-house"
            >
              Create House
            </Link>{" "}
            and fill the form
          </li>
          <li>
            Go to{" "}
            <Link
              className="text-destructive underline-offset-4 hover:underline"
              href="/settings"
            >
              Settings
            </Link>{" "}
            as a house owner and fill settings form
          </li>
          <li>
            Invite{" "}
            <Link
              className="gap-1 text-red-600"
              href="https://discord.com/oauth2/authorize?client_id=1002261855718342759&permissions=8&integration_type=0&scope=bot"
              target="_blank"
            >
              <Link2 className="inline-block" /> Konquerus
            </Link>{" "}
            to your house discord server
          </li>
          <li>Give Konquerus permissions</li>
          <li>
            Create channel for Konquerus and run command{" "}
            <span className="text-blue-500">/menu_eng</span>
          </li>
          <li>
            Press <span className="text-blue-500">Verification</span> button to
            check your setting from website
          </li>
          <li>
            Press <span className="text-blue-500">Add All</span> button to add
            your all players with Member role to house on website
          </li>
        </ul>
      </div>
      <div className="container mx-auto p-6 shadow-lg mt-6">
        <h2 className="text-2xl font-bold mb-6">Flow for build team</h2>

        <ul className="list-decimal ml-6">
          <li>Make sure house is created correcty</li>
          <li>
            Go to bot <span className="text-blue-500">/menu_eng</span> and press{" "}
            <span className="text-blue-500">Send the presence</span> to upload
            data from Apollo/Raid-Helper to your house data
          </li>
          <li>
            Go to{" "}
            <Link
              className="text-destructive underline-offset-4 hover:underline"
              href="/team-builder"
            >
              Team Builder
            </Link>{" "}
            page
          </li>
          <li>Choose house and date from uploaded bot</li>
          <li>Upload Lineup or whole house</li>
          <li>Fill sheet</li>
          <li>
            Go to <span className="text-blue-500">Actions</span> tab to Public
            lineup for your members. Name it and pick a date of event
          </li>
          <li>
            Members can check your publiced lineups on Go to{" "}
            <Link
              className="text-destructive underline-offset-4 hover:underline"
              href="/house"
            >
              House
            </Link>{" "}
            by choosing right date of event and name of lineup
          </li>
        </ul>
      </div>
      <div className="container mx-auto p-6 shadow-lg mt-6">
        <h2 className="text-2xl font-bold mb-6">Get Discort IDs</h2>

        <ul className="list-decimal ml-6">
          <li>Go to your discord settings</li>
          <li>
            Go to <span className="text-blue-500">Advanced Settings</span>
          </li>
          <li>
            Enable <span className="text-blue-500">Developer Mode</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DocsPage;
