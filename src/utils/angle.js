export class Angle {
    constuctor (angle) {
        this.value = angle;
    }

    set (angle) {
        if (angle <= 180)
            this.value = angle;
        else
            this.value = angle - 360;
        
        return this;
    }
}