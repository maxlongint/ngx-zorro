import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
setStorePrefix(environment.config.APP_ID);

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NgxDirectivesModule } from 'components/directives';
import { NgxLoadingModule } from 'components/loading';
import { NgxDynamicFormModule } from 'components/dynamic-form';

import { registerLocaleData } from '@angular/common';
registerLocaleData(zh);
import zh from '@angular/common/locales/zh';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NgxZorroConfigService } from './ngx-zorro-config.service';
import { NgxConfigService } from 'ngx-zorro/services/config.service';
import { NgxDialogModule } from 'ngx-zorro/dialog';
import { setStorePrefix } from 'ngx-zorro/utils';

const LANG_PROVIDES = [{ provide: NZ_I18N, useValue: zh_CN }];

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        NzInputModule,
        NzFormModule,
        NzButtonModule,
        NgxDirectivesModule,
        NgxLoadingModule,
        NgxDynamicFormModule,
        NgxDialogModule,
    ],
    providers: [...LANG_PROVIDES, { provide: NgxConfigService, useExisting: NgxZorroConfigService }],
    bootstrap: [AppComponent],
})
export class AppModule {}
