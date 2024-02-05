import { InMemoryCache } from "@apollo/client";
import { createArrayOfUniqueField } from "@/helpers/array";

export const prepareCache = () =>
  new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          usersCollection: {
            keyArgs: ["filter"],
            merge(existing = { edges: [] }, incoming, { args, mergeObjects }) {
              if (args?.filter?.email || !incoming.edges) {
                return mergeObjects(existing, incoming);
              }
              const newEdges = createArrayOfUniqueField(
                [...existing.edges, ...incoming.edges],
                "node.__ref"
              );
              return {
                ...incoming,
                edges: newEdges,
              };
            },
          },
          booksCollection: {
            keyArgs: ["filter"],
            merge(existing = { edges: [] }, incoming, { mergeObjects }) {
              if (!incoming.edges) {
                return mergeObjects(existing, incoming);
              }
              const newEdges = createArrayOfUniqueField(
                [...existing.edges, ...incoming.edges],
                "node.__ref"
              );
              return {
                ...incoming,
                edges: newEdges,
              };
            },
          },
          questionsCollection: {
            keyArgs: ["filter"],
            merge(existing = { edges: [] }, incoming, { mergeObjects }) {
              if (!incoming.edges) {
                return mergeObjects(existing, incoming);
              }
              const newEdges = createArrayOfUniqueField(
                [...existing.edges, ...incoming.edges],
                "node.__ref"
              );
              return {
                ...incoming,
                edges: newEdges,
              };
            },
          },
        },
      },
    },
  });
