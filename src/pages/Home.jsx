import { Dashboard } from "../components/dashboard";
import { PageBody } from "../components/main/custom";

function Home() {
  return (
    <>
      <PageBody PageTitle={"Home"}>
        <Dashboard></Dashboard>
      </PageBody>
    </>
  );
}

export default Home;
