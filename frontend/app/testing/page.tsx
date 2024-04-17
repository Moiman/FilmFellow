import Modal from "@/components/modal";

async function test() {
  "use server";
  console.log("test");
}

export default function testing() {
  return (
    <main>
      <h2>Testing</h2>

      <div style={{ display: "inline-flex", gap: "10px" }}>
        <Modal
          modalId={1}
          _footer={
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
            </div>
          }
          _onOk={test}
          okLink={<button>test</button>}
          openModalText="Open 1"
        />
        <Modal
          modalId={2}
          _footer={<p>Test2.</p>}
          content={
            <div>
              <p>Test2</p>
            </div>
          }
          _onOk={test}
          okLink={<button>test</button>}
          openModalText="Open 2"
          openModalClass="button-cyan"
        />
        <Modal
          modalId={3}
          content={
            <div>
              <p>Test3</p>
            </div>
          }
          openModalText="Open 3"
          openModalClass="button-transparent"
        />
      </div>
    </main>
  );
}
