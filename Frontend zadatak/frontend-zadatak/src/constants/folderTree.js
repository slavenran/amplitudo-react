const folders = {
    folder: {
        id: 1,
        name: "FOLDERI",
        sector: "Lorem Ipsum",
        creationDate: "17.06.2019.",
        creator: "Marko Markovic",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        folderType: "organizer",
        parentFolder: [
            {
                id: 2,
                name: "Folder 1",
                sector: "Lorem Ipsum",
                creationDate: "17.06.2019.",
                creator: "Marko Markovic",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                folderType: "organizer",
                parentFolder: [
                    {
                        id: 200,
                        name: "Subfolder 1",
                        sector: "Lorem Ipsum",
                        creationDate: "17.06.2019.",
                        creator: "Marko Markovic",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                        folderType: "docFolder",
                        parentFolder: null
                    },
                    {
                        id: 201,
                        name: "Subfolder 2",
                        sector: "Lorem Ipsum",
                        creationDate: "17.06.2019.",
                        creator: "Marko Markovic",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                        folderType: "organizer",
                        parentFolder: [
                            {
                                id: 2011,
                                name: "Novi folder 1",
                                sector: "Lorem Ipsum",
                                creationDate: "17.06.2019.",
                                creator: "Marko Markovic",
                                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                                folderType: "docFolder",
                                parentFolder: null
                            },
                            {
                                id: 2012,
                                name: "2",
                                sector: "Lorem Ipsum",
                                creationDate: "17.06.2019.",
                                creator: "Marko Markovic",
                                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                                folderType: "docFolder",
                                parentFolder: null
                            },
                            {
                                id: 2013,
                                name: "3",
                                sector: "Lorem Ipsum",
                                creationDate: "17.06.2019.",
                                creator: "Marko Markovic",
                                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                                folderType: "docFolder",
                                parentFolder: null
                            },
                        ]
                    },
                    {
                        id: 202,
                        name: "Subfolder 3",
                        sector: "Lorem Ipsum",
                        creationDate: "17.06.2019.",
                        creator: "Marko Markovic",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                        folderType: "docFolder",
                        parentFolder: null
                    },
                    {
                        id: 203,
                        name: "Subfolder 4",
                        sector: "Lorem Ipsum",
                        creationDate: "17.06.2019.",
                        creator: "Marko Markovic",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                        folderType: "docFolder",
                        parentFolder: null
                    },
                    {
                        id: 204,
                        name: "Subfolder 5",
                        sector: "Lorem Ipsum",
                        creationDate: "17.06.2019.",
                        creator: "Marko Markovic",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                        folderType: "docFolder",
                        parentFolder: null
                    },
                ]
            },
            {
                id: 3,
                name: "Folder 2",
                sector: "Lorem Ipsum",
                creationDate: "17.06.2019.",
                creator: "Marko Markovic",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                folderType: "organizer",
                parentFolder: [{
                    id: 300,
                    name: "Subfolder 1",
                    sector: "Lorem Ipsum",
                    creationDate: "17.06.2019.",
                    creator: "Marko Markovic",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    folderType: "docFolder",
                    parentFolder: null
                }]
            },
            {
                id: 4,
                name: "Folder 3",
                sector: "Lorem Ipsum",
                creationDate: "17.06.2019.",
                creator: "Marko Markovic",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                folderType: "organizer",
                parentFolder: [{
                    id: 400,
                    name: "Subfolder 1",
                    sector: "Lorem Ipsum",
                    creationDate: "17.06.2019.",
                    creator: "Marko Markovic",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    folderType: "docFolder",
                    parentFolder: null
                }]
            },
            {
                id: 5,
                name: "Folder 4",
                sector: "Lorem Ipsum",
                creationDate: "17.06.2019.",
                creator: "Marko Markovic",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                folderType: "organizer",
                parentFolder: [{
                    id: 500,
                    name: "Subfolder 1",
                    sector: "Lorem Ipsum",
                    creationDate: "17.06.2019.",
                    creator: "Marko Markovic",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    folderType: "docFolder",
                    parentFolder: null
                }]
            },
            {
                id: 6,
                name: "Folder 5",
                sector: "Lorem Ipsum",
                creationDate: "17.06.2019.",
                creator: "Marko Markovic",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                folderType: "organizer",
                parentFolder: [{
                    id: 600,
                    name: "Subfolder 1",
                    sector: "Lorem Ipsum",
                    creationDate: "17.06.2019.",
                    creator: "Marko Markovic",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    folderType: "docFolder",
                    parentFolder: null
                }]
            },
            {
                id: 7,
                name: "Folder 6",
                sector: "Lorem Ipsum",
                creationDate: "17.06.2019.",
                creator: "Marko Markovic",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                folderType: "organizer",
                parentFolder: [{
                    id: 700,
                    name: "Subfolder 1",
                    sector: "Lorem Ipsum",
                    creationDate: "17.06.2019.",
                    creator: "Marko Markovic",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    folderType: "docFolder",
                    parentFolder: null
                }]
            },
            {
                id: 8,
                name: "Folder 7",
                sector: "Lorem Ipsum",
                creationDate: "17.06.2019.",
                creator: "Marko Markovic",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                folderType: "organizer",
                parentFolder: [{
                    id: 800,
                    name: "Subfolder 1",
                    sector: "Lorem Ipsum",
                    creationDate: "17.06.2019.",
                    creator: "Marko Markovic",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    folderType: "docFolder",
                    parentFolder: null
                }]
            },
            {
                id: 9,
                name: "Folder 8",
                sector: "Lorem Ipsum",
                creationDate: "17.06.2019.",
                creator: "Marko Markovic",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                folderType: "organizer",
                parentFolder: [{
                    id: 900,
                    name: "Subfolder 1",
                    sector: "Lorem Ipsum",
                    creationDate: "17.06.2019.",
                    creator: "Marko Markovic",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    folderType: "docFolder",
                    parentFolder: null
                }]
            },
        ]
    }
}

export default folders;