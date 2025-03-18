import Header from "./components/Header";
import SectionHome from "./components/SectionHome";

function App() {
  return (
    <div className="flex flex-col items-center mx-4 my-5 sm:mx-8 sm:my-10 gap-10 sm:gap-20">
      <Header />
      <SectionHome/>
    </div>
  );
}

export default App;
