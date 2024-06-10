import Image from "next/image";
import Link from "next/link";
import { Twitter, Instagram, Smile, Frown } from "react-feather";
import { getServerSession } from "next-auth";
import { authOptions } from "@/authOptions";
import { getDescriptionAndSocialMedia } from "@/services/userService";
import { getUserFriends } from "@/services/friendService";
import { ProfileButtons } from "./profileButtons";
import { FriendListButton } from "@/components/friendListButton";

export const ProfileInfo = async ({ userId }: { userId: number }) => {
  const session = await getServerSession(authOptions);
  const user = await getDescriptionAndSocialMedia(userId);

  if (!user) {
    return null;
  }

  const friends = await getUserFriends(userId);

  return (
    <div className="profile-info">
      {user.isActive ? (
        <Smile
          className="profile-picture user-icon"
          aria-label="Active user"
        />
      ) : (
        <Frown
          className="profile-picture user-icon"
          aria-label="Suspended user"
        />
      )}
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
                <Twitter
                  className="pink-icon"
                  aria-label="Twitter"
                />
                <p>{user.twitter}</p>
              </div>
            )}

            {user.instagram && (
              <div>
                <Instagram
                  className="yellow-icon"
                  aria-label="Instagram"
                />
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
                  aria-label="Tiktok"
                />
                <p>{user.tiktok}</p>
              </div>
            )}
          </div>
        </div>
      )}
      {friends?.friends.length !== 0 && (
        <div className="full-width">
          <div className="profile-friend-list">
            <div className="friends-title">
              <h3 className="h5">Friends</h3>
              <Link href={`/users/${userId}/friends`}>See all</Link>
            </div>

            <div className="friends-wrapper">
              {friends?.friends.slice(0, 4).map(friend => (
                <FriendListButton
                  key={friend.id}
                  friend={friend}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {session && (
        <ProfileButtons
          userId={userId}
          ownProfile={userId === session.user.id}
        />
      )}
    </div>
  );
};
