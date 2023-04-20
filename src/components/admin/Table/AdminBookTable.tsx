interface book {
    name: string
    color: string
}
const bookDatabase : book[]= [
    {
        name: "Intro to mathematic",
        color: "primary"
    },
    {
        name: "Mathematic in practice",
        color: "badge-secondary"
    },
    {
        name: "Linear Algebra and Geometry",
        color: "badge-accent"
    },
    {
        name: "Precalculus",
        color: "badge-success"
    },
    {
        name: "Calculus I",
        color: "badge-error"
    },
    {
        name: "Calculus II",
        color: "badge-info"
    }
]

export { bookDatabase }
export type { book }