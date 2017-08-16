(function () {
    const MOCK_DATA = {
        "userCharacter": [
            {
                "characterName": "testCharacterOne",
                "userID": 12345,
                "level": 1,
                "money": 500,
                "workers": 0
            }
        ]
    };

    // ON BUTTON CLICK, INITIATE WORKER
    $(".js-worker-btn").click(function(){
       initiateWorker();
    });

    // INITIATE A WORKER 
    function initiateWorker() {
        MOCK_DATA.userCharacter[0].workers = MOCK_DATA.userCharacter[0].workers+1;
    }

    function workerMoneyGeneration(){
        MOCK_DATA.userCharacter[0].money = MOCK_DATA.userCharacter[0].money+MOCK_DATA.userCharacter[0].workers;
        console.log("Worker money generation")
    }

    // UPDATE STATS
    function updateCurrentStats() {
        $("#name").text(`Name: ${MOCK_DATA.userCharacter[0].characterName}`);
        $("#level").text(`Level: ${MOCK_DATA.userCharacter[0].level}`);
        $("#money").text(`Money: ${MOCK_DATA.userCharacter[0].money}`);
    };
    
    // TICK FUNCTION FOR STAT UPDATES
    function statUpdateTick() {
        updateCurrentStats();
        console.log("Stats updated.");
    }
    setInterval(statUpdateTick, 100);
    setInterval(workerMoneyGeneration, 1000);
})();