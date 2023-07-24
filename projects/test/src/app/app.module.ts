import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DirectivesModule } from 'projects/ngx-zorro';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, DirectivesModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
