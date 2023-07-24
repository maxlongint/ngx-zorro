import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    visible = false;

    onClick() {
        this.visible = true;
        setTimeout(() => {
            // this.visible = false;
        }, 5000);
    }

    onDebClick() {}
}
