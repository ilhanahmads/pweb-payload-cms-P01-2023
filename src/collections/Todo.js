/** @type {import('payload/types').CollectionConfig} */
const Todo = {
    slug : "Todo",
    admin : {
        useAsTitle : "nama"
    },
    fields : [
        {
            name: "nama",
            type: "text",
            required: true,
            label: "Task Name",
        },
        {
            name: "description",
            type: "textarea",
            label: "Description",
        },
        {
            name: "dueDate",
            type: "date",
            label: "Due Date",
        },
        {
            name: "priority",
            type: "select",
            label: "Priority",
            options: [
                {
                    label: 'High',
                    value: 'high',
                },
                {
                    label: 'Medium',
                    value: 'medium',
                },
                {
                    label: 'Low',
                    value: 'low',
                },
            ],
            defaultValue: 'medium',
        },
        {
            name: 'completed',
            type: 'radio',
            label: 'Completed',
            options: [
                {
                    label: 'Yes',
                    value: 'yes',
                },
                {
                    label: 'No',
                    value: 'no',
                },
            ],
            defaultValue: 'no',
        },
    ]
}

export default Todo
