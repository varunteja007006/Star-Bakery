import { Dashboard } from "../components/dashboard";
import { PageBody } from "../components/main/custom";

function Home() {
  return (
    <PageBody>
      <div className="min-h-screen py-10">
        <Dashboard></Dashboard>
      </div>
    </PageBody>
  );
}

export default Home;
