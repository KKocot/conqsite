import { Link2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const DocsPage: React.FC = () => {
  const t = useTranslations("DocsPage");
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{t("documentation.title")}</h1>
      <div className="container mx-auto p-6 shadow-lg">
        <div className="p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">{t("guide.title")}</h2>
          <ol className="list-decimal list-inside space-y-4">
            <li>
              <strong>{t("guide.step1.title")}</strong>
              <p>{t("guide.step1.description")}</p>
            </li>
            <li>
              <strong>{t("guide.step2.title")}</strong>
              <p>{t("guide.step2.description")}</p>
            </li>
            <li>
              <strong>{t("guide.step3.title")}</strong>
              <ul className="list-disc list-inside ml-6 space-y-2">
                <li>
                  <strong>{t("guide.step3.form.houseName.title")}</strong>{" "}
                  {t("guide.step3.form.houseName.description")}
                </li>
                <li>
                  <strong>
                    {t("guide.step3.form.houseDescription.title")}
                  </strong>{" "}
                  {t("guide.step3.form.houseDescription.description")}
                </li>
                <li>
                  <strong>{t("guide.step3.form.country.title")}</strong>{" "}
                  {t("guide.step3.form.country.description")}
                </li>
                <li>
                  <strong>{t("guide.step3.form.discord.title")}</strong>{" "}
                  {t("guide.step3.form.discord.description")}
                </li>
                <li>
                  <strong>{t("guide.step3.form.avatar.title")}</strong>{" "}
                  {t("guide.step3.form.avatar.description")}
                </li>
                <li>
                  <strong>{t("guide.step3.form.server.title")}</strong>{" "}
                  {t("guide.step3.form.server.description")}
                </li>
              </ul>
            </li>
            <li>
              <strong>{t("guide.step4.title")}</strong>
              <ul className="list-disc list-inside ml-6 space-y-2">
                <li>
                  <strong>{t("guide.step4.form.serverDiscordId.title")}</strong>{" "}
                  {t("guide.step4.form.serverDiscordId.description")}
                </li>
                <li>
                  <strong>{t("guide.step4.form.memberRole.title")}</strong>{" "}
                  {t("guide.step4.form.memberRole.description")}
                </li>
                <li>
                  <strong>{t("guide.step4.form.logsChannels.title")}</strong>{" "}
                  {t("guide.step4.form.logsChannels.description")}
                </li>
                <li>
                  <strong>{t("guide.step4.form.twZone.title")}</strong>{" "}
                  {t("guide.step4.form.twZone.description")}
                </li>
                <li>
                  <strong>{t("guide.step4.form.lineups.title")}</strong>
                  <ul className="list-disc list-inside ml-6 space-y-2">
                    <li>
                      <strong>
                        {t("guide.step4.form.lineups.lineupName.title")}
                      </strong>{" "}
                      {t("guide.step4.form.lineups.lineupName.description")}
                    </li>
                    <li>
                      <strong>
                        {t("guide.step4.form.lineups.channelWithBot.title")}
                      </strong>{" "}
                      {t("guide.step4.form.lineups.channelWithBot.description")}
                    </li>
                    <li>
                      <strong>
                        {t("guide.step4.form.lineups.roleId.title")}
                      </strong>{" "}
                      {t("guide.step4.form.lineups.roleId.description")}
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <strong>{t("guide.step5.title")}</strong>
              <p className="flex items-center gap-1">
                {t("guide.step5.description")}
                <Link
                  className="flex items-center gap-1 text-red-600"
                  href="https://discord.com/oauth2/authorize?client_id=1002261855718342759&permissions=8&integration_type=0&scope=bot"
                  target="_blank"
                >
                  <Link2 />
                  {t("guide.step5.botName")}
                </Link>
              </p>
            </li>
            <li>
              <strong>{t("guide.step6.title")}</strong>
              <p>
                {t("guide.step6.description")}
                <code>/menu</code> {t("guide.step6.command")}
              </p>
            </li>
          </ol>
        </div>
        <h1 className="text-2xl font-bold ">{t("guide_2.title")}</h1>
        <img
          src="docs/image1.png"
          alt="Example Image 1"
          className="max-w-full h-auto"
        />

        <p>
          <strong>{t("guide_2.slash_command")}</strong>
        </p>
        <h2 className="text-xl font-semibold  mt-4">{t("guide_2.menu_eng")}</h2>
        <p>{t("guide_2.menu_eng_description")}</p>
        <ul className="list-disc ml-5">
          <li>
            <strong>{t("guide_2.send_presence")}</strong>
          </li>
          <li>
            <strong>{t("guide_2.quick_add")}</strong>
          </li>
          <li>
            <strong>{t("guide_2.delete_player")}</strong>
          </li>
          <li>
            <strong>{t("guide_2.add_all")}</strong>
          </li>
          <li>
            <strong>{t("guide_2.verification")}</strong>
          </li>
        </ul>
        <img
          src="docs/image3.png"
          alt="Example Image 1"
          className="max-w-full h-auto"
        />
        <h2 className="text-xl font-semibold mt-4">{t("guide_2.functions")}</h2>
        <p>{t("guide_2.functions_description")}</p>

        <h2 className="text-xl font-semibold mt-4">
          {t("guide_2.example_functions")}
        </h2>
        <ul className="list-disc ml-5">
          <li>{t("guide_2.auto_roles")}</li>
          <li>{t("guide_2.check_logs")}</li>
          <li>{t("guide_2.create_presence_lists")}</li>
        </ul>
        <h2 className="text-xl font-semibold mt-4">{t("guide_2.warthog")}</h2>
        <p>{t("guide_2.warthog_description")}</p>
        <p>
          <em>{t("guide_2.warthog_example")}</em>
        </p>

        <div className="image my-5 text-center">
          <img
            src="docs/image.png"
            alt="Example Image 1"
            className="max-w-full h-auto"
          />
        </div>

        <h2 className="text-xl font-semibold mt-4">
          {t("guide_2.installation_instructions")}
        </h2>
        <p>{t("guide_2.installation_steps")}</p>
        <ol className="list-decimal ml-5">
          <li>{t("guide_2.step1")}</li>
          <li>{t("guide_2.step2")}</li>
          <li>{t("guide_2.step3")}</li>
          <li>{t("guide_2.step4")}</li>
        </ol>

        <h2 className="text-xl font-semibold mt-4">
          {t("guide_2.polish_version_functions")}
        </h2>
        <ul className="list-disc ml-5">
          <li>{t("guide_2.create_event_groups")}</li>
          <li>{t("guide_2.auto_verification")}</li>
        </ul>
        <img
          src="docs/image2.png"
          alt="Example Image 1"
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
};

export default DocsPage;
