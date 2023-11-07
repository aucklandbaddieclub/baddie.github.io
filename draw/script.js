let players = JSON.parse(localStorage.getItem('players')) || [];
let groups = JSON.parse(localStorage.getItem('groups')) || {A: [], B: [], C: [], D: []};
let completedPlayers = JSON.parse(localStorage.getItem('completedPlayers')) || [];

const nameToIDMap = {
    seira: 1,
    josephine: 2,
    candy: 3,
    dennis: 4,
    regina: 5,
    ada: 6,
    jordan: 7,
    geoff: 8,
    david: 9,
    aki: 10,
    jiatong: 11,
    david: 12,
    alice: 13,
    selina: 14,
    daniel: 15,
    stevie: 16
};

function verifyAndDraw() {

    const playerID = parseInt(document.getElementById("playerID").value);
    const username = document.getElementById("username").value.toLowerCase();

    if (isNaN(playerID) || playerID < 1 || playerID > 16) {
        alert("Sorry, Get Wrong Number，Please input Number Between 1-16！");
        return;
    }

    if (!nameToIDMap[username] || nameToIDMap[username] !== playerID) {
        alert("The name does not correspond to the serial number, so the lottery cannot be conducted.");
        return;
    }

    if (completedPlayers.includes(playerID)) {
        alert("You have finished drawing lots. You cannot draw lots again!");
        return;
    }

    const player = { id: playerID, group: '' };
    players.push(player);

    // 检查每个组的人数，如果超过4人，则重新抽签
    let randomGroup = String.fromCharCode(65 + Math.floor(Math.random() * 4)); // A, B, C, D
    while (groups[randomGroup].length >= 4) {
        randomGroup = String.fromCharCode(65 + Math.floor(Math.random() * 4));
    }

    player.group = randomGroup;
    groups[randomGroup].push(player);

    completedPlayers.push(playerID);

    displayResult(player);
    updateStats();

    // 将数据存储到localStorage中
    localStorage.setItem('players', JSON.stringify(players));
    localStorage.setItem('groups', JSON.stringify(groups));
    localStorage.setItem('completedPlayers', JSON.stringify(completedPlayers));
    
    if (players.length === 0) {
        document.getElementById("playerID").disabled = true;
        document.getElementById("username").disabled = true;
        const button =document.querySelector("button");
        button.style.backgroundColor = '#55009E';
        button.style.color = '#FFFFFF';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
    }
}

function displayResult(player) {
    const resultElement = document.getElementById("result");
    const groupElement = document.createElement("div");
    resultElement.appendChild(groupElement);
}

function updateStats() {
    const statsElement = document.getElementById("stats");
    if (statsElement) {
        statsElement.innerHTML = "";

        for (const group in groups) {
            const groupElement = document.createElement("div");
            groupElement.innerText = `Group ${group}: ${groups[group].map(player => player.id).join(", ")}`;
            statsElement.appendChild(groupElement);
        }
    }
}

// 初始化时调用一次以显示之前的抽签结果
updateStats();
