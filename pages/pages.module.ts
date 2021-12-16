
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//Modules
import { SharedModule } from './../shared/shared.module';
import { ComponentsModule } from './../components/components.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxjsComponent } from './rxjs/rxjs.component';
import { HttpClientModule } from '@angular/common/http';

import { TableModule } from 'primeng/table';
import { FieldsetModule, } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import {InputNumberModule} from 'primeng/inputnumber';
import {MessagesModule} from 'primeng/messages';
import {ToastModule} from 'primeng/toast';
import {KeyFilterModule} from 'primeng/keyfilter';



@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    RxjsComponent

  ],

  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    RxjsComponent,
    TableModule,
    FieldsetModule, PanelModule
  ],
  imports: [
    FormsModule, ReactiveFormsModule,
    CommonModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    HttpClientModule, PanelModule, InputTextModule, 
    DropdownModule, RadioButtonModule, CalendarModule, InputNumberModule, 
    MessagesModule, ToastModule, KeyFilterModule
  ],
  bootstrap: [PagesComponent]
})
export class PagesModule { }
