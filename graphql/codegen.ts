import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "graphql/graphql-schema.json",
  documents: "src/**/graphql/*.ts",
  generates: {
    "src/gql/types.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
    "src/gql/ssr.tsx": {
      plugins: ["typescript", "typescript-operations", "apollo-next-ssr"],
      config: {
        reactApolloVersion: 3,
        gqlImport: "@apollo/client",
        documentMode: "external",
        importDocumentNodeExternallyFrom: "./types",
      },
    },
  },
};

export default config;
