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

    const allStates = ["character", "economics", "crates"];
    const currentState = allStates[0];

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
})();