import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './front/components/components.component';
import { LandingComponent } from './front/examples/landing/landing.component';
import { LoginComponent } from './front/examples/login/login.component';
import { ProfileComponent } from './front/examples/profile/profile.component';
import { NucleoiconsComponent } from './front/components/nucleoicons/nucleoicons.component';
import { ConsultationComponent } from './back/component/consultation/consultation.component';
import {ProfileConsultantComponent} from './front/examples/profileConsultant/profileConsultant.component'
import { BookConsultationComponent } from './front/examples/book-consultation/book-consultation.component';
import { bookConsultationComponent } from './front/examples/profileConsultant copy/bookConsultation';
import { DashboardComponent } from './back/dashboard/dashboard.component';
import { FullComponent } from './back/layouts/full/full.component';
import { TransactionComponent } from './back/component/transaction/transaction.component';
import { AddTransactionComponent } from './back/component/add-transaction/add-transaction.component';
import { TransferComponent } from './back/component/transfer/transfer.component';
import { FeedbackComponent } from './back/component/feedback/feedback.component';
import { EventClientComponent } from './front/examples/event-client/event-client.component';
const routes: Routes =[
    { path: 'index',                component: ComponentsComponent },
    { path: 'nucleoicons',          component: NucleoiconsComponent },
    { path: 'examples/landing',     component: LandingComponent },
    { path: 'examples/login',       component: LoginComponent },
    { path: 'examples/profile',     component: ProfileComponent },
    { path: 'consultation',         component: ConsultationComponent},
    { path: 'transaction',          component: TransactionComponent},
    { path: 'examples/profileConsultant',component: ProfileConsultantComponent},
    { path: 'examples/bookConsultation',component: BookConsultationComponent},
    { path: 'examples/book',component: bookConsultationComponent},
    { path: 'addtrans ' ,component: AddTransactionComponent},
    {path: '/transfer', component:TransferComponent},
    {path: 'Feedback', component:FeedbackComponent},
    {path: 'EventClientComponent', component : EventClientComponent},
      {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/examples/landing', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./back/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./back/component/component.module').then((m: { ComponentsModule: any; }) => m.ComponentsModule)
      }
    ]
  }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
})
export class AppRoutingModule { }
