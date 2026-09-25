import ProfileCard from "./ProfileCard";

function App() {
  return (
    <div>
      <h1>Profile Cards</h1>

      <ProfileCard name="Ruby" age={25} showDetails={true} />
      <ProfileCard name="Fatemeh" age={30} showDetails={false} />
    </div>
  );
}

export default App;
