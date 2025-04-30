import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardSalesRoutingModule } from './dashboardsales-routing.module';
import { MenuModule } from 'primeng/menu';
import { TimelineModule } from 'primeng/timeline';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DashboardSalesComponent } from './dashboardsales.component';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import {FieldsetModule} from "primeng/fieldset";
import {InputNumberModule} from "primeng/inputnumber";
import {FormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";

import {FloatlabelDemoModule} from "../../uikit/floatlabel/floatlabeldemo.module";
import {RadioButtonModule} from "primeng/radiobutton";
import {TagModule} from "primeng/tag";
import {SeprateurMillierPipe} from "../separateur-millirt-pipe";

@NgModule({
    imports: [
        CommonModule,
        DashboardSalesRoutingModule,
        MenuModule,
        TimelineModule,
        ButtonModule,
        RippleModule,
        TableModule,
        ChartModule,
        OverlayPanelModule,
        CardModule,
        InputTextModule,
        FieldsetModule,
        InputNumberModule,
        FormsModule,
        CalendarModule,
        RadioButtonModule,
        TagModule,
    ],
    declarations: [
        DashboardSalesComponent, SeprateurMillierPipe
    ]
})
export class DashboardSalesModule { }
