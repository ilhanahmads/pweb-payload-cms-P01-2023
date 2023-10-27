import payload from 'payload';

/** @type {import('payload/types').CollectionConfig} */
const Todo = {
    slug : "Todo",
    access: {
        read : () => true,
        create : () => true,
        update : () => true,
        delete : () => true
    },
    admin : {
        useAsTitle : "nama"
    },
    hooks: {
        afterOperation: [
            async (args) => {
                if (args.operation == "create") {
                    payload.create({
                        collection: "Log",
                        data: {
                            collectionName: "todo",
                            action : "create",
                            timestamp: new Date()
                        },
                    });
                } else if (args.operation == "update") {
                    payload.create({
                        collection: "Log",
                        data: {
                            collectionName: "todo",
                            action : "update",
                            timestamp: new Date()
                        },
                    });
                } else if (args.operation == "delete") {
                    payload.create({
                        collection: "Log",
                        data: {
                            collectionName: "todo",
                            action : "delete",
                            timestamp: new Date()
                        },
                    });
                } 
            },
        ],
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
