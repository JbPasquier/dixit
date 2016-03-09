function mainController($scope, $sce) {
    $scope.player = 0;
    $scope.whodice = '';
    $scope.result = '';
    $scope.players = [];
    $scope.launch = function() {
        $scope.players_submit.split("\n").forEach(function(player) {
            $scope.players.push(player);
        });
        if ($scope.players.length < 2) {
            $('#players').html('Pas assez de joueurs').show();
            $('#noplayers').hide();
        } else {
            $('#players').show();
            $('#noplayers').hide();
            $scope.setDixit();
            $scope.loadDice($scope.players);
        }
    }
    $scope.roll = function() {
        return Math.floor(Math.random() * 6 + 1);
    };
    $scope.loadDice = function() {
        $scope.d1 = $scope.roll();
        $scope.d2 = $scope.roll();
        $scope.total = $scope.d1 + $scope.d2;
        $scope.result = $scope.getResult();
    };
    $scope.setDixit = function() {
        $scope.whodixit = $scope.players[Math.floor((Math.random() * ($scope.players.length - 1)) + 1)];
    };
    $scope.getResult = function() {
        $scope.player++;
        if ($scope.player >= $scope.players.length)
            $scope.player = 0;
        $scope.r = '';
        if ($scope.d1 == $scope.d2)
            $scope.r += "<br />" + $scope.players[$scope.player] + " distribue " + $scope.d1 + " coups";
        if (($scope.d1 == 3 || $scope.d2 == 3) && ($scope.whodixit == $scope.players[$scope.player])) {
            $scope.r += "<br />" + $scope.whodixit + " n'est plus dixit ! Il boit un coup pour fêter ça !";
            $scope.whodixit = false;
        } else {
            if (($scope.d1 == 3 || $scope.d2 == 3) && $scope.whodixit === false) {
                $scope.whodixit = $scope.players[$scope.player];
                $scope.r += "<br />" + $scope.whodixit + " devient le nouveau dixit !";
                if ($scope.d1 == 3 && $scope.d2 == 3)
                    $scope.r += "<br />Fais boire un coup au dixit (" + $scope.whodixit + ")";
            } else {
                if ($scope.d1 == 3)
                    $scope.r += "<br />Fais boire un coup au dixit (" + $scope.whodixit + ")";
                if ($scope.d2 == 3)
                    $scope.r += "<br />Fais boire un coup au dixit (" + $scope.whodixit + ")";
            }
        }
        $scope.last = ($scope.player - 1) < 0 ? $scope.players.length - 1 : $scope.player - 1;
        $scope.next = ($scope.player + 1) > $scope.players.length - 1 ? 0 : $scope.player + 1;
        if ($scope.total == 9)
            $scope.r += "<br />" + $scope.players[$scope.last] + " boit !";
        if ($scope.total == 10)
            $scope.r += "<br />" + $scope.players[$scope.player] + " boit !";
        if ($scope.total == 11)
            $scope.r += "<br />" + $scope.players[$scope.next] + " boit !";
        if ($scope.total == 7)
            $scope.r += "<br />DIXIT !";
        if (($scope.d1 == 5 && $scope.d2 == 1) || ($scope.d1 == 1 && $scope.d2 == 5))
            $scope.r += "<br />" + $scope.players[$scope.player] + " invente une règle";
        if ($scope.r === '')
            $scope.r += "<br />" + $scope.players[$scope.player] + " est inutile et bois !";
        $scope.whodice = $scope.players[$scope.player] + " lance le dé...";
        return $sce.trustAsHtml($scope.r);
    };
    Number.prototype.toDice = function() {
        var dice = [
            "&nbsp;&nbsp;&nbsp;<br />&nbsp;o&nbsp;<br />&nbsp;&nbsp;&nbsp;",
            "o&nbsp;&nbsp;<br />&nbsp;&nbsp;&nbsp;<br />&nbsp;&nbsp;o",
            "o&nbsp;&nbsp;<br />&nbsp;o&nbsp;<br />&nbsp;&nbsp;o",
            "o&nbsp;o<br />&nbsp;&nbsp;&nbsp;<br />o&nbsp;o",
            "o&nbsp;o<br />&nbsp;o&nbsp;<br />o&nbsp;o",
            "o&nbsp;o<br />o&nbsp;o<br />o&nbsp;o"
        ];
        return $sce.trustAsHtml(dice[this - 1]);
    };
}
