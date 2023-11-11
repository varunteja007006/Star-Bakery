import { Dashboard } from "../components/dashboard";
import { PageBody } from "../components/main/custom";

function Home() {
  return (
    <PageBody PageTitle={"Dashboard"}>
      <Dashboard></Dashboard>
    </PageBody>
  );
}

export default Home;
