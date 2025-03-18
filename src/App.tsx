import Header from "./components/Header";
import SectionHome from "./components/SectionHome";

function App() {
  return (
    <div className="max-w-screen flex flex-col items-center gap-10 sm:gap-20 container-padding ">
      <Header />
      <SectionHome/>
    </div>
  );
}

export default App;
