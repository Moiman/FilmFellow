"use client";
import { useState } from "react";
import Modal from "@/components/modal";

export default function TestingComponent() {
  const [isOpenFirst, setIsOpenFirst] = useState(false);
  const [isOpenSecond, setIsOpenSecond] = useState(false);
  const [isOpenThird, setIsOpenThird] = useState(false);

  const closeFirstModal = () => {
    setIsOpenFirst(false);
  };
  const closeSecondModal = () => {
    setIsOpenSecond(false);
  };
  const closeThirdModal = () => {
    setIsOpenThird(false);
  };
  return (
    <main>
      <h2>Testing</h2>

      <div style={{ display: "inline-flex", gap: "10px" }}>
        <button
          onClick={() => {
            setIsOpenFirst(true);
          }}
        >
          Open 1
        </button>
        <Modal
          isOpen={isOpenFirst}
          closeModal={closeFirstModal}
          footer={
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          }
          content={
            <div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
              <button
                className="button-pink"
                onClick={() => setIsOpenFirst(false)}
              >
                Close Modal
              </button>
            </div>
          }
        />
        <button
          className="button-transparent"
          onClick={() => {
            setIsOpenSecond(true);
          }}
        >
          Open 2
        </button>
        <Modal
          isOpen={isOpenSecond}
          closeModal={closeSecondModal}
          footer={<p>Test2.</p>}
          content={
            <div>
              <p>Test2</p>
            </div>
          }
        />
        <button
          className="button-cyan"
          onClick={() => {
            setIsOpenThird(true);
          }}
        >
          Open 3
        </button>
        <Modal
          isOpen={isOpenThird}
          closeModal={closeThirdModal}
          content={
            <div>
              <p>Test3</p>
            </div>
          }
        />
      </div>
    </main>
  );
}
