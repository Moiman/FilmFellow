import Modal from "@/components/modal";

describe("Modal component testing", () => {
  it("Renders Modal component with footer and content", () => {
    let isOpen = true;

    cy.mount(
      <Modal
        isOpen={isOpen}
        closeModal={() => {}}
        footer={<p>Hello</p>}
        content={<h1>Hello</h1>}
      />,
    );
    cy.get("p").should("be.visible");
    cy.get("h1").should("be.visible");
  });

  it("Doesnt render modal component with footer and content when isOpen is false", () => {
    let isOpen = false;

    cy.mount(
      <Modal
        isOpen={isOpen}
        closeModal={() => {}}
        footer={<p>Hello</p>}
        content={<h1>Hello</h1>}
      />,
    );
    cy.get("p").should("not.exist");
    cy.get("h1").should("not.exist");
  });

  it("Should close modal on X", () => {
    const closeModalSpy = cy.spy().as("closeModalSpy");
    cy.mount(
      <Modal
        closeModal={closeModalSpy}
        isOpen={true}
        content={<h1>Test</h1>}
      />,
    );
    cy.get(".modal-title").within(() => {
      cy.get("svg").click();
    });
    cy.get("@closeModalSpy").should("be.called", 1);
  });

  it("Should close modal on clicking outside of modal", () => {
    const closeModalSpy = cy.spy().as("closeModalSpy");
    cy.mount(
      <Modal
        closeModal={closeModalSpy}
        isOpen={true}
        content={<h1>Test</h1>}
      />,
    );
    cy.get(".modal-background").click(-100, 0, { force: true });
    cy.get("@closeModalSpy").should("be.called", 1);
  });

  it("Should close modal keyboard esc", () => {
    const closeModalSpy = cy.spy().as("closeModalSpy");
    cy.mount(
      <Modal
        closeModal={closeModalSpy}
        isOpen={true}
        content={<h1>Test</h1>}
      />,
    );
    cy.get("body").type("{esc}");
    cy.get("@closeModalSpy").should("be.called", 1);
  });
});
