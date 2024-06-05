import Image from "next/image";
import { authOptions } from "@/authOptions";
import { getDescriptionAndSocialMedia, getUserFriends } from "@/services/userService";
import { getServerSession } from "next-auth";
import { Twitter, Instagram, Smile, Frown } from "react-feather";
import { ProfileButtons } from "./profileButtons";
import Link from "next/link";

export const ProfileInfo = async ({ userId }: { userId: number }) => {
  const session = await getServerSession(authOptions);
  const user = await getDescriptionAndSocialMedia(userId);

  if (!user) {
    return null;
  }

  const friends = await getUserFriends(userId);
  console.log(friends);

  return (
    <div className="profile-info">
      {user.isActive ? <Smile className="profile-picture" /> : <Frown className="profile-picture" />}
      <h2 className="h3">{user.username}</h2>

      <div className="full-width">
        <h3 className="h5">Description</h3>
        <p className="profile-description">
          {user.description ? user.description : `${user.username} has no description.`}
        </p>
      </div>

      {(user.twitter || user.instagram || user.tiktok) && (
        <div className="full-width">
          <h3 className="h5">Social media</h3>
          <div className="profile-social-media">
            {user.twitter && (
              <div>
                <Twitter color="#d75eb5" />
                <p>{user.twitter}</p>
              </div>
            )}

            {user.instagram && (
              <div>
                <Instagram color="#ffc700" />
                <p>{user.instagram}</p>
              </div>
            )}

            {user.tiktok && (
              <div>
                <Image
                  src="/icons/tiktok_icon.svg"
                  height={24}
                  width={24}
                  alt="Tiktok"
                  style={{ overflow: "hidden" }}
                />
                <p>{user.tiktok}</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="full-width">
        <div className="profile-friend-list">
          <div className="friends-title">
            <h3 className="h5">Friends</h3>
            <Link href={`/users/${userId}/friends`}>See all</Link>
          </div>
          {userId === session?.user.id ? (
            <div className="friends-wrapper">
              {friends?.friends.map(friend => (
                <button
                  className="button-friend"
                  key={friend.id}
                >
                  <Link href={`/users/${friend.id}`}>{friend.username}</Link>
                </button>
              ))}
            </div>
          ) : (
            <div className="friends-wrapper">
              {friends?.friendsOf.map(friend => (
                <button
                  className="button-friend"
                  key={friend.id}
                >
                  <Link href={`/users/${friend.id}`}>{friend.username}</Link>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {session && (
        <ProfileButtons
          userId={userId}
          ownProfile={userId === session.user.id}
        />
      )}
    </div>
  );
};
/*
<button className="button-friend" />
            <button className="button-friend" />
            <button className="button-friend" />
            <button className="button-friend" />
            <button className="button-friend" />
            <button className="button-friend" />
            <button className="button-friend" />
            <button className="button-friend" />
*/
