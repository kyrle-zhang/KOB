/*
 * @Author: kyrle
 * @Date: 2022-11-10 09:10:44
 * @LastEditTime: 2022-11-10 09:13:00
 * @FilePath: \web\src\assets\scripts\cell.js
 * @Description: 
 */
export class Cell {
    constructor(r, c) {
        this.r = r;
        this.c = c;
        this.x = this.c + 0.5;
        this.y = this.r + 0.5;
    }
}