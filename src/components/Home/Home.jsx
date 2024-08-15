import Sidebar from "../Sidebar/Sidebar";
import Portfolio from "../Portfolio/Portfolio";
function Home() {
  return (
    <div className="Home p-5 gap-4">
        <Sidebar />
        <Portfolio />
    </div>
  );
}

export default Home;