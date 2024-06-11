import Content from "../components/Content";
import Box from "../components/Box";
import customFetch from "../../../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import StatsContainer from "../components/StatsContainer";
import ChartContainer from "../components/ChartContainer";

export const loader = async () => {
  try {
    const response = await customFetch.get("/jobs/stats");
    return response.data;
  } catch (error) {
    return error;
  }
}
const Stats = () => {
  const { defaultStats, dailyApplications } = useLoaderData();
  return (
    <Content>
      <Box className="pl-6 md:pl-56 lg:pl-16">
        <h1 className="text-3xl font-bold ">Statistics</h1>
        <StatsContainer
          defaultStats={defaultStats}
        />
        {dailyApplications?.length > 0 && (
         <ChartContainer data={dailyApplications} />
        )}
      </Box>
    </Content>
  );
};
export default Stats;
