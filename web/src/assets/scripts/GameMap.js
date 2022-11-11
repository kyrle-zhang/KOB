/*
 * @Author: kyrle
 * @Date: 2022-11-09 15:17:14
 * @LastEditTime: 2022-11-10 17:23:26
 * @FilePath: \web\src\assets\scripts\GameMap.js
 * @Description: 
 */
import { AcGameObject } from "./AcGameObject";
import { Snake } from "./Snake";
import { Wall } from "./Wall";

export class GameMap extends AcGameObject { // 游戏地图类
    constructor(ctx, parent) {
        super();
        this.ctx = ctx;
        this.parent = parent;
        this.L = 0;

        this.rows = 13;
        this.cols = 14;
        
        this.wall_count = 20;
        this.walls = [];

        this.snakes = [
            new Snake({id : 0, color : "#4876EC", r : this.rows - 2, c : 1}, this),
            new Snake({id : 1, color : "#F94848", r : 1, c : this.cols - 2}, this)
        ];
    }

    checkConnectivity(g, sx, sy, tx, ty) { //判断两条蛇的出生点是否连通
        if(sx == tx && sy == ty) return true;
        g[sx][sy] = true;
        let dx = [1,0,-1,0], dy = [0,1,0,-1];
        for(let i = 0; i < 4; i ++ ) {
            let x = sx + dx[i];
            let y = sy + dy[i];
            if(!g[x][y] && this.checkConnectivity(g, x, y, tx, ty)){
                return true;
            }
        }
        return false;
    }

    creatWalls() { //创建关于地图中心对称的障碍物
        const g = [];
        for(let r = 0; r < this.rows; r ++) {
            g[r] = [];
            for(let c = 0; c < this.cols; c ++) {
                g[r][c] = false;
            }
        }

        //首先给四周加上障碍物
        for(let r = 0; r < this.rows; r ++ ) {
            g[r][0] = g[r][this.cols - 1] = true;
        }

        for(let c = 0; c < this.cols; c ++ ) {
            g[0][c] = g[this.rows - 1][c] = true;
        }

        for(let i = 0; i < this.wall_count / 2; i ++) {
            for(let j = 0; j < 1000; j ++){
                let r = parseInt(Math.random() * this.rows);
                let c = parseInt(Math.random() * this.cols);
                if(g[r][c] || g[this.rows - r - 1][this.cols - c - 1]){
                    continue;
                }
                if(r == this.rows - 2 && c == 1 || r == 1 && c == this.cols - 2){
                    continue;
                }
                g[r][c] = g[this.rows - r - 1][this.cols - c - 1] = true;
                break;
            }
        }
        //判断两条蛇的出生点是否联通
        let copy_g = JSON.parse(JSON.stringify(g));
        if(!this.checkConnectivity(copy_g, this.rows - 2, 1, 1, this.cols - 2)) {
            return false;
        }

        for(let r = 0; r < this.rows; r ++ ) {
            for(let c = 0; c < this.cols; c ++) {
                if(g[r][c]){
                    this.walls.push(new Wall(r,c,this));
                }
            }
        }
        //生成了了一个合法的地图
        return true;
    }

    addListeningEvent() { // 给canvas绑定一个键盘监听事件
        this.ctx.canvas.focus();
        const[snake0, snake1] = this.snakes;
        this.ctx.canvas.addEventListener("keydown", e => {
            if(e.key === 'w') snake0.setDirection(0);
            else if(e.key === 'd') snake0.setDirection(1);
            else if(e.key === 's') snake0.setDirection(2);
            else if(e.key === 'a') snake0.setDirection(3);
            else if(e.key === 'ArrowUp') snake1.setDirection(0);
            else if(e.key === 'ArrowRight') snake1.setDirection(1);
            else if(e.key === 'ArrowDown') snake1.setDirection(2);
            else if(e.key === 'ArrowLeft') snake1.setDirection(3);
        });

    }

    start() { // 只在刷新第一帧时执行一次
        for(let i = 0; i < 1000; i ++){
            if(this.creatWalls()){
                break;
            }
        }
        this.addListeningEvent();
    }

    checkValid(cell) {// 判断是否会撞上障碍物或者两条蛇的身体
        for(const wall of this.walls) {
            if(wall.r === cell.r && wall.c === cell.c) {
                return false;
            }
        }

        for(const snake of this.snakes) {
            let k = snake.cells.length;
            if(!snake.checkCellIncrease()){ //如果蛇尾不增加，就不用判断蛇尾
                k --;
            }
            for(let i = 0;i < k;i ++){
                if(cell.r === snake.cells[i].r && cell.c === snake.cells[i].c) {
                    return false;
                }
            }
        }
        return true;
    }


    updateSize() { // 计算地图大小
        this.L = parseInt(Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows));
        this.ctx.canvas.width = this.L * this.cols;
        this.ctx.canvas.height = this.L * this.rows;
    }

    checkStatus() { // 判断两条蛇是否都准备好进行下一步移动
        if(this.snakes[0].direction !== -1 && this.snakes[0].status === "idle" && 
        this.snakes[1].direction !== -1 && this.snakes[1].status === "idle") {
            return true;
        }else{
            return false;
        }
    }

    nextStep() {
        for(const snake of this.snakes) {
            snake.nextStep();
        }
    }
    
    update() { // 除了第一帧外每一帧都会执行
        this.updateSize();
        if(this.checkStatus()){
            this.nextStep();
        }
        this.render();
    }

    render() { // 渲染画布
        const color_even = "#AAD751", color_odd = "#A2D149";
        for(let r = 0; r < this.rows; r ++) {
            for(let c = 0; c < this.cols; c ++) {
                if((r + c) % 2 == 0) {
                    this.ctx.fillStyle = color_even;
                }else {
                    this.ctx.fillStyle = color_odd;
                }
                this.ctx.fillRect(c * this.L, r * this.L, this.L, this.L);
            }
        }
    }
} 