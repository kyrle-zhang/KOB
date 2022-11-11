import { AcGameObject } from "./AcGameObject";
import { Cell } from "./Cell";

/*
 * @Author: kyrle
 * @Date: 2022-11-10 09:13:52
 * @LastEditTime: 2022-11-10 17:55:31
 * @FilePath: \web\src\assets\scripts\Snake.js
 * @Description:
 */
export class Snake extends AcGameObject {
    constructor(info, gamemap) {
        super();
        this.id = info.id;
        this.color = info.color;
        this.gamemap = gamemap;

        this.cells = [new Cell(info.r, info.c)]; //存放蛇的身体，cells[0]存放蛇头
        this.speed = 5; //表示蛇每秒钟移动5个格子

        this.direction = -1; // -1 表示无操作，0,1,2,3表示上右下左
        this.status = "idle"; //idle表示蛇处于静止状态，moving表示蛇正在移动，dead表示蛇已经死亡

        this.next_cell = null; // 下一步的目标位置
        this.dr = [-1, 0, 1, 0];
        this.dc = [0, 1, 0, -1];
        this.step = 0; // 当前的回合数
        this.eps = 1e-2; // 允许的位置误差

        this.eye_direction = 0;
        if(this.id === 1) this.eye_direction = 2; //蛇头的初始方向，一个朝上一个朝下

        this.eye_dx = [ //蛇眼的x方向偏移量
            [-1, 1],
            [1, 1],
            [1, -1],
            [-1, -1]
        ];
        this.eye_dy = [ //蛇眼的y方向偏移量
            [-1, -1],
            [-1, 1],
            [1, 1],
            [1, -1]
        ];
    }

    setDirection(d) {
        this.direction = d;
    }

    start() {

    }

    nextStep() { // 将蛇的状态变为走下一步
        const d = this.direction;
        this.eye_direction = d;// 存储蛇头的方向
        this.next_cell = new Cell(this.cells[0].r + this.dr[d], this.cells[0].c + this.dc[d]);
        this.direction = -1; // 清空方向
        this.status = "moving";
        this.step ++;

        const k = this.cells.length;
        for(let i = k; i > 0; i --) {
            this.cells[i] = JSON.parse(JSON.stringify(this.cells[i - 1]));
        }

        if(!this.gamemap.checkValid(this.next_cell)) { //如果下一步操作非法，蛇瞬间去世
            this.status = "dead"; 
        }
    }

    checkCellIncrease() { //判断是否增加蛇的长度
        if(this.step <= 10) return true;
        if(this.step % 3 === 1) return true;
        return false;
    }

    move() {
        const distance_x = this.next_cell.x - this.cells[0].x; // 蛇头和目标点位置之间的x轴差距
        const distance_y = this.next_cell.y - this.cells[0].y; // 蛇头和目标点位置之间的y轴差距
        const distance = Math.sqrt(distance_x * distance_x + distance_y * distance_y); // 蛇头和目标点位置之间的差距
        if(distance < this.eps) { // 如果没有走到
            this.cells[0] = this.next_cell; // 添加新蛇头
            this.next_cell = null;
            this.status = "idle";
            if(!this.checkCellIncrease()){ // 如果没有新增蛇尾，删除原来的蛇尾元素
                this.cells.pop();
            }
        }else{
            const d = this.speed * this.timedelta / 1000; // 蛇头每帧走过的距离
            this.cells[0].x += d * distance_x / distance;
            this.cells[0].y += d * distance_y / distance;
            if(!this.checkCellIncrease()) {
                const k = this.cells.length;
                const tail = this.cells[k - 1];
                const target = this.cells[k - 2];
                const tail_distance_x = target.x - tail.x; // 蛇尾和目标点位置之间的x轴差距
                const tail_distance_y = target.y - tail.y; // 蛇尾和目标点位置之间的y轴差距
                tail.x += d * tail_distance_x / distance;
                tail.y += d * tail_distance_y / distance;
            }
        }
        
    }

    update() {
        if(this.status === 'moving'){
            this.move();
        }
        this.render();
    }

    render() {
        const L = this.gamemap.L;
        const ctx = this.gamemap.ctx;
        ctx.fillStyle = this.color;
        if(this.status === "dead") {
            ctx.fillStyle = "white";
        }
        for(const cell of this.cells) {
            ctx.beginPath();
            ctx.arc(cell.x * L, cell.y * L, 0.8 * L / 2, 0, Math.PI * 2);
            ctx.fill();
        }

        // 填充蛇的身体
        for(let i = 1; i < this.cells.length; i ++){
            const a = this.cells[i], b = this.cells[i - 1];
            if(Math.abs(a.x - b.x) < this.eps && Math.abs(a.y - b.y) < this.eps) {
                continue;
            }
            if(Math.abs(a.x - b.x) < this.eps) {
                ctx.fillRect((a.x - 0.4) * L, Math.min(a.y, b.y) * L, 0.8 * L, Math.abs(a.y - b.y) * L);
            }else{
                ctx.fillRect(Math.min(a.x, b.x) * L, (a.y - 0.4) * L, Math.abs(a.x - b.x) * L, 0.8 * L);
            }
        }

        //画出蛇眼
        ctx.fillStyle = "black";
        for(let i = 0; i < 2; i ++){
            const eye_x = (this.cells[0].x + this.eye_dx[this.eye_direction][i] * 0.15) * L;
            const eye_y = (this.cells[0].y + this.eye_dy[this.eye_direction][i] * 0.15) * L;
            ctx.beginPath();
            ctx.arc(eye_x, eye_y, 0.05 * L, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}