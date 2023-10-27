const express = require('express')

const bodyParser = require('body-parser')
const app =express()
app.use(bodyParser.json())
const port = process.env.PORT || 8000


app.post('/genarateoutput' , (req , res)=> {
    const inputData = [
        {
        id: 2167,
        reach: 1,
        date: "2022-09-13T10:12:49.000Z",
        campaignMatch: {
          id: 22,
          id_supplier: 1078,
          supplier: {
            id: 1078,
            name: "mollimolli",
                },
            },
        },
        {
        id: 2167,
        reach: 233,
        date: "2022-01-3T10:12:49.000Z",
        campaignMatch: {
          id: 22,
          id_supplier: 1078,
          supplier: {
            id: 1078,
            name: "mollimolli",
                },
            },
        },
        {
        id: 2168,
        reach: 12,
        date: "2022-09-13T10:14:03.000Z",
        campaignMatch: {
          id: 22,
          id_supplier: 1078,
          supplier: {
            id: 1078,
            name: "mollimolli",
                },
            },
        },
        {
        id: 2182,
        reach: 412,
        date: "2022-02-19T17:01:08.000Z",
        campaignMatch: {
          id: 2793,
          id_supplier: 1082,
          supplier: {
            id: 1082,
            name: "ilariadilecce",
                },
            },
        },
        {
        id: 2183,
        reach: 10,
        date: "2022-10-19T17:01:08.000Z",
        campaignMatch: {
          id: 17,
          id_supplier: 1073,
          supplier: {
            id: 1073,
            name: "MaxWin",
                },
            },
        },
        {
        id: 2184,
        reach: 1,
        date: "2022-11-19T17:01:08.000Z",
        campaignMatch: {
          id: 17,
          id_supplier: 1073,
          supplier: {
            id: 1073,
            name: "MaxWin",
                },
            },
        },
        {
        id: 2185,
        reach: 5,
        date: "2022-02-19T17:01:08.000Z",
        campaignMatch: {
          id: 2793,
          id_supplier: 1082,
          supplier: {
            id: 1082,
            name: "ilariadilecce",
                },
            },
        },
        {
        id: 2186,
        reach: 6,
        date: "2022-09-21T11:28:02.000Z",
        campaignMatch: {
          id: 2793,
          id_supplier: 1082,
          supplier: {
            id: 1082,
            name: "ilariadilecce",
                },
            },
        },
        {
        id: 2187,
        reach: 55,
        date: "2022-09-19T17:01:08.000Z",
        campaignMatch: {
          id: 2793,
          id_supplier: 1082,
          supplier: {
            id: 1082,
            name: "ilariadilecce",
                },
            },
        },
        {
        id: 2188,
        reach: 20,
        date: "2022-07-22T09:43:27.000Z",
        campaignMatch: {
          id: 2793,
          id_supplier: 1082,
          supplier: {
            id: 1082,
            name: "ilariadilecce",
                },
            },
        },
        {
        id: 2189,
        reach: 7,
        date: "2022-07-22T12:52:41.000Z",
        campaignMatch: {
          id: 2793,
          id_supplier: 1082,
          supplier: {
            id: 1082,
            name: "ilariadilecce",
                },
            },
        },];

    const outputData = {
        monthLabels : ['jan' , 'feb' , 'jul' , 'sept' , 'oct' ,'nov'],
        datasets : [],
    }
    const monthReachMap = {};

    inputData.forEach(entry => {
        const {date , campaignMatch} = entry;
        const month = new Date(date).getMonth();
        const monthLabel = outputData.monthLabels[month];
        const name = campaignMatch.supplier.name;
        const reach = entry.reach
    ;

    if(!monthReachMap[month]){
        monthReachMap[month] = {};
    }

    if(!outputData.datasets.some((dataset) => dataset.label === name )) {
        outputData.datasets.push({
            totalReach : {name , totalReach:0},
            label : name,
            monthReach : outputData.monthLabels.map((label)=> ({
                [label] : 0,
            }))

        })
    }

    if(!monthReachMap[month] [name]) {
        monthReachMap[month][name] = reach;
    }else{
        monthReachMap[month][name] += reach
    }

    outputData.datasets.forEach((dataset) => {
        if(dataset.label === name) {
            dataset.totalReach.totalReach += reach;
            dataset.monthReach[month][monthLabel] = monthReachMap[month][name]
        }
    })
})
    res.send(outputData)
    console.log(outputData)
})


// task no 1

const userTable = []
const servantTable = []

app.post('api/v1/user_hire_servent/:userId/:servantId' , (req , res) => {
    const {userId , servantId} = req.params;
    const {startTime , endTime} = req.body;
    
    const hireRecord = {
      userId,
      servantId,
      startTime,
      endTime
}
     userTable.push(hireRecord)
     res({ massage : 'user hired a servant successfully'}) 
})

app.get('/api/v1/list_user_hire_servant/:userId' , (req , res)=>{
     const {userId} = res.params;

     const hiredServants = userTable.filter((record) => record.userId === userId)

     res.json(hiredServants)
})





app.listen(port , () => {
    console.log(`Server run on ${port}`)
})