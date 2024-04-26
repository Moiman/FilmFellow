import { User } from "next-auth";
import { Smile } from "react-feather";

interface Props {
  user: User;
  key: number;
}

export const UserDetails = ({ user }: Props) => {
  return (
    <>
      <div className="admin-panel-user-list">
        <div className="admin-panel-left-side">
          <div style={{marginInline: "10px"}}>
            <Smile size={90} />
          </div>
          <div style={{marginInline: "10px"}}>
            <p>{user.username}</p>
            <p>{user.email}</p>
          </div>
          <div style={{marginInline: "10px"}}>
            <p>Last visited</p>
            <p>User since</p>
          </div>
        </div>
        <div
          style={{ padding: "20px" }}
        >
          <button className="button-yellow">Block user</button>
          <button className="button-pink">Delete</button>
          <button className="button-cyan">Make admin</button>
        </div>
      </div>
    </>
  );
};
