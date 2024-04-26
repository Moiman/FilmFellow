import Link from "next/link";

import { Section } from "@/components/section";

export default function userFriends({ params }: { params: { id: string } }) {
  return (
    <main>
      <Section
        header={
          <h3 className="yellow-name-header">
            <Link href={"/users/" + params.id}>User</Link>&rsquo;s friends
          </h3>
        }
      >
        <div className="friends">
          <button className="button-friend" />
          <button className="button-friend" />
          <button className="button-friend" />
          <button className="button-friend" />
          <button className="button-friend" />
          <button className="button-friend" />
          <button className="button-friend" />
          <button className="button-friend" />
        </div>
      </Section>
    </main>
  );
}
