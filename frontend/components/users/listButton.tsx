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
      <div style={{ height: "40px", aspectRatio: "1", backgroundColor: "darkgrey" }} />
      <div className="list-name">
        <p>{name}</p>
        <p>{movieAmount}</p>
      </div>
    </button>
  );
};
