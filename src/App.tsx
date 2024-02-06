import Uploader from "./components/Uploader";

function App() {
  return (
    <section className="w-screen h-screen p-4 flex flex-wrap">
      <h1 className="w-full text-3xl font-bold underline">Cross Stitch App</h1>
      <div className="auto">
        <Uploader />
      </div>
      <div className="auto"></div>
    </section>
  );
}

export default App;
