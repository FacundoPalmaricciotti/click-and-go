import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ProductComponent } from './pages/product/product.component';
import { InformationProductComponent } from './pages/informationproduct/informationproduct.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';



export const routes: Routes = [
    
    {path:"",component: HomeComponent},
    {path:"about",component: AboutComponent},
    {path:"product",component: ProductComponent},
    {path:"information/:id",component: InformationProductComponent},
    {path:"thank-you", component: ThankYouComponent}

];
@NgModule(
    {
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule],
    }
)
export class AppRoutesModule {}
