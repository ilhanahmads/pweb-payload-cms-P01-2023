/** @type {import('payload/types').CollectionConfig} */
const Category = {
    slug: "Category",
    admin: {
        useAsTitle: "name"
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
            label: "Category Name",
        },
        {
            name: "todos",
            type: "relationship",
            relationTo: "Todo",
            hasMany: true,
            label: "To-Do Items",
        },
    ]
}

export default Category
