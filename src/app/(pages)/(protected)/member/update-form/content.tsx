import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";
import WizardForm from "@/feature/survey/wizard-form";
import { getUnitsAssets, getWeaponsAssets, Survey } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";

const Content = ({
  user,
  surveyData,
  surveyLoading,
  surveyType,
  userHouses,
}: {
  user: { id: string; avatar: string };
  surveyData: Survey;
  surveyLoading: boolean;
  surveyType: "main" | "sub" | "newSub";
  userHouses: string[];
}) => {
  const { data: unitsAssets, isLoading: unitsAssetsLoading } = useQuery({
    queryKey: ["unitsAssets"],
    queryFn: getUnitsAssets,
    enabled: true,
  });
  const { data: weaponsAssets, isLoading: weaponsAssetsLoading } = useQuery({
    queryKey: ["weaponsAssets"],
    queryFn: getWeaponsAssets,
  });
  if (weaponsAssetsLoading || unitsAssetsLoading) return <LoadingComponent />;
  if (!weaponsAssets || !unitsAssets) return <NoData />;
  return (
    <WizardForm
      weapons={weaponsAssets}
      user_id={user.id}
      avatar={user.avatar}
      unitsAssets={unitsAssets}
      profileData={surveyData}
      profileIsLoading={surveyLoading}
      surveyType={surveyType}
      userHouses={userHouses}
    />
  );
};

export default Content;
