import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgxDirectivesModule, NgxLoadingModule } from 'projects/ngx-zorro';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, NgxDirectivesModule, NgxLoadingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
