new Vue({
    el: '#app',
    data: {
        player1Health: 100,
        player2Health: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function(){
            this.gameIsRunning = true;
            this.player1Health = 100;
            this.player2Health = 100;
            this.turns = [];
        },
        attack: function(){
            var damage = this.calculateDamage(3,10);
            this.player2Health-=damage;
            this.turns.unshift({
                isplayer1: true,
                text: '>>> player1 hits player2 for' + damage + 'points'
            });
            if(this.checkWin()){
                return
            }
            this.player2Attack();
        },
        player2Attack: function(){
            var damage = this.calculateDamage(5,12);
            this.player1Health-=damage;
            this.turns.unshift({
                isplayer1: false,
                text: '>>> player2 hits player1 for ' + damage + ' points'
            });
            this.checkWin()
        },
        specialAttack: function(){
            var damage = this.calculateDamage(10,20);
            this.player2Health-=damage;
            this.turns.unshift({
                isplayer1: true,
                text: '>>> player1 hits player2 harder for ' + damage + ' points'
            });
            if(this.checkWin()){
                return
            }
            this.player2Attack();
        },
        heal: function(){
            if(this.player1Health<=90){
                this.player1Health+=10;
            }else{
                this.player1Health=100;
            }
            this.turns.unshift({
                isplayer1: true,
                text: '>>> player1 healed'
            });
            this.player2Attack();
        },
        giveUp: function(){
            this.gameIsRunning=false;
            this.turns.unshift({
                isplayer1: true,
                text: '>>> player1 gave up'
            });
        },
        calculateDamage: function(min, max){
            return Math.max(Math.ceil(Math.random()*max),min)
        },
        checkWin: function(){
            if(this.player2Health<=0){
                if(confirm('you won! new game?')){
                    this.startGame();
                }else{
                    this.gameIsRunning=false;
                }
                return true;
            }else if(this.player1Health<=0){
                if(confirm('you lost! new game?')){
                    this.startGame();
                }else{
                    this.gameIsRunning=false;
                }
                return true;
            }
            return false;
        }
    }
});