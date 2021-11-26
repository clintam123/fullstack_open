describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user1 = {
      name: "Do Duc Tam",
      username: "tam",
      password: "fazeniko123",
    };
    cy.request("POST", "http://localhost:3003/api/users", user1);
    const user2 = {
      name: "God Tam",
      username: "tam_god",
      password: "fazeniko123",
    };
    cy.request("POST", "http://localhost:3003/api/users", user2);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Username");
    cy.contains("Password");
    cy.contains("login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.login({ username: "tam", password: "fazeniko123" });
      cy.contains("Do Duc Tam logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("wrong-username");
      cy.get("#password").type("wrong-password");
      cy.get("#login-button").click();

      cy.get(".error")
        .should("contain", "ERROR: Wrong credentials")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");

      cy.get("html").should("not.contain", "Do Duc Tam logged in");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "tam", password: "fazeniko123" });
    });

    it("A blog can be created", function () {
      cy.contains("Create Blog").click();
      cy.get("#title").type("Test");
      cy.get("#author").type("tam");
      cy.get("#url").type("https://www.speedtest.net/");
      cy.get("#likes").type("10");

      cy.get("#create-button").click();
      cy.contains("Test - tam");
    });

    describe("When blogs exist, ", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "Test",
          author: "tam",
          url: "https://www.speedtest.net/",
          likes: 300,
        });
        cy.createBlog({
          title: "Usada Pekora",
          author: "hololive",
          url: "https://twitter.com/usadapekora",
          likes: 100,
        });
        cy.createBlog({
          title: "Houshou Marine",
          author: "hololive",
          url: "https://twitter.com/houshoumarine",
          likes: 200,
        });
      });
      it("user can like a blog", function () {
        cy.contains("Usada Pekora - hololive").contains("view").click();
        cy.contains("Usada Pekora - hololive").contains("like").click();
        cy.contains("Usada Pekora - hololive").contains("101");
      });

      it("user who created the blog can delete it", function () {
        cy.contains("Usada Pekora - hololive").contains("view").click();
        cy.contains("Usada Pekora - hololive").contains("remove").click();
        cy.on("window:confirm", () => true);
        cy.get("html").should("not.contain", "Usada Pekora - hololive");
      });

      it("user who didn't created the blog can't delete it", function () {
        cy.contains("logout").click();
        const user = {
          name: "God Tam",
          username: "tam_god",
          password: "fazeniko123",
        };
        cy.login(user);
        cy.contains("Usada Pekora - hololive").contains("view").click();
        cy.contains("Usada Pekora - hololive").contains("remove").click();
        cy.on("window:confirm", () => true);

        cy.get(".error")
          .should("contain", "ERROR: Cant delete blog")
          .and("have.css", "color", "rgb(255, 0, 0)")
          .and("have.css", "border-style", "solid");
      });

      it("blogs are ordered by likes descending", function () {
        cy.get(".blog").then((blogs) => {
          cy.wrap(blogs[0]).contains("300");
          cy.wrap(blogs[1]).contains("200");
          cy.wrap(blogs[2]).contains("100");
        });
      });
    });
  });
});
