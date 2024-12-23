import { useTranslations } from "next-intl";

const DocsPage: React.FC = () => {
  const t = useTranslations("DocsPage");
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Work in progress</h1>
    </div>
  );
};

export default DocsPage;
