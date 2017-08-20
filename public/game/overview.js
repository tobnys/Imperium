(function () {
    
    const allStates = ["character", "economics", "crates"];
    const currentState = allStates[0];

    // UPDATE STATS
    function updateCurrentStats() {
        $("#name").text(`${MOCK_DATA.userCharacter[0].characterName}`);
        $("#score").text(`${MOCK_DATA.userCharacter[0].score}`);
        $("#level").text(`${MOCK_DATA.userCharacter[0].level}`);
        $("#money").text(`$${MOCK_DATA.userCharacter[0].money}`);
    };
    
    // TICK FUNCTION FOR STAT UPDATES
    function statUpdateTick() {
        updateCurrentStats();
    }
    setInterval(statUpdateTick, 100);
})();