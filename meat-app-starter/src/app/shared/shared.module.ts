import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { OrderService } from "app/order/order.service";
import { CarrinhoService } from "app/restaurants/restaurant-detail/carrinho/carrinho.service";
import { RestaurantsService } from "app/restaurants/restaurants.service";

import { InputContainerComponent } from "./input-container/input-container.component";
import { RadioComponent } from "./radio/radio.component";
import { RatingComponent } from "./rating/rating.component";

@NgModule({
    declarations: [
        InputContainerComponent,
        RadioComponent,
        RatingComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        InputContainerComponent,
        RadioComponent,
        RatingComponent,

        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                RestaurantsService,
                CarrinhoService,
                OrderService
            ]
        }
    }
}