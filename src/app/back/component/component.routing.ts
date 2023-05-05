import { Routes } from '@angular/router';
import { NgbdpaginationBasicComponent } from './pagination/pagination.component';
import { NgbdAlertBasicComponent } from './alert/alert.component';

import { NgbdDropdownBasicComponent } from './dropdown-collapse/dropdown-collapse.component';
import { NgbdnavBasicComponent } from './nav/nav.component';
import { BadgeComponent } from './badge/badge.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './card/card.component';
import { TableComponent } from './table/table.component';
import { ConsultationComponent } from './consultation/consultation.component';
import { TransactionComponent } from './transaction/transaction.component';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';
import { TransferComponent } from './transfer/transfer.component';
import { FeedbackComponent } from './feedback/feedback.component';


export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'table',
				component: TableComponent
			},
			{
				path: 'card',
				component: CardsComponent
			},
			{
				path: 'pagination',
				component: NgbdpaginationBasicComponent
			},
			{
				path: 'badges',
				component: BadgeComponent
			},
			{
				path: 'alert',
				component: NgbdAlertBasicComponent
			},
			{
				path: 'dropdown',
				component: NgbdDropdownBasicComponent
			},
			{
				path: 'nav',
				component: NgbdnavBasicComponent
			},
			{
				path: 'buttons',
				component: ButtonsComponent
			},
			{
				path: 'consultation',
				component: ConsultationComponent
			},
			{
				path: 'transaction',
				component: TransactionComponent
			},
			{
				path: 'addtrans',
				component: AddTransactionComponent
			},
			{
				path: 'transfer',
				component: TransferComponent
			},
			{
				path: 'Feedback',
				component: FeedbackComponent
			},
		]
	}
];
