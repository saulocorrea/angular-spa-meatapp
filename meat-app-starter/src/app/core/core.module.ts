import { NgModule } from "@angular/core";
import { OrderService } from "app/order/order.service";
import { CarrinhoService } from "app/restaurants/restaurant-detail/carrinho/carrinho.service";
import { RestaurantsService } from "app/restaurants/restaurants.service";

@NgModule({
    providers: [
        RestaurantsService,
        CarrinhoService,
        OrderService
    ]
})
export class CoreModule {}