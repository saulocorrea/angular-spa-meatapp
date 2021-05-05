import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "app/shared/shared.module";
import { OrderItemsComponent } from "./order-items/order-items.component";
import { OrderTotalComponent } from "./order-total/order-total.component";
import { OrderComponent } from "./order.component";

const ROUTES: Routes = [
    { path: '', component: OrderComponent }
]

@NgModule({
    declarations: [
        OrderComponent,
        OrderItemsComponent,
        OrderTotalComponent
    ],
    imports: [
        SharedModule, //importa apenas os Components do modulo Shared
        RouterModule.forChild(ROUTES)
    ]
})
export class OrderModule { }