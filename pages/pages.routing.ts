import { Routes,RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from '././dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { DetalleComponent } from './../components/detalle/detalle.component';
import { ListaComponent } from './../components/lista/lista.component';
import { ReporteComponent } from './../components/reporte/reporte.component';
const routes:Routes=[
    {path:'condpmn',
        component:PagesComponent,
        children:[
          { path:'',component:DashboardComponent,data:{titulo:'Dashboard'}},
          { path:'progress',component:ProgressComponent,data:{titulo:'ProgressBar'}},
          { path:'grafica1',component:Grafica1Component,data:{titulo:'Grafica #1'}},
          { path:'detalles/:numCorrelativo/:tipoDocum',component:DetalleComponent,data:{titulo:'Detalle del Documento'}},
          { path:'lista/:tipoDocumentoform',component:ListaComponent,data:{titulo:'Consulta de CCMN-DPMN'}},
          { path:'reporte',component:ReporteComponent,data:{titulo:'Reporte '}},
          { path:'rxjs', component:RxjsComponent,data:{titulo:'Rxjs'}},
          { path:'**', redirectTo:'/condpmn',pathMatch:'full'},

      ]
    },
];
@NgModule({

    imports: [ RouterModule.forChild(routes) ],
    exports: []
})
export class PagesRoutingModule{}

