
import Navbar from "./Components/Navbar";
import Container from "./Page/Container";

const App = () => {
  return (
    <>
      <div className="bg-gradient-to-t to-green-400 from-blue-600 h-screen w-full justify-center items-center">

        <Navbar />
        <Container/>
      </div>
    </>
  );
};

export default App;
