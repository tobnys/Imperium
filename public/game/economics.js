(function () {
    const MOCK_DATA = {
        "userCharacter": [
            {
                "characterName": "testCharacterOne",
                "userID": 12345,
                "score": 0,
                "level": 1,
                "money": 500,
                "workers": 0
            }
        ]
    };

    const MOCK_COST_DATA = {
        "workers": 100,
    }
    // ON BUTTON CLICK, INITIATE WORKER
    $(".js-worker-btn").click(function(){
        var newCost = MOCK_COST_DATA.workers*MOCK_DATA.userCharacter[0].workers;
        if(MOCK_DATA.userCharacter[0].money > newCost) {
            initiateWorker();
        }
        // CREATE VISUAL ERROR MESSAGE HERE // MODAL?
        else console.log("Not enough money..");
    });

    // INITIATE A WORKER 
    function initiateWorker() {
        var newCost = MOCK_COST_DATA.workers*MOCK_DATA.userCharacter[0].workers;
        if(MOCK_DATA.userCharacter[0].workers === 0) {
            $("#worker-cost").text(`Cost: $${100}`);
            MOCK_DATA.userCharacter[0].money = MOCK_DATA.userCharacter[0].money-100;
        }
        else $("#worker-cost").text(`Cost: $${newCost}`);
        MOCK_DATA.userCharacter[0].workers = MOCK_DATA.userCharacter[0].workers+1;
        MOCK_DATA.userCharacter[0].money = MOCK_DATA.userCharacter[0].money-newCost;
    }

    function workerMoneyGeneration(){
        MOCK_DATA.userCharacter[0].money = MOCK_DATA.userCharacter[0].money+MOCK_DATA.userCharacter[0].workers;
        console.log("Worker money generation")
    }

    // UPDATE STATS
    function updateCurrentStats() {
        $("#name").text(`Name: ${MOCK_DATA.userCharacter[0].characterName}`);
        $("#score").text(`Score: ${MOCK_DATA.userCharacter[0].score}`);
        $("#level").text(`Level: ${MOCK_DATA.userCharacter[0].level}`);
        $("#money").text(`Money: $${MOCK_DATA.userCharacter[0].money}`);
    };
    
    // TICK FUNCTION FOR STAT UPDATES
    function statUpdateTick() {
        updateCurrentStats();
    }
    setInterval(statUpdateTick, 100);
    setInterval(workerMoneyGeneration, 1000);
})();