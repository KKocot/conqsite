import { useDeleteAuthorityMutation } from "@/components/hooks/use-authority-mutation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AuthorityToken } from "@/lib/get-data";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { redirect } from "next/navigation";

const Content = ({ data }: { data: AuthorityToken }) => {
  const t = useTranslations("Authority");
  const deleteAuthorityToken = useDeleteAuthorityMutation();
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>{t("hello")}</span>
            <Image
              height={32}
              width={32}
              src={data.image}
              alt={data.name}
              className="rounded-full"
            />
            <span>{data.name}</span>
          </CardTitle>
          <CardDescription>
            {t("you_are_about_to_login")}
            {data.id}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-end">
          <Button
            onClick={() => {
              signIn("credentials", {
                id: data.id,
                image: data.image,
                name: data.name,
              });
              deleteAuthorityToken.mutate({ token: data.token });
              redirect("/");
            }}
            variant="custom"
          >
            {t("authorize")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
export default Content;
