import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
setStorePrefix(environment.config.APP_ID);

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NgxDirectivesModule } from 'components/directives';
import { NgxLoadingModule } from 'components/loading';

import { registerLocaleData } from '@angular/common';
registerLocaleData(zh);
import zh from '@angular/common/locales/zh';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NgxDialogModule } from 'ngx-zorro/dialog';
import { setStorePrefix } from 'ngx-zorro/utils';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxDynamicFormModule } from 'ngx-zorro/dynamic-form';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { RouterModule, Routes } from '@angular/router';
import { NgxNumberComponent } from './number.component';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NgxCacheInterceptorProvide } from 'ngx-zorro/interceptors';
import { ViewRefComponent } from './view-ref/view-ref.component';

const LANG_PROVIDES = [{ provide: NZ_I18N, useValue: zh_CN }];
const routes: Routes = [
    {
        path: 'page1',
        loadChildren: () => import('./page1/page1.module').then(m => m.Page1Module),
    },
    {
        path: 'page2',
        loadChildren: () => import('./page2/page2.module').then(m => m.Page2Module),
    },
];

@NgModule({
    declarations: [AppComponent, NgxNumberComponent, ViewRefComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        NzInputModule,
        NzFormModule,
        NzButtonModule,
        NgxDirectivesModule,
        NgxDialogModule,
        HttpClientModule,
        NzRadioModule,
        NgxLoadingModule,
        NzInputNumberModule,
        NgxDynamicFormModule.forRoot({
            types: [
                {
                    type: 'number',
                    component: NgxNumberComponent,
                },
            ],
        }),
        // NgxDynamicFormModule.forRoot(),
        RouterModule.forRoot(routes),
    ],
    providers: [...LANG_PROVIDES, NgxCacheInterceptorProvide],
    bootstrap: [AppComponent],
})
export class AppModule {}
