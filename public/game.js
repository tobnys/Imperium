console.log("test");

(function () {
    const MOCK_DATA = {
        "userCharacter": [
            {
                "characterName": "testCharacterOne",
                "userID": "12345",
                "level": "1",
                "money": "500"
            }
        ]
    };

    function updateCurrentStats() {
        $("#name").text(`Name: ${userCharacter[0].characterName}`);
        console.log("Stats updated.");
    };

})();