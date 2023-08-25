import React from "react";
import { ChapterInput } from "./index";
import { mockBook } from "@/mocks/entities/book";
import { mapDefaultBookFormValues } from "@/helpers/admin/books/form";

describe("<ChapterInput />", () => {
  it("should renders", () => {
    const formValues = {
      chapters: [],
    };
    cy.mountWithForm(<ChapterInput book={null} />, formValues);
  });

  it("should renders with book", () => {
    const mockedBook = mockBook({ chaptersCount: 10 });
    const formValues = mapDefaultBookFormValues(mockedBook);
    cy.mountWithForm(<ChapterInput book={mockedBook} />, formValues);
    cy.get('[data-testid="remove-chapter"]').should("have.length", 10);
    cy.get('[data-testid="move-chapter-down"]').should("have.length", 9);
    cy.get('[data-testid="move-chapter-up"]').should("have.length", 9);
  });

  it("should be able to remove chapters", () => {
    const mockedBook = mockBook({ chaptersCount: 1 });
    const formValues = mapDefaultBookFormValues(mockedBook);
    cy.mountWithForm(<ChapterInput book={mockedBook} />, formValues);

    cy.get('[data-testid="remove-chapter"]').click();
    cy.get('[data-testid="remove-chapter"]').should("not.exist");
  });

  it("should be able to move chapters up", () => {
    const mockedBook = mockBook({ chaptersNames: ["Chapter 1", "Chapter 2"] });
    const formValues = mapDefaultBookFormValues(mockedBook);
    cy.mountWithForm(<ChapterInput book={mockedBook} />, formValues);

    // Chapter 1 should be before Chapter 2
    cy.get('[data-testid="chapter-entry"]')
      .first()
      .contains("Chapter 1")
      .should("exist");
    cy.get('[data-testid="chapter-entry"]')
      .last()
      .contains("Chapter 2")
      .should("exist");

    cy.get('[data-testid="move-chapter-up"]').first().click();

    // Chapter 1 should be after Chapter 2
    cy.get('[data-testid="chapter-entry"]')
      .first()
      .contains("Chapter 2")
      .should("exist");
    cy.get('[data-testid="chapter-entry"]')
      .last()
      .contains("Chapter 1")
      .should("exist");
  });

  it("should be able to add new chapters", () => {
    const formValues = {
      chapters: [],
    };
    cy.mountWithForm(<ChapterInput book={null} />, formValues);

    cy.contains("Add new chapter").click();
    cy.get('[placeholder="Chapter ..."]').type("Chapter 1");
    cy.contains("Add Chapter", { matchCase: false }).click();
    cy.get('[data-testid="chapter-entry"]').should("have.length", 1);

    cy.contains("Add new chapter").click();
    cy.get('[placeholder="Chapter ..."]').type("Chapter 2");
    cy.contains("Add Chapter", { matchCase: false }).click();
    cy.get('[data-testid="chapter-entry"]').should("have.length", 2);

    cy.get('[data-testid="move-chapter-down"]').should("have.length", 1);
    cy.get('[data-testid="move-chapter-up"]').should("have.length", 1);
  });

  it.only("should be able to add new child chapters", () => {
    const formValues = {
      chapters: [],
    };
    cy.mountWithForm(<ChapterInput book={null} />, formValues);

    cy.contains("Add new chapter").click();
    cy.get('[placeholder="Chapter ..."]').type("Chapter 1");
    cy.contains("Add Chapter", { matchCase: false }).click();
    cy.get('[data-testid="chapter-entry"]').should("have.length", 1);

    cy.get('[data-testid="chapter-entry"]').within(() => {
      cy.get('[data-testid="chapter-dropdown"]').click();

      cy.contains("Add new chapter").click();
      cy.get('[placeholder="Chapter ..."]').type("Chapter 1.1");
      cy.contains("Add Chapter", { matchCase: false }).click();

      cy.contains("Add new chapter").click();
      cy.get('[placeholder="Chapter ..."]').type("Chapter 1.2");
      cy.contains("Add Chapter", { matchCase: false }).click();

      cy.contains("Add new chapter").click();
      cy.get('[placeholder="Chapter ..."]').type("Chapter 1.3");
      cy.contains("Add Chapter", { matchCase: false }).click();

      cy.get('[data-testid="chapter-entry"]').should("have.length", 3);
      cy.get('[data-testid="move-chapter-down"]').should("have.length", 2);
      cy.get('[data-testid="move-chapter-up"]').should("have.length", 2);
    });
  });
});
