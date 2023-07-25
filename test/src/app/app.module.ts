import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgxDirectivesModule } from 'components/directives';
import { NgxLoadingModule } from 'components/loading';
import { NgxDynamicFormModule } from 'components/dynamic-form';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, NgxDirectivesModule, NgxLoadingModule, NgxDynamicFormModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
