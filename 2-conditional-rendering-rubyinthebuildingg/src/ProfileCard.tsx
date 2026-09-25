type ProfileCardProps = {
  name: string;
  age: number;
  showDetails: boolean;
};

function ProfileCard({ name, age, showDetails }: ProfileCardProps) {
  return (
    <div>
      <p>Name: {name}</p>

      {showDetails && <p>Age: {age}</p>}
    </div>
  );
}

export default ProfileCard;
