NPP.onready = async () => {    
    provider = ethers.providers.getDefaultProvider(process.env.CURRENT_NETWORK);
    provider.listAccounts().then(response => {
        for (let i = 0; i < response.length; i++){
            NPP.addNewRecord({
                "id": "",
                "pubk": response[i],
                "degree": "Computer science",
                "titleExpeditionDate": "",
                "firstName": toString(capFirst(names[getRandomInt(0, names.length + 1)])),
                "firstSurname": toString(capFirst(surnames[getRandomInt(0, surnames.length + 1)])),
                "role": assignRole(i, response),
                "subjects": [
                    {
                        "Subject": "Computing Theory",
                        "Mark": toString(getRandomMark()),
                        "Subject Type": "Basic Core",
                        "Course": "23/24"
                    },
                    {
                        "Subject": "Calculus",
                        "Mark": toString(getRandomMark()),
                        "Subject Type": "Basic Core",
                        "Course": "23/24"
                    },
                    {
                        "Subject": "Bussiness Management",
                        "Mark": toString(getRandomMark()),
                        "Subject Type": "Basic Core",
                        "Course": "23/24"
                    },
                    {
                        "Subject": "Programming I",
                        "Mark": toString(getRandomMark()),
                        "Subject Type": "Basic Core",
                        "Course": "23/24"
                    },
                    {
                        "Subject": "Discrete Math",
                        "Mark": toString(getRandomMark()),
                        "Subject Type": "Basic Core",
                        "Course": "23/24"
                    },
                    {
                        "Subject": "Principles of Computer Engineering",
                        "Mark": "",
                        "Subject Type": "Basic Core",
                        "Course": "23/24"
                    },
                    {
                        "Subject": "Programming II",
                        "Mark": "",
                        "Subject Type": "Basic Core",
                        "Course": "23/24"
                    },
                    {
                        "Subject": "Linear Algebra",
                        "Mark": "",
                        "Subject Type": "Basic Core",
                        "Course": "23/24"
                    },
                    {
                        "Subject": "Physics",
                        "Mark": "",
                        "Subject Type": "Basic Core",
                        "Course": "23/24"
                    },
                    {
                        "Subject": "Statistics",
                        "Mark": "",
                        "Subject Type": "Basic Core",
                        "Course": "23/24"
                    }
                ]
            }).then(async function (cid) {
                const content = await NPP.node.dag.get(cid);
                console.log(content.value.payload);
            })
        }
    });

}


NPP.create();