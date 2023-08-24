// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";
import "@/styles/globals.css";

// Alternatively you can use CommonJS syntax:
// require('./commands')
import { mount, MountOptions, MountReturn } from "cypress/react18";
import { FormProvider, useForm } from "react-hook-form";
import React, { PropsWithChildren } from "react";

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mountWithForm: (
        jsx: React.ReactNode,
        initialFormValues?: any,
        options?: MountOptions,
        rerenderKey?: string
      ) => Cypress.Chainable<MountReturn>;
    }
  }
}

const TestForm: React.FC<PropsWithChildren<{ initialFormValues: any }>> = ({
  children,
  initialFormValues,
}) => {
  const methods = useForm({
    defaultValues: initialFormValues,
  });
  const { handleSubmit, register } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(() => {})}>{children}</form>
    </FormProvider>
  );
};

Cypress.Commands.add(
  "mountWithForm",
  (component, initialFormValues = {}, options = {}) => {
    const wrapped = (
      <TestForm initialFormValues={initialFormValues}>{component}</TestForm>
    );

    return mount(wrapped, options);
  }
);

// Example use:
// cy.mount(<MyComponent />)
