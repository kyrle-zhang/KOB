/*
 * @Author: kyrle
 * @Date: 2022-11-09 16:11:55
 * @LastEditTime: 2022-11-09 16:26:22
 * @FilePath: \web\src\assets\scripts\wall.js
 * @Description: 
 */
import { AcGameObject } from "./AcGameObject";

export class Wall extends AcGameObject {
    constructor(r, c, gamemap) {
        super();

        this.r = r;
        this.c = c;
        this.color = "#B37226";
        this.gamemap = gamemap;
    }

    update() {
        this.render();
    }

    render() {
        const L = this.gamemap.L;
        const ctx = this.gamemap.ctx;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.c * L, this.r * L, L, L);
    }
}