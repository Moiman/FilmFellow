interface ListButtonProps {
  listId: number;
  name: string;
  movieAmount: number;
}

export const ListButton = ({ listId, name, movieAmount }: ListButtonProps) => {
  return (
    <button
      className="list-style"
      key={listId}
    >
      <div style={{ height: "45px", aspectRatio: "3/2", backgroundColor: "darkgrey" }} />
      <div className="list-name">
        <p>{name}</p>
        <p className="list-movie-amount">{movieAmount}</p>
      </div>
    </button>
  );
};
