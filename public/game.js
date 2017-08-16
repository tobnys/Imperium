(function () {
    const MOCK_DATA = {
        "userCharacter": [
            {
                "characterName": "testCharacterOne",
                "userID": 12345,
                "level": 1,
                "money": 500
            }
        ]
    };

    $(".js-worker-btn").click(function(){
        MOCK_DATA.userCharacter[0].money = MOCK_DATA.userCharacter[0].money+1;
        if(MOCK_DATA.userCharacter[0].money > 510){
            MOCK_DATA.userCharacter[0].level = 2;
        }
        updateCurrentStats();
    });



    // UPDATE STATS
    function updateCurrentStats() {
        $("#name").text(`Name: ${MOCK_DATA.userCharacter[0].characterName}`);
        $("#level").text(`Level: ${MOCK_DATA.userCharacter[0].level}`);
        $("#money").text(`Money: ${MOCK_DATA.userCharacter[0].money}`);
    };
    
    // TICK FUNCTION TO INITIATE BELOW FUNCTION
    updateCurrentStats();
})();