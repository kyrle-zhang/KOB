/*
 * @Author: kyrle
 * @Date: 2022-11-09 12:10:55
 * @LastEditTime: 2022-11-09 16:36:31
 * @FilePath: \web\src\assets\scripts\AcGameObject.js
 * @Description: 
 */
const AC_GAME_OBJECTS = [];

export class AcGameObject {
    constructor() {
        AC_GAME_OBJECTS.push(this);
        this.timedelta = 0;
        this.has_called_start = false;
    }

    start() { //只执行一次
        
    }

    update() { //每一帧都执行，除了第一帧

    }

    on_destroy() { //该对象被销毁之前执行

    }

    destroy() { //销毁该对象
        this.on_destroy();
        for(let i in AC_GAME_OBJECTS) {
            const obj = AC_GAME_OBJECTS[i];
            if(obj == this){
                AC_GAME_OBJECTS.split(i);
                break;
            }
        }
    }
}

let last_timestamp;
const step = timestamp => {
    for(let obj of AC_GAME_OBJECTS){
        if(!obj.has_called_start) {
            obj.has_called_start = true;
            obj.start();
        }else{
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
    }
    last_timestamp = timestamp;
    requestAnimationFrame(step);
}

requestAnimationFrame(step);