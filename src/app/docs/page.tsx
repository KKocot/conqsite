import { Link2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const DocsPage: React.FC = () => {
  const t = useTranslations("DocsPage");
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{t("documentation.title")}</h1>
      <div className="container mx-auto p-6">
        <div className="p-6 rounded-lg shadow-lg">
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
      </div>
    </div>
  );
};

export default DocsPage;
